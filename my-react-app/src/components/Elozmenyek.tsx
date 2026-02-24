import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api, type Ajandek } from '../api';
import AjandekKartya from './AjandekKartya';
import Header from './Header';
import './Elozmenyek.css';

const Elozmenyek = () => {
  const { userId, isChecking } = useAuth();
  const [elozmenyek, setElozmenyek] = useState<Ajandek[]>([]);
  const [kedvencekIds, setKedvencekIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Lekérjük az előzményeket ÉS a kedvenceket is, hogy tudjuk, melyiknél legyen piros a szív
        const [elozmenyData, kedvencData] = await Promise.all([
          api.getElozmenyek(userId),
          api.getKedvencek(userId)
        ]);

        setElozmenyek(elozmenyData);
        setKedvencekIds(kedvencData.map(k => k.id!).filter(id => id !== undefined));
      } catch (error) {
        console.error('Hiba az adatok betöltésekor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!isChecking) {
      fetchData();
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
        <div className="nincs-adat">Kérlek jelentkezz be az előzmények megtekintéséhez!</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="elozmenyek-container animate-fade-in">
        <h1 className="elozmenyek-cim animate-slide-up">Megtekintett Ajándékok</h1>
        {elozmenyek.length === 0 ? (
          <div className="nincs-adat animate-fade-in">Még nincsenek megtekintett ajándékaid.</div>
        ) : (
          <div className="elozmenyek-grid">
            {elozmenyek.map((ajandek, index) => (
              <div key={`${ajandek.id}-${index}`} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <AjandekKartya 
                  ajandek={ajandek} 
                  isKedvenc={ajandek.id ? kedvencekIds.includes(ajandek.id) : false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Elozmenyek;