import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../api';
import Header from './Header';
import NincsAdat from './NincsAdat';
import './Baratok.css';

interface Friend {
  email: string;
  name: string;
  status: string;
  accepted: boolean;
  direction?: 'en_hivtam_meg' | 'engem_hivott_meg';
}

const Baratok = () => {
  const { userId, isChecking } = useAuth();
  const [baratok, setBaratok] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBaratok = async () => {
    if (!userId) return;
    try {
      const data = await api.getInvitedFriends(userId);
      setBaratok(data);
    } catch (error) {
      console.error('Hiba a barátok betöltésekor:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isChecking && userId) {
      fetchBaratok();
    } else if (!isChecking && !userId) {
      setLoading(false);
    }
  }, [userId, isChecking]);

  if (isChecking || loading) {
    return (
      <>
        <Header />
        <div className="loading">Betöltés...</div>
      </>
    );
  }

  if (!userId) {
    return (
      <>
        <Header />
        <div className="nincs-adat">Kérlek jelentkezz be a barátok megtekintéséhez!</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="baratok-container animate-fade-in">
        <h1 className="baratok-cim animate-slide-up">Baráti meghívások</h1>
        {baratok.length === 0 ? (
          <NincsAdat 
            ikon="👥" 
            uzenet="Még nem hívtál meg senkit, és téged sem hívott meg senki." 
            gombSzoveg="Vissza a főoldalra" 
            gombLink="/" 
          />
        ) : (
          <div className="baratok-lista">
            {baratok.map((barat, index) => (
              <div key={index} className="barat-item animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="barat-info">
                  <div className="barat-email">{barat.email}</div>
                  {barat.name && <div className="barat-name">{barat.name}</div>}
                </div>
                <div className={`barat-status ${barat.accepted ? 'elfogadva' : 'fuggo'}`}> 
                  {barat.direction === 'en_hivtam_meg' && (barat.accepted ? 'Elfogadva' : 'Függőben')}
                  {barat.direction === 'engem_hivott_meg' && 'Engem hívott meg'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Baratok;

