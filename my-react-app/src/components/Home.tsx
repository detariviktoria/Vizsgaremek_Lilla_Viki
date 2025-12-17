import { useState, useEffect } from 'react';

import { useNavigate, createSearchParams } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import Header from './Header';

import { api } from '../api';

import './Home.css';

import './KategoriaValasztas.css';



export default function Home() {

  const navigate = useNavigate();

  const { username, isChecking } = useAuth();



  const [alkalmak, setAlkalmak] = useState<string[]>([]);

  const [stilusok, setStilusok] = useState<string[]>([]);

  const [celcsoportok, setCelcsoportok] = useState<string[]>([]);



  // Kiválasztott szűrők

  const [selectedAlkalmak, setSelectedAlkalmak] = useState<string[]>([]);

  const [selectedStilusok, setSelectedStilusok] = useState<string[]>([]);

  const [selectedCelcsoportok, setSelectedCelcsoportok] = useState<string[]>([]);

  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100000 });

  const [maxPriceLimit, setMaxPriceLimit] = useState(100000);



  // Panel állapotok

  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const [openSections, setOpenSections] = useState({

    alkalom: false,

    stilus: false,

    celcsoport: false,

    ar: true

  });



  useEffect(() => {

    const fetchData = async () => {

      try {

        const [ajandekData, alkalmakData, stilusData, celcsoportData] = await Promise.all([

          api.getAjandekok(),

          api.getAlkalmak(),

          api.getStilusok(),

          api.getCelcsoportok()

        ]);



        setAlkalmak(alkalmakData);

        setStilusok(stilusData);

        setCelcsoportok(celcsoportData);



        // Max ár meghatározása

        const max = Math.max(...ajandekData.map(a => a.ar || 0));

        setMaxPriceLimit(max);

        setPriceRange({ min: 0, max: max });



      } catch (error) {

        console.error('Hiba az adatok betöltésekor:', error);

      }

    };

    fetchData();

  }, []);



  console.log('🏠 Home - username:', username, 'isChecking:', isChecking);



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



  const handleFilter = () => {

    const params: any = {};

    if (selectedAlkalmak.length > 0) params.alkalom = selectedAlkalmak;

    if (selectedStilusok.length > 0) params.stilus = selectedStilusok;

    if (selectedCelcsoportok.length > 0) params.celcsoport = selectedCelcsoportok;

    

    params.minPrice = priceRange.min.toString();

    params.maxPrice = priceRange.max.toString();



    navigate({



      pathname: '/ajandekok',



      search: createSearchParams(params).toString()



    });

  };



  return (

    <>

      <Header />

      <div className="home-container">

        <div className="search-section">

           <div className="search-bar-home">

            <i className="search-icon">🔍</i>

            <input type="text" placeholder="Keresés ajándékokra..." />

          </div>

        </div>



        <div className="content-grid">



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







          <div className="main-cards">



            <div className="card" onClick={() => navigate('/elmeny')}>



              <img src="/Képek/elmeny.jpg" alt="Élményajándékok" />



              <div className="card-title">Élményajándékok</div>



            </div>







            <div className="card" onClick={() => navigate('/targy')}>



              <img src="/Képek/targy.jpg" alt="Tárgyi ajándékok" />



              <div className="card-title">Tárgyi ajándékok</div>



            </div>            







             <div className="invite-banner">



              <div className="invite-content">



                <h2>Hívd meg barátaidat, és szerezz kuponokat!</h2>



                <button className="invite-btn">Meghívás indítása</button>



              </div>



            </div>



          </div>



        </div>

      </div>

    </>

  );

}