import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import Chat from './Chat';

import UserSelect from './UserSelect';

import './Header.css';

import './ChatModal.css';

import type { User } from "../api";



interface HeaderProps {

  title?: string;

  showBack?: boolean;

}



export default function Header({ title = 'Ajándékajánló', showBack = false }: HeaderProps) {

  const { username, logout, remainingTime } = useAuth();

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);



  const handleLogout = async () => {

    await logout();

    navigate('/');

  };



  const toggleMenu = () => {

    setIsMenuOpen(!isMenuOpen);

  };



  return (

    <header>

      <div className="header-left">
        <Link to="/" className="logo-link">
          <div className="logo">
            <img src="/images/logo.webp" alt="logo" />
            {title}
          </div>
        </Link>
      </div>



      <div className="header-center">

        {username && (

          <span className="welcome-text">

            Szia, {username}! {remainingTime && <span className="timer">({remainingTime})</span>}

          </span>

        )}

      </div>



      <nav id="main-nav" className="header-right">

        {username ? (

          <>

            <Link to="/kedvencek" title="Kedvencek" className="icon-link">❤️</Link>
            <button className="chat-icon-btn" onClick={() => setIsChatOpen(true)} title="Chat">💬</button>
            <Link to="/baratok" title="Barátok" className="icon-link">👥</Link>
            <Link to="/elozmenyek" title="Előzmények" className="icon-link">🕒</Link>

            

            <div className="menu-container">

              <button onClick={toggleMenu} className="settings-btn" title="Beállítások">

                ⚙️

              </button>

              {isMenuOpen && (

                <div className="dropdown-menu">

                  <Link to="/profil" className="menu-item" onClick={() => setIsMenuOpen(false)}>

                    Profilom

                  </Link>

                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="menu-item">

                    Kijelentkezés

                  </a>

                </div>

              )}


            </div>

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

      {isChatOpen && (
        <div className="chat-modal-bg" onClick={() => setIsChatOpen(false)}>
          <div className="chat-modal" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <span>Chat</span>
              <button className="chat-modal-close" onClick={() => setIsChatOpen(false)}>✖</button>
            </div>
            <div style={{padding: '0 20px'}}>
              <UserSelect onSelect={setSelectedUser} selectedUserId={selectedUser?.user_id} />
            </div>
            <div style={{padding: '0 20px'}}>
              {selectedUser && (
                <Chat key={selectedUser.user_id} currentUser={{user_id: Number(sessionStorage.getItem('userId')), name: username || '', email: '', password: ''}} selectedUser={selectedUser} />
              )}
            </div>
          </div>
        </div>
      )}

    </header>

  );

}