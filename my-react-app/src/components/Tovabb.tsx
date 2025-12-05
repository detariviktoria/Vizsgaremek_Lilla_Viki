import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';
import { api, type Ajandek } from '../api';
import './Tovabb.css';

export default function Tovabb() {
  const { username } = useAuth();
  const [ajandekok, setAjandekok] = useState<Ajandek[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!username) {
    return <Navigate to="/bejelentkezes" replace />;
  }

  const handleCategoryClick = async (kategoria: string) => {
    setSelectedCategory(kategoria);
    try {
      const allAjandekok = await api.getAjandekok();
      const filtered = allAjandekok.filter(a => a.kategoria === kategoria);
      setAjandekok(filtered);
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor:', error);
    }
  };

  return (
    <>
      <Header title="Tovább oldal" />
      <main>
        <h2>Ajándékok kategória szerint</h2>
        <button id="elmenyBtn" onClick={() => handleCategoryClick('élmény')}>
          Élmény ajándékok
        </button>
        <button id="targyBtn" onClick={() => handleCategoryClick('tárgy')}>
          Tárgy ajándékok
        </button>
        {ajandekok.length > 0 && (
          <div id="ajandekLista">
            <div className="ajandek-grid">
              {ajandekok.map((ajandek, index) => (
                <div key={index} className="ajandek-item">
                  {ajandek.image_url ? (
                    <img
                      src={`/Képek/${ajandek.image_url}`}
                      alt={ajandek.nev}
                    />
                  ) : (
                    <div className="ajandek-placeholder">
                      Nincs hozzátartozó kép.
                    </div>
                  )}
                  <span>{ajandek.nev}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedCategory && ajandekok.length === 0 && (
          <div id="ajandekLista">
            <p>Nincs ilyen kategóriájú ajándék.</p>
          </div>
        )}
      </main>
    </>
  );
}

