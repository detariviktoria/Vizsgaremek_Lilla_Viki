import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import Header from './Header';

import { api } from '../api';

import './Home.css';



export default function Home() {

  const navigate = useNavigate();

  const { username, isChecking } = useAuth();

  const [alkalmak, setAlkalmak] = useState<string[]>([]);



  const [stilusok, setStilusok] = useState<string[]>([]);



  const [celcsoportok, setCelcsoportok] = useState<string[]>([]);



  const [selectedFilter, setSelectedFilter] = useState<{ type: 'alkalom' | 'stilus' | 'celcsoport'; value: string } | null>(null);







  useEffect(() => {

    const fetchData = async () => {

      try {

        const alkalmakData = await api.getAlkalmak();

        setAlkalmak(alkalmakData);

        const stilusokData = await api.getStilusok();

        setStilusok(stilusokData);

        const celcsoportokData = await api.getCelcsoportok();

        setCelcsoportok(celcsoportokData);

      } catch (error) {

        console.error('Hiba az adatok betöltésekor:', error);

      }

    };

    fetchData();

  }, []);



  console.log('🏠 Home - username:', username, 'isChecking:', isChecking);



  const handleCheckboxChange = (type: 'alkalom' | 'stilus' | 'celcsoport', value: string) => {

    if (selectedFilter?.type === type && selectedFilter?.value === value) {

      setSelectedFilter(null);

    } else {

      setSelectedFilter({ type, value });

    }

  };



  const handleFilterClick = () => {

    if (selectedFilter) {

      navigate(`/${selectedFilter.type}/${encodeURIComponent(selectedFilter.value)}`);

    }

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



          <aside className="filter-sidebar">



            <button 

              className={`filter-heading-btn ${selectedFilter ? 'active' : ''}`}

              onClick={handleFilterClick}

            >

              Szűrés

            </button>



            



            <div className="filter-group">



              <h3>Célcsoport szerint</h3>



              <div className="checkbox-list">



                {celcsoportok.map((item, index) => (



                  <label key={index} className="checkbox-item">



                    <input 

                      type="checkbox" 

                      checked={selectedFilter?.type === 'celcsoport' && selectedFilter?.value === item}

                      onChange={() => handleCheckboxChange('celcsoport', item)}

                    />



                    <span>{item}</span>



                  </label>



                ))}



              </div>



            </div>







            <div className="filter-group">



              <h3>Alkalom szerint</h3>



              <div className="checkbox-list">



                {alkalmak.map((item, index) => (



                  <label key={index} className="checkbox-item">



                    <input 

                      type="checkbox" 

                      checked={selectedFilter?.type === 'alkalom' && selectedFilter?.value === item}

                      onChange={() => handleCheckboxChange('alkalom', item)}

                    />



                    <span>{item}</span>



                  </label>



                ))}



              </div>



            </div>







            <div className="filter-group">



              <h3>Stílus szerint</h3>



              <div className="checkbox-list">



                {stilusok.map((item, index) => (



                  <label key={index} className="checkbox-item">



                    <input 

                      type="checkbox" 

                      checked={selectedFilter?.type === 'stilus' && selectedFilter?.value === item}

                      onChange={() => handleCheckboxChange('stilus', item)}

                    />



                    <span>{item}</span>



                  </label>



                ))}



              </div>



            </div>



          </aside>

        </div>

      </div>

    </>

  );

}