import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';
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
      <div className="main-content-container">
        <div className="middle-content">
          <h1 id="welcome-message">Üdvözöllek az oldalon, {username}!</h1>
          <button id="tovabb_gomb" onClick={() => navigate('/tovabb')}>
            Tovább
          </button>
        </div>
      </div>
    </>
  );
}

