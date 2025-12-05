import { useState } from 'react';
import Header from './Header';
import { api, type Ajandek } from '../api';
import './KategoriaValasztas.css';

type FilterMode = 'alkalom' | 'stilus' | 'celcsoport';

export default function KategoriaValasztas() {
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [ajandekok, setAjandekok] = useState<Ajandek[]>([]);
  const [mode, setMode] = useState<FilterMode | null>(null);

  const handleFilterClick = async (filterMode: FilterMode) => {
    setMode(filterMode);
    setAjandekok([]);
    try {
      let data: string[] = [];
      if (filterMode === 'alkalom') {
        data = await api.getAlkalmak();
      } else if (filterMode === 'stilus') {
        data = await api.getStilusok();
      } else if (filterMode === 'celcsoport') {
        data = await api.getCelcsoportok();
      }
      setSubcategories(data);
    } catch (error) {
      console.error('Hiba a kategóriák lekérésekor:', error);
    }
  };

 const handleSubcategoryClick = async (subcategory: string) => {
  if (!mode) return;
  try {
    let data: Ajandek[] = [];
    if (mode === 'alkalom') {
      data = await api.getAjandekokByAlkalom(subcategory);
    } else if (mode === 'stilus') {
      data = await api.getAjandekokByStilus(subcategory);
    } else if (mode === 'celcsoport') {
      data = await api.getAjandekokByCelcsoport(subcategory);
    }
    setAjandekok(data);
    setSubcategories([]);
  } catch (error) {
    console.error('Hiba az ajándékok lekérésekor:', error);
  }
};

  return (
    <>
      <Header title="Kategóriaválasztás" />
      <div className="main-content-container">
        <div className="filter-panel">
          <h2 className="filter-title">Szűrés</h2>
          <div className="category-select">
            <button onClick={() => handleFilterClick('alkalom')}>Alkalmak</button>
            <button onClick={() => handleFilterClick('stilus')}>Stílusok</button>
            <button onClick={() => handleFilterClick('celcsoport')}>Célcsoportok</button>
          </div>
        </div>
        <div className="middle-content">
          <div className="subcategories">
            {subcategories.length > 0 && (
              <div className="subcat-list">
                {subcategories.map((cat, index) => (
                  <div
                    key={index}
                    className="subcat-item"
                    onClick={() => handleSubcategoryClick(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
            {ajandekok.length > 0 && (
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
            )}
            {/* {subcategories.length === 0 && ajandekok.length === 0 && (
              <p style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                Válassz egy szűrőt a bal oldalon!
              </p>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

