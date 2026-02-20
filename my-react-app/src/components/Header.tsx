import { useEffect, useState } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import Chat from './Chat';

import UserSelect from './UserSelect';

import AuthModal from './AuthModal';

import './Header.css';

import './ChatModal.css';

import { api, type User } from "../api";
import socket from "../socket";



interface HeaderProps {

  title?: string;

}



export default function Header({ title = 'Ajándékajánló' }: HeaderProps) {

  const { username, userId, logout, remainingTime } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [hasUnread, setHasUnread] = useState(false);

  const [highlightUserId, setHighlightUserId] = useState<number | undefined>(undefined);
  const [highlightUserName, setHighlightUserName] = useState<string | undefined>(undefined);

  const currentUserId = userId;

  const isAuthPage = location.pathname === '/bejelentkezes' || location.pathname === '/regisztracio';

  useEffect(() => {
    if (!currentUserId) return;
    socket.emit("join", currentUserId);
  }, [currentUserId]);

  // Új privát üzenetek figyelése értesítéshez
  useEffect(() => {
    if (!currentUserId) return;

    const handler = (msg: { from: number; to: number; message: string }) => {
      // Ha nekünk jön üzenet, és a chat nincs nyitva, vagy más van megnyitva, frissítsük az állapotot
      if (msg.to === currentUserId) {
        checkUnread();
      }
    };

    socket.on("private message", handler);
    return () => {
      socket.off("private message", handler);
    };
  }, [currentUserId, isChatOpen]);

  // Kezdeti olvasatlan üzenetek ellenőrzése
  const checkUnread = () => {
    if (!currentUserId) return;
    api.getUnreadChatCount(currentUserId).then(data => {
      setHasUnread(data.unreadCount > 0);
    }).catch(console.error);
  };

  // Olvasatlan üzenetek feladóinak lekérése
  const fetchUnreadSenders = async () => {
    if (!currentUserId) return;
    try {
      const response = await fetch(`http://localhost:3000/api/chat/unread-senders/${currentUserId}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setHighlightUserId(data[0]); // csak az elsőt emeljük ki
        } else {
          setHighlightUserId(undefined);
        }
      }
    } catch (e) {
      setHighlightUserId(undefined);
    }
  };
  useEffect(() => { fetchUnreadSenders(); }, [currentUserId, isChatOpen]);

  useEffect(() => {
    checkUnread();
  }, [currentUserId]);

  // Whenever highlightUserId changes, fetch the user's name
  useEffect(() => {
    if (highlightUserId) {
      api.getUser(highlightUserId).then(user => {
        setHighlightUserName(user.name);
      }).catch(() => setHighlightUserName(undefined));
    } else {
      setHighlightUserName(undefined);
    }
  }, [highlightUserId]);

  const handleLogout = async () => {

    await logout();

    navigate('/');

  };



  const toggleMenu = () => {

    setIsMenuOpen(!isMenuOpen);

  };



  return (

    <header>

      {/* Értesítés új üzenetről, ha van kiemelt feladó és a chat nincs nyitva */}
      {highlightUserId && highlightUserName && !isChatOpen && (
        <div style={{background:'#ff69b4',color:'white',padding:'10px',fontWeight:700,textAlign:'center'}}>
          {highlightUserName} üzenetet küldött neked!
        </div>
      )}

      <div className="header-left">
        <Link to="/" className="logo-link">
          <div className="logo">
            <img src="/Képek/logo.webp" alt="logo" />
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

          <div className="nav-icons">

            <Link to="/kedvencek" title="Kedvencek" className="icon-link">❤️</Link>
            <button className="chat-icon-btn" onClick={() => setIsChatOpen(true)} title="Chat">
              💬
              {hasUnread && <span className="chat-unread-dot" />}
            </button>
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

          </div>

        ) : (

          <div className="nav-links">
            <button className="auth-btn" onClick={() => { setAuthTab('login'); setIsAuthModalOpen(true); }}>Bejelentkezés</button>
            <button className="auth-btn" onClick={() => { setAuthTab('register'); setIsAuthModalOpen(true); }}>Regisztráció</button>
          </div>

        )}

      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialTab={authTab} 
      />

      {isChatOpen && (
        <div className="chat-modal-bg" onClick={() => setIsChatOpen(false)}>
          <div className="chat-modal" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <span>Chat</span>
              <button className="chat-modal-close" onClick={() => setIsChatOpen(false)}>✖</button>
            </div>
            <div style={{padding: '0 20px'}}>
              <UserSelect onSelect={setSelectedUser} selectedUserId={selectedUser?.user_id} highlightUserId={highlightUserId} />
            </div>
            <div style={{padding: '0 20px'}}>
              {selectedUser && (
                <Chat 
                  key={selectedUser.user_id} 
                  currentUser={{user_id: Number(userId), name: username || '', email: '', password: ''}} 
                  selectedUser={selectedUser}
                  onMessagesRead={checkUnread}
                />
              )}
            </div>
          </div>
        </div>
      )}

    </header>

  );

}