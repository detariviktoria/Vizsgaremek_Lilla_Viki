import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api, type Ajandek } from '../api';
import AjandekKartya from './AjandekKartya';
import Header from './Header';
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
        <div className="loading">Betöltés...</div>
      </>
    );
  }

  if (!userId) {
    return (
      <>
        <Header />
        <div className="nincs-adat">Kérlek jelentkezz be a kedvencek megtekintéséhez!</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="kedvencek-container">
        <h1 className="kedvencek-cim">Kedvenc Ajándékaim</h1>
        {kedvencek.length === 0 ? (
          <div className="nincs-adat">Még nincsenek kedvenc ajándékaid.</div>
        ) : (
          <div className="kedvencek-grid">
            {kedvencek.map((ajandek) => (
              <AjandekKartya 
                key={ajandek.id} 
                ajandek={ajandek} 
                isKedvenc={true} 
                onKedvencValtozas={fetchKedvencek} // Újratöltjük a listát törlés után
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Kedvencek;