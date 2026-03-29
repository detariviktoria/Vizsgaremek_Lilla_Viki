import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api, type Ajandek } from '../../api';
import AjandekKartya, { SkeletonKartya } from './AjandekKartya';
import Header from '../Layout/Header';
import './Kedvencek.css';
const Kedvencek = () => {
  const { userId, isChecking } = useAuth();
  const [kedvencek, setKedvencek] = useState<Ajandek[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchKedvencek = async () => {
    if (!userId) return;
    try {
      const data = await api.getKedvencek(userId);
      setKedvencek(data);
    } catch (error) {
      console.error('Hiba a kedvencek betöltésekor:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isChecking && userId) {
      fetchKedvencek();
    } else if (!isChecking && !userId) {
      setLoading(false);
    }
  }, [userId, isChecking]);
  if (isChecking || loading) {
    return (
      <>
        <Header />
        <div className="kedvencek-container">
          <h1 className="kedvencek-cim">Kedvenc Ajándékaim</h1>
          <div className="kedvencek-grid">
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
          <div className="nincs-adat">Kérlek jelentkezz be a kedvencek megtekintéséhez!</div>
          <Link to="/" className="vissza-gomb">Vissza a főoldalra</Link>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="kedvencek-container animate-fade-in">
        <h1 className="kedvencek-cim animate-slide-up">Kedvenc Ajándékaim</h1>
        {kedvencek.length === 0 ? (
          <div className="nincs-adat-container animate-fade-in">
            <div className="nincs-adat-ikon">💝</div>
            <div className="nincs-adat">Még nincsenek kedvenc ajándékaid.</div>
            <Link to="/ajandekok" className="vissza-gomb">Böngéssz az ajándékok között</Link>
          </div>
        ) : (
          <div className="kedvencek-grid">
            {kedvencek.map((ajandek, index) => (
              <div key={ajandek.id} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                <AjandekKartya 
                  ajandek={ajandek} 
                  isKedvenc={true} 
                  onKedvencValtozas={fetchKedvencek} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Kedvencek;
