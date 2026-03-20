import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import { useAuth } from '../../hooks/useAuth';
import './Welcome.css';

export default function Welcome() {
  const { username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/bejelentkezes');
    }
  }, [username, navigate]);

  if (!username) {
    return null;
  }

  return (
    <>
      <Header title="Kategóriaválasztás" />
      <div className="main-content-container animate-fade-in opacity-0">
        <div className="middle-content">
          <h1 id="welcome-message" className="animate-slide-up opacity-0">Üdvözöllek az oldalon, {username}!</h1>
          <button id="tovabb_gomb" className="animate-slide-up opacity-0 [animation-delay:200ms] transition-all duration-300 hover:scale-105 active:scale-95" onClick={() => navigate('/tovabb')}>
            Tovább
          </button>
        </div>
      </div>
    </>
  );
}

