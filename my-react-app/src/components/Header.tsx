import { useEffect, useState, useCallback } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import Chat from './Chat';
import Notifications from './Notifications';
import MyCoupons from './MyCoupons';

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

  const [isCouponsOpen, setIsCouponsOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages');

  const [hasUnread, setHasUnread] = useState(false);
  const [hasUnreadNotif, setHasUnreadNotif] = useState(false);

  const [highlightUserIds, setHighlightUserIds] = useState<number[]>([]);
  const [highlightUserName, setHighlightUserName] = useState<string | undefined>(undefined);

  const currentUserId = userId;

  const isAuthPage = location.pathname === '/bejelentkezes' || location.pathname === '/regisztracio';

  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'register' | 'forgot'>('login');

  useEffect(() => {
    const handleOpenForgot = () => {
      setAuthModalInitialTab('forgot');
      setIsAuthModalOpen(true);
    };
    window.addEventListener('open-forgot-password', handleOpenForgot);
    return () => window.removeEventListener('open-forgot-password', handleOpenForgot);
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    // Mindig join-oljon, ha van userId
    const joinRoom = () => {
      socket.emit("join", currentUserId);
    };
    if (socket.connected) {
      joinRoom();
    }
    socket.on("connect", joinRoom);
    return () => {
      socket.off("connect", joinRoom);
    };
  }, [currentUserId]);

  // Olvasatlan üzenetek feladóinak lekérése
  const fetchUnreadSenders = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const data = await api.getUnreadSenders(currentUserId);
      // Csak akkor frissítsük, ha tényleg változott az adat, hogy elkerüljük a végtelen ciklust
      setHighlightUserIds(prev => {
        if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
        return data || [];
      });
    } catch (e) {
      setHighlightUserIds(prev => prev.length > 0 ? [] : prev);
    }
  }, [currentUserId]);

  // Kezdeti olvasatlan üzenetek ellenőrzése
  const checkUnread = useCallback(() => {
    if (!currentUserId) return;
    api.getUnreadChatCount(currentUserId).then(data => {
      setHasUnread(prev => prev !== data.unreadCount > 0 ? data.unreadCount > 0 : prev);
    }).catch(console.error);
    
    api.getNotifications(currentUserId).then(data => {
      const unread = data.some((n: any) => !n.is_read);
      setHasUnreadNotif(unread);
    }).catch(console.error);

    fetchUnreadSenders();
  }, [currentUserId, fetchUnreadSenders]);

  useEffect(() => {
    if (!currentUserId) return;
    const handler = (msg: { from: number; to: number; message: string }) => {
      console.log("Header socket handler received message:", msg, "currentUserId:", currentUserId);
      // Ha nekünk jön üzenet, és a chat nincs nyitva, vagy más van megnyitva, frissítsük az állapotot
      if (Number(msg.to) === Number(currentUserId)) {
        // Azonnal jelöljük meg az illetőt, ne várjunk az adatbázisra (race condition elkerülése)
        if (!isChatOpen) {
          setHasUnread(true);
          setHighlightUserIds(prev => {
            if (prev.includes(Number(msg.from))) return prev;
            return [...prev, Number(msg.from)];
          });
        }
        
        // Adjunk egy kis időt az adatbázisnak a mentésre, mielőtt lekérdezzük a pontos számokat
        setTimeout(() => {
          checkUnread();
        }, 500);
      }
    };
    socket.on("private message", handler);
    return () => {
      socket.off("private message", handler);
    };
  }, [currentUserId, isChatOpen, checkUnread]);

  useEffect(() => { fetchUnreadSenders(); }, [fetchUnreadSenders, isChatOpen]);
  useEffect(() => { checkUnread(); }, [checkUnread]);

  useEffect(() => {
    if (highlightUserIds.length > 0) {
      api.getUser(highlightUserIds[0]).then(user => {
        setHighlightUserName(user.name);
      }).catch(() => setHighlightUserName(undefined));
    } else {
      setHighlightUserName(undefined);
    }
  }, [highlightUserIds]);

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
              {(hasUnread || hasUnreadNotif) && <span className="chat-unread-dot" />}
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
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsCouponsOpen(true); setIsMenuOpen(false); }} className="menu-item">
                    Kuponjaim
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="menu-item">
                    Kijelentkezés
                  </a>
                </div>

              )}


            </div>

          </div>

        ) : (

          <div className="nav-links">
            <button className="auth-btn" onClick={() => { setIsAuthModalOpen(true); }}>Bejelentkezés</button>
          </div>

        )}

      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialTab={authModalInitialTab} 
      />

      {isCouponsOpen && userId && (
        <div className="chat-modal-bg" onClick={() => setIsCouponsOpen(false)}>
          <div className="chat-modal fixed-modal-size" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <span style={{fontWeight: 'bold', color: 'palevioletred', fontSize: '18px'}}>Kuponjaim</span>
              <button className="chat-modal-close" onClick={() => setIsCouponsOpen(false)}>✖</button>
            </div>
            <div className="modal-body-content">
              <MyCoupons userId={Number(userId)} />
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification in Bottom-Right */}
      {highlightUserIds.length > 0 && highlightUserName && !isChatOpen && (
        <button 
          className="floating-notification"
          onClick={() => setIsChatOpen(true)}
        >
          <span className="notification-icon">💬</span>
          <span>
            {highlightUserName} {highlightUserIds.length > 1 ? `és még ${highlightUserIds.length - 1} személy` : ''} üzenetet küldött!
          </span>
        </button>
      )}

      {isChatOpen && (
        <div className="chat-modal-bg" onClick={() => setIsChatOpen(false)}>
          <div className="chat-modal fixed-modal-size" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <div className="chat-tabs">
                <button 
                  className={`chat-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('messages')}
                >
                  Üzenetek
                  {hasUnread && <span className="tab-unread-dot" />}
                </button>
                <button 
                  className={`chat-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Értesítések
                  {hasUnreadNotif && <span className="tab-unread-dot" />}
                </button>
              </div>
              <button className="chat-modal-close" onClick={() => setIsChatOpen(false)}>✖</button>
            </div>

            {activeTab === 'messages' ? (
              <div style={{display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
                <div style={{padding: '0 20px', marginBottom: '10px'}}>
                  <UserSelect onSelect={setSelectedUser} selectedUserId={selectedUser?.user_id} highlightUserIds={highlightUserIds} />
                </div>
                <div className="modal-body-content">
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
            ) : (
              <div className="modal-body-content">
                <Notifications userId={Number(userId)} onRead={checkUnread} />
              </div>
            )}
          </div>
        </div>
      )}

    </header>

  );

}