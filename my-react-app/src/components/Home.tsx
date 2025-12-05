import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import Header from './Header';

// import './Home.css'; // A globális CSS-t használjuk helyette, ami a Web/style.css-ből jön



export default function Home() {

  const navigate = useNavigate();

  const { username, isChecking } = useAuth();



  console.log('🏠 Home - username:', username, 'isChecking:', isChecking);



  return (

    <>

      <Header />

      {/* Hős kép/Nyitóoldal */}

      <section className="hero">

        <div className="search-bar">

          <input type="text" placeholder="Keresés ajándékokra..." />

        </div>

        <div className="hero-overlay">

          <h1>Találd meg a tökéletes ajándékot!</h1>

          <button id="startBtn" onClick={() => navigate('/kategoria')}>

            Kezdés

          </button>

        </div>

      </section>

    </>

  );

}

