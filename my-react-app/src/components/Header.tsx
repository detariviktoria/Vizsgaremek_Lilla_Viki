import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export default function Header({ title = 'Ajándékajánló', showBack = false }: HeaderProps) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header>
      <div className="logo">
        <img src="/Képek/logo.webp" alt="logo" />
        {title}
      </div>
      <nav id="main-nav">
        {username ? (
          <>
            <span className="user-name">{username}</span>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              Kijelentkezés
            </a>
          </>
        ) : (
          <>
            <Link to="/bejelentkezes">Bejelentkezés</Link>
            <Link to="/regisztracio">Regisztráció</Link>
          </>
        )}
        {showBack && (
          <Link to="/" className="back-btn">Vissza</Link>
        )}
      </nav>
    </header>
  );
}
