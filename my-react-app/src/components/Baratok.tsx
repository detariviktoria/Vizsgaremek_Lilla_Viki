import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../api';
import Header from './Header';
import './Baratok.css';

interface Friend {
  email: string;
  name: string;
  status: string;
  accepted: boolean;
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
      <div className="baratok-container">
        <h1 className="baratok-cim">Meghívott Barátaim</h1>
        {baratok.length === 0 ? (
          <div className="nincs-adat">Még nem hívtál meg senkit, vagy senki sem regisztrált a meghívóra.</div>
        ) : (
          <div className="baratok-lista">
            {baratok.map((barat, index) => (
              <div key={index} className="barat-item">
                <div className="barat-info">
                  <div className="barat-email">{barat.email}</div>
                  {barat.name && <div className="barat-name">{barat.name}</div>}
                </div>
                <div className={`barat-status ${barat.accepted ? 'elfogadva' : 'fuggo'}`}>
                  {barat.accepted ? 'Elfogadva' : 'Függőben'}
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

