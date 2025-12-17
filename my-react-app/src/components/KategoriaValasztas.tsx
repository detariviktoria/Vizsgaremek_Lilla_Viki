import { useState, useEffect } from 'react';

import { useParams, useSearchParams, useLocation } from 'react-router-dom';



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



  const [searchParams] = useSearchParams();



  const location = useLocation();



  let pageTitle = 'Ajándékok';

  let categoryFilter: string | null = null;



  if (location.pathname === '/elmeny') {

    pageTitle = 'Élmények';

    categoryFilter = 'élmény';

  } else if (location.pathname === '/targy') {

    pageTitle = 'Tárgyak';

    categoryFilter = 'tárgy';

  }



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



        let filteredData = ajandekData;

        if (categoryFilter) {

          filteredData = ajandekData.filter(a => a.kategoria === categoryFilter);

        }



        setAllAjandekok(filteredData);



        setFilteredAjandekok(filteredData);



        setAlkalmak(alkalomData);



        setStilusok(stilusData);



        setCelcsoportok(celcsoportData);







        // Max ár meghatározása



        const max = Math.max(...filteredData.map(a => a.ar || 0));

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

  }, [userId, categoryFilter]);



  // URL paraméterek kezelése (Path param + Query params)

  useEffect(() => {

    if (allAjandekok.length === 0) return;



    let initAlkalmak = [];

    let initStilusok = [];

    let initCelcsoportok = [];

    let initMinPrice = 0;

    let initMaxPrice = maxPriceLimit;

    let shouldFilter = false;



    // 1. Path paraméter (régi működés: /alkalom/Karácsony)

    if (nev) {

        const decodedNev = decodeURIComponent(nev);

        if (alkalmak.includes(decodedNev)) initAlkalmak.push(decodedNev);

        else if (stilusok.includes(decodedNev)) initStilusok.push(decodedNev);

        else if (celcsoportok.includes(decodedNev)) initCelcsoportok.push(decodedNev);

        shouldFilter = true;

    }



    // 2. Query paraméterek (új működés: ?alkalom=...&stilus=...)

    const paramAlkalom = searchParams.getAll('alkalom');

    if (paramAlkalom.length > 0) {

        initAlkalmak = [...initAlkalmak, ...paramAlkalom];

        shouldFilter = true;

    }

    

    const paramStilus = searchParams.getAll('stilus');

    if (paramStilus.length > 0) {

        initStilusok = [...initStilusok, ...paramStilus];

        shouldFilter = true;

    }



    const paramCelcsoport = searchParams.getAll('celcsoport');

    if (paramCelcsoport.length > 0) {

        initCelcsoportok = [...initCelcsoportok, ...paramCelcsoport];

        shouldFilter = true;

    }



    const minP = searchParams.get('minPrice');

    const maxP = searchParams.get('maxPrice');

    if (minP) { initMinPrice = Number(minP); shouldFilter = true; }

    if (maxP) { initMaxPrice = Number(maxP); shouldFilter = true; }

    else initMaxPrice = maxPriceLimit;



    // Duplikációk szűrése

    initAlkalmak = [...new Set(initAlkalmak)];

    initStilusok = [...new Set(initStilusok)];

    initCelcsoportok = [...new Set(initCelcsoportok)];



    // Állapot frissítése

    setSelectedAlkalmak(initAlkalmak);

    setSelectedStilusok(initStilusok);

    setSelectedCelcsoportok(initCelcsoportok);

    setPriceRange({ min: initMinPrice, max: initMaxPrice });



    if (shouldFilter) {

        filterWithParams(initAlkalmak, initStilusok, initCelcsoportok, initMinPrice, initMaxPrice);

    }



  }, [allAjandekok, nev, searchParams, alkalmak, stilusok, celcsoportok, maxPriceLimit]);



  const handleFilter = () => {

    filterWithParams(selectedAlkalmak, selectedStilusok, selectedCelcsoportok, priceRange.min, priceRange.max);

  };



  const filterWithParams = async (alk: string[], stil: string[], cel: string[], minP: number, maxP: number) => {

    let filteredIds = new Set<number>();

    let isFirstFilter = true;



    const addToSet = (items: Ajandek[]) => {

        const ids = items.map(a => a.id!);

        if (isFirstFilter) {

            ids.forEach(id => filteredIds.add(id));

            isFirstFilter = false;

        } else {

            ids.forEach(id => filteredIds.add(id));

        }

    };



    if (alk.length === 0 && stil.length === 0 && cel.length === 0) {

        allAjandekok.forEach(a => filteredIds.add(a.id!));

    } else {

        for (const alkalom of alk) {

            const data = await api.getAjandekokByAlkalom(alkalom);

            addToSet(data);

        }

        for (const stilus of stil) {

            const data = await api.getAjandekokByStilus(stilus);

            addToSet(data);

        }

        for (const celcsoport of cel) {

            const data = await api.getAjandekokByCelcsoport(celcsoport);

            addToSet(data);

        }

    }



    const finalResult = allAjandekok.filter(a => 

        filteredIds.has(a.id!) && 

        (a.ar || 0) >= minP && 

        (a.ar || 0) <= maxP

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

      <Header title={pageTitle} showBack />

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