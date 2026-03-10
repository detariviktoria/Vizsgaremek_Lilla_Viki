import { useState, useEffect } from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';

import Header from './Header';

import AjandekKartya from './AjandekKartya';

import { useAuth } from '../hooks/useAuth';

import { api, type Ajandek } from '../api';

import './Tovabb.css';



export default function Tovabb() {

  const { username, userId } = useAuth();

  const [ajandekok, setAjandekok] = useState<Ajandek[]>([]);

  const [kedvencekIds, setKedvencekIds] = useState<number[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [searchParams] = useSearchParams();



  if (!username) {

    return <Navigate to="/" replace />;

  }



  useEffect(() => {

    const kategoria = searchParams.get('kategoria');

    if (kategoria) {

      handleCategoryClick(kategoria);

    }

  }, [searchParams]);



  const handleCategoryClick = async (kategoria: string) => {

    setSelectedCategory(kategoria);

    try {

      const [allAjandekok, kedvencData] = await Promise.all([
        api.getAjandekok(),
        userId ? api.getKedvencek(userId) : Promise.resolve([])
      ]);

      const filtered = allAjandekok.filter(a => a.kategoria === kategoria);

      setAjandekok(filtered);
      if (userId) {
        setKedvencekIds(kedvencData.map(k => k.id!).filter(id => id !== undefined));
      }

    } catch (error) {

      console.error('Hiba az ajándékok lekérésekor:', error);

    }

  };



  return (
    <>
      <Header title="Tovább oldal" />
      <main className="animate-fade-in opacity-0">
        <h2 className="animate-slide-up opacity-0">Ajándékok kategória szerint</h2>
        <button id="elmenyBtn" className="animate-slide-up opacity-0 [animation-delay:100ms] transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => handleCategoryClick('élmény')}>
          Élmény ajándékok
        </button>
        <button id="targyBtn" className="animate-slide-up opacity-0 [animation-delay:150ms] transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => handleCategoryClick('tárgy')}>
          Tárgy ajándékok
        </button>
        {ajandekok.length > 0 && (
          <div id="ajandekLista" className="animate-fade-in opacity-0">
            <div className="ajandek-grid">
              {ajandekok.map((ajandek) => (
                <AjandekKartya 
                  key={ajandek.id} 
                  ajandek={ajandek} 
                  isKedvenc={ajandek.id ? kedvencekIds.includes(ajandek.id) : false}
                />
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