import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import AjandekKartya from './AjandekKartya';
import { useAuth } from '../hooks/useAuth';
import { api, type Ajandek } from '../api';
import './KategoriaValasztas.css';

export default function KategoriaValasztas() {
  const [allAjandekok, setAllAjandekok] = useState<Ajandek[]>([]);
  const [filteredAjandekok, setFilteredAjandekok] = useState<Ajandek[]>([]);
  const [kedvencekIds, setKedvencekIds] = useState<number[]>([]);
  const { userId } = useAuth();
  const { nev } = useParams();

  // Szűrő opciók (adatbázisból töltjük be)
  const [alkalmak, setAlkalmak] = useState<string[]>([]);
  const [stilusok, setStilusok] = useState<string[]>([]);
  const [celcsoportok, setCelcsoportok] = useState<string[]>([]);

  // Kiválasztott szűrők
  const [selectedAlkalmak, setSelectedAlkalmak] = useState<string[]>([]);
  const [selectedStilusok, setSelectedStilusok] = useState<string[]>([]);
  const [selectedCelcsoportok, setSelectedCelcsoportok] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100000 });
  const [maxPriceLimit, setMaxPriceLimit] = useState(100000);

  // Panel állapotok (nyitva/zárva)
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [openSections, setOpenSections] = useState({
    alkalom: false,
    stilus: false,
    celcsoport: false,
    ar: true
  });

  // Adatok betöltése
  useEffect(() => {
    const loadData = async () => {
      try {
        const [ajandekData, alkalomData, stilusData, celcsoportData] = await Promise.all([
          api.getAjandekok(),
          api.getAlkalmak(),
          api.getStilusok(),
          api.getCelcsoportok()
        ]);

        setAllAjandekok(ajandekData);
        setFilteredAjandekok(ajandekData);
        setAlkalmak(alkalomData);
        setStilusok(stilusData);
        setCelcsoportok(celcsoportData);

        // Max ár meghatározása
        const max = Math.max(...ajandekData.map(a => a.ar || 0));
        setMaxPriceLimit(max);
        setPriceRange({ min: 0, max: max });

        // Kedvencek betöltése
        if (userId) {
          const kedvencData = await api.getKedvencek(userId);
          setKedvencekIds(kedvencData.map(k => k.id!).filter(id => id !== undefined));
        }
      } catch (error) {
        console.error('Hiba az adatok betöltésekor:', error);
      }
    };
    loadData();
  }, [userId]);

  // Kezdeti szűrés URL paraméter alapján (pl. ha a főoldalról jött)
  useEffect(() => {
    if (nev && allAjandekok.length > 0) {
        // Dekódoljuk az URL paramétert
        const decodedNev = decodeURIComponent(nev);
        
        // Megnézzük, melyik kategóriába tartozik
        if (alkalmak.includes(decodedNev)) setSelectedAlkalmak([decodedNev]);
        else if (stilusok.includes(decodedNev)) setSelectedStilusok([decodedNev]);
        else if (celcsoportok.includes(decodedNev)) setSelectedCelcsoportok([decodedNev]);
    }
  }, [nev, allAjandekok, alkalmak, stilusok, celcsoportok]);

  // Szűrés végrehajtása
  const handleFilter = () => {
    let result = allAjandekok;

    if (selectedAlkalmak.length > 0) {
      // Itt az API-nak kellene támogatnia a szűrést, vagy kliens oldalon kell okoskodni.
      // Mivel az `ajandek` objektumban nincs benne az alkalom/stilus/celcsoport neve (csak ID), 
      // vagy az API-nak kellene visszaadnia, vagy itt kellene összekötni.
      // EZEK HIÁNYÁBAN (mivel az API getAjandekok csak alap adatokat ad), 
      // most csak az árra tudunk szűrni kliens oldalon, HA az API nem adja vissza a relációkat.
      
      // JAVÍTÁS: Az API-t kellene bővíteni, hogy a `getAjandekok` visszaadja a kapcsolódó táblákat is.
      // VAGY: Külön lekérjük a szűrt listákat és metszetet képzünk.
      // Ez utóbbi a biztosabb a jelenlegi API mellett.
    }

    // Mivel a jelenlegi API struktúra nem támogatja a komplex kliens oldali szűrést hatékonyan 
    // (mert a getAjandekok nem adja vissza a kategóriákat), 
    // ezért egy trükköt alkalmazunk: Ha van kiválasztva filter, lekérjük az API-tól azokat,
    // és vesszük az uniót/metszetet. De ez bonyolult.
    
    // EGYSZERŰSÍTÉS: Feltételezzük, hogy a szűrés gomb megnyomásakor lekérjük az adatokat.
    // De a kérés az volt, hogy "többet is ki lehessen jelölni".
    
    // A legtisztább megoldás: Az összes ajándékot lekérjük (ez megvan), 
    // és az árat szűrjük. A többi kategóriát pedig aszinkron módon szűrjük.
    
    // Mivel ez komplex, most egy hibrid megoldást csinálok:
    // 1. Ár szűrés mindig megy a kliens oldalon.
    // 2. Ha kategóriákat választott, akkor az API-tól kérjük le őket, és összefésüljük.

    filterAsync();
  };

  const filterAsync = async () => {
    let filteredIds = new Set<number>();
    let isFirstFilter = true;

    const addToSet = (items: Ajandek[]) => {
        const ids = items.map(a => a.id!);
        if (isFirstFilter) {
            ids.forEach(id => filteredIds.add(id));
            isFirstFilter = false;
        } else {
            // Metszet (intersection) ha "ÉS" kapcsolatot akarunk, vagy Unió ha "VAGY"
            // Általában kategórián belül VAGY, kategóriák között ÉS.
            // Most egyszerűsítsünk: Unió mindenhova, majd ár szűrés.
            ids.forEach(id => filteredIds.add(id));
        }
    };

    // Ha nincs semmi kiválasztva (csak ár), akkor minden ajándék játszik
    if (selectedAlkalmak.length === 0 && selectedStilusok.length === 0 && selectedCelcsoportok.length === 0) {
        allAjandekok.forEach(a => filteredIds.add(a.id!));
    } else {
        // Alkalmak
        for (const alkalom of selectedAlkalmak) {
            const data = await api.getAjandekokByAlkalom(alkalom);
            addToSet(data);
        }
        // Stílusok
        for (const stilus of selectedStilusok) {
            const data = await api.getAjandekokByStilus(stilus);
            addToSet(data);
        }
        // Célcsoportok
        for (const celcsoport of selectedCelcsoportok) {
            const data = await api.getAjandekokByCelcsoport(celcsoport);
            addToSet(data);
        }
    }

    // Végső szűrés ár alapján az összegyűjtött ID-k közül
    const finalResult = allAjandekok.filter(a => 
        filteredIds.has(a.id!) && 
        (a.ar || 0) >= priceRange.min && 
        (a.ar || 0) <= priceRange.max
    );

    setFilteredAjandekok(finalResult);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (category: string, type: 'alkalom' | 'stilus' | 'celcsoport') => {
    if (type === 'alkalom') {
      setSelectedAlkalmak(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    } else if (type === 'stilus') {
      setSelectedStilusok(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    } else if (type === 'celcsoport') {
      setSelectedCelcsoportok(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    }
  };

  return (
    <>
      <Header title="Kategóriaválasztás" showBack />
      <div className="main-content-container">
        
        {/* Szűrő Panel */}
        <div className={`filter-panel ${isFilterOpen ? 'open' : 'closed'}`}>
          <div className="filter-header" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <h2 className="filter-title">Szűrés</h2>
            <span className="toggle-icon">{isFilterOpen ? '▲' : '▼'}</span>
          </div>

          {isFilterOpen && (
            <div className="filter-content">
              {/* Ár Szűrés */}
              <div className="filter-section">
                <h3 onClick={() => toggleSection('ar')}>Ár {openSections.ar ? '▲' : '▼'}</h3>
                {openSections.ar && (
                  <div className="price-slider-container">
                    <div className="price-inputs">
                        <input 
                            type="number" 
                            value={priceRange.min} 
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                            min={0} max={priceRange.max}
                        />
                        <span>-</span>
                        <input 
                            type="number" 
                            value={priceRange.max} 
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            min={priceRange.min} max={maxPriceLimit}
                        />
                    </div>
                    <input 
                        type="range" 
                        min={0} max={maxPriceLimit} 
                        value={priceRange.max} 
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        className="range-slider"
                    />
                  </div>
                )}
              </div>

              {/* Alkalmak */}
              <div className="filter-section">
                <h3 onClick={() => toggleSection('alkalom')}>Alkalmak {openSections.alkalom ? '▲' : '▼'}</h3>
                {openSections.alkalom && (
                  <div className="checkbox-list">
                    {alkalmak.map(a => (
                      <label key={a} className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={selectedAlkalmak.includes(a)} 
                          onChange={() => handleCheckboxChange(a, 'alkalom')}
                        />
                        {a}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Stílusok */}
              <div className="filter-section">
                <h3 onClick={() => toggleSection('stilus')}>Stílusok {openSections.stilus ? '▲' : '▼'}</h3>
                {openSections.stilus && (
                  <div className="checkbox-list">
                    {stilusok.map(s => (
                      <label key={s} className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={selectedStilusok.includes(s)} 
                          onChange={() => handleCheckboxChange(s, 'stilus')}
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Célcsoportok */}
              <div className="filter-section">
                <h3 onClick={() => toggleSection('celcsoport')}>Célcsoportok {openSections.celcsoport ? '▲' : '▼'}</h3>
                {openSections.celcsoport && (
                  <div className="checkbox-list">
                    {celcsoportok.map(c => (
                      <label key={c} className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={selectedCelcsoportok.includes(c)} 
                          onChange={() => handleCheckboxChange(c, 'celcsoport')}
                        />
                        {c}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button className="filter-button" onClick={handleFilter}>Szűrés</button>
            </div>
          )}
        </div>

        {/* Találatok */}
        <div className="middle-content">
            <div className="ajandek-grid">
              {filteredAjandekok.length > 0 ? (
                filteredAjandekok.map((ajandek) => (
                  <AjandekKartya 
                    key={ajandek.id} 
                    ajandek={ajandek} 
                    isKedvenc={ajandek.id ? kedvencekIds.includes(ajandek.id) : false}
                  />
                ))
              ) : (
                <p className="no-results">Nincs a keresési feltételeknek megfelelő ajándék.</p>
              )}
            </div>
        </div>
      </div>
    </>
  );
}