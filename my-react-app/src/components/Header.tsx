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

import { api, type User, API_BASE_URL } from "../api";
import socket from "../socket";



interface HeaderProps {

  title?: string;

}



export default function Header({ title = 'Ajándékajánló' }: HeaderProps) {

  const { username, userId, logout, remainingTime } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isCouponsOpen, setIsCouponsOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

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
    if (userId) {
      api.getUser(userId).then(setCurrentUserData).catch(console.error);
    } else {
      setCurrentUserData(null);
    }
  }, [userId]);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <>
            {/* Desktop Navigation */}
            <div className="nav-icons desktop-nav">

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

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Menu">
              ☰
            </button>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
              <>
                <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
                <div className="mobile-menu">
                  <div className="mobile-menu-header">
                    <button className="close-menu-btn" onClick={toggleMobileMenu}>✖</button>
                  </div>
                  <div className="mobile-menu-items">
                    <Link to="/kedvencek" className="mobile-menu-item" onClick={toggleMobileMenu}>
                      <span className="mobile-menu-icon">❤️</span> Kedvencek
                    </Link>
                    <button className="mobile-menu-item" onClick={() => { setIsChatOpen(true); toggleMobileMenu(); }}>
                      <span className="mobile-menu-icon">💬</span> 
                      Üzenetek
                      {(hasUnread || hasUnreadNotif) && <span className="mobile-unread-dot" />}
                    </button>
                    <Link to="/baratok" className="mobile-menu-item" onClick={toggleMobileMenu}>
                      <span className="mobile-menu-icon">👥</span> Barátok
                    </Link>
                    <Link to="/elozmenyek" className="mobile-menu-item" onClick={toggleMobileMenu}>
                      <span className="mobile-menu-icon">🕒</span> Előzmények
                    </Link>
                    <div className="mobile-menu-divider"></div>
                    <Link to="/profil" className="mobile-menu-item" onClick={toggleMobileMenu}>
                       <span className="mobile-menu-icon">👤</span> Profilom
                    </Link>
                    <button className="mobile-menu-item" onClick={() => { setIsCouponsOpen(true); toggleMobileMenu(); }}>
                      <span className="mobile-menu-icon">🎫</span> Kuponjaim
                    </button>
                    <button className="mobile-menu-item logout-item" onClick={() => { handleLogout(); toggleMobileMenu(); }}>
                      <span className="mobile-menu-icon">🚪</span> Kijelentkezés
                    </button>
                  </div>
                </div>
              </>
            )}
          </>

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
                {!selectedUser ? (
                  <div style={{padding: '0 20px', flex: 1, overflowY: 'auto'}}>
                    <h3 style={{margin: '10px 0', fontSize: '16px', color: '#666'}}>Kivel szeretnél chatelni?</h3>
                    <UserSelect onSelect={setSelectedUser} selectedUserId={selectedUser?.user_id} highlightUserIds={highlightUserIds} />
                  </div>
                ) : (
                  <>
                    <div style={{padding: '10px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px'}}>
                      <button 
                        onClick={() => setSelectedUser(null)} 
                        style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'palevioletred', padding: '0 5px'}}
                        title="Vissza a listához"
                      >
                        ⬅
                      </button>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <div className="user-grid-avatar" style={{width: '35px', height: '35px', fontSize: '16px'}}>
                          <img 
                            src={`/Képek/${selectedUser.kep_url || selectedUser.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ".jpg"}`} 
                            alt={selectedUser.name} 
                            style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/Képek/logo.webp';
                            }}
                          />
                        </div>
                        <span style={{fontWeight: 'bold', fontSize: '16px'}}>{selectedUser.name}</span>
                      </div>
                    </div>
                    <div className="modal-body-content">
                      <Chat 
                        key={selectedUser.user_id} 
                        currentUser={currentUserData || {user_id: Number(userId), name: username || '', email: '', password: ''}} 
                        selectedUser={selectedUser}
                        onMessagesRead={checkUnread}
                      />
                    </div>
                  </>
                )}
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