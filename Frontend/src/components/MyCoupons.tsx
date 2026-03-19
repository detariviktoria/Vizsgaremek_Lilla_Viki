import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './Chat.css';

interface Coupon {
  id: number;
  kod: string;
  lejarat_datum: string;
}

interface MyCouponsProps {
  userId: number;
}

const MyCoupons: React.FC<MyCouponsProps> = ({ userId }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const fetchCoupons = async () => {
    try {
      const data = await api.getCoupons(userId);
      setCoupons(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [userId]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) return <div style={{padding: '20px', textAlign: 'center'}}>Betöltés...</div>;

  return (
    <div className="chat-container">
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px'}}>
        <h4 style={{margin: '0 0 5px 0', color: '#666'}}>Megszerezhető kuponjaid:</h4>
        <p style={{fontSize: '12px', color: '#888', marginBottom: '15px'}}>
          * Ezeket a kódokat más weboldalakon tudod felhasználni legalább 15.000 Ft értékű vásárlás esetén (5.000 Ft kedvezmény).
        </p>
        
        {coupons.length === 0 ? (
          <div style={{textAlign: 'center', padding: '20px', color: '#888'}}>
            Még nincsenek kuponjaid. Hívj meg barátokat, és ha regisztrálnak, mindketten kaptok egy kódot!
          </div>
        ) : (
          coupons.map((coupon) => (
            <div 
              key={coupon.id} 
              style={{
                backgroundColor: '#fff0fa',
                border: '1px solid palevioletred',
                borderRadius: '8px',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                <div style={{fontWeight: 'bold', fontSize: '18px', letterSpacing: '1.5px', color: '#d65a8a'}}>
                  {coupon.kod}
                </div>
                <div style={{fontSize: '11px', color: '#888', marginTop: '4px'}}>
                  Érvényes: {new Date(coupon.lejarat_datum).toLocaleDateString('hu-HU')}
                </div>
              </div>
              <button 
                onClick={() => handleCopy(coupon.kod)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: copiedCode === coupon.kod ? '#4CAF50' : 'palevioletred',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                {copiedCode === coupon.kod ? 'Másolva!' : 'Másolás'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCoupons;
