import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Layout/Header';
import AjandekKartya from './AjandekKartya';
import { useAuth } from '../../hooks/useAuth';
import { api, type Ajandek } from '../../api';
import './KategoriaLista.css';
export default function KategoriaLista() {
  const [ajandekok, setAjandekok] = useState<Ajandek[]>([]);
  const [kedvencekIds, setKedvencekIds] = useState<number[]>([]);
  const { userId } = useAuth();
  const location = useLocation();
  const isElmeny = location.pathname === '/elmeny';
  const title = isElmeny ? 'Élmények' : 'Tárgyak';
  const targetCategory = isElmeny ? 'élmény' : 'tárgy';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAjandekok = await api.getAjandekok();
        const filtered = allAjandekok.filter(a => a.kategoria === targetCategory);
        setAjandekok(filtered);
        if (userId) {
          const kedvencData = await api.getKedvencek(userId);
          setKedvencekIds(kedvencData.map(k => k.id!).filter(id => id !== undefined));
        }
      } catch (error) {
        console.error('Hiba az adatok lekérésekor:', error);
      }
    };
    fetchData();
  }, [targetCategory, userId]);
  return (
    <>
      <Header title={title} showBack />
      <div className="kategoria-lista-container">
        <div className="kategoria-lista-content">
            {ajandekok.length > 0 ? (
              <div className="kategoria-lista-grid">
                {ajandekok.map((ajandek) => (
                  <AjandekKartya 
                    key={ajandek.id} 
                    ajandek={ajandek} 
                    isKedvenc={ajandek.id ? kedvencekIds.includes(ajandek.id) : false}
                  />
                ))}
              </div>
            ) : (
                <p style={{ textAlign: 'center', marginTop: '50px' }}>Nincsenek ajándékok ebben a kategóriában.</p>
            )}
        </div>
      </div>
    </>
  );
}
