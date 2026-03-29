import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api, type Ajandek } from '../../api';
import AjandekKartya, { SkeletonKartya } from './AjandekKartya';
import Header from '../Layout/Header';
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
        <div className="elozmenyek-container">
          <h1 className="elozmenyek-cim">Megtekintett Ajándékok</h1>
          <div className="elozmenyek-grid">
            {[...Array(4)].map((_, i) => <SkeletonKartya key={i} />)}
          </div>
        </div>
      </>
    );
  }
  if (!userId) {
    return (
      <>
        <Header />
        <div className="nincs-adat-container animate-fade-in">
          <div className="nincs-adat-ikon">🔒</div>
          <div className="nincs-adat">Kérlek jelentkezz be az előzmények megtekintéséhez!</div>
          <Link to="/" className="vissza-gomb">Vissza a főoldalra</Link>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="elozmenyek-container animate-fade-in">
        <h1 className="elozmenyek-cim animate-slide-up">Megtekintett Ajándékok</h1>
        {elozmenyek.length === 0 ? (
          <div className="nincs-adat-container animate-fade-in">
            <div className="nincs-adat-ikon">👀</div>
            <div className="nincs-adat">Még nincsenek megtekintett ajándékaid.</div>
            <Link to="/ajandekok" className="vissza-gomb">Kezdj el böngészni</Link>
          </div>
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
