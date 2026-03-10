import { useEffect, useState, useCallback } from 'react';

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
  const [activeModalTab, setActiveModalTab] = useState<'chat' | 'notifications'>('chat');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [hasUnread, setHasUnread] = useState(false);
  const [hasUnreadNotif, setHasUnreadNotif] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);

  const [highlightUserIds, setHighlightUserIds] = useState<number[]>([]);
  const [highlightUserName, setHighlightUserName] = useState<string | undefined>(undefined);

  const currentUserId = userId;

  const isHomePage = location.pathname === '/';

  const fetchNotifications = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const data = await api.getNotifications(currentUserId);
      setNotifications(data);
      setHasUnreadNotif(data.some((n: any) => !n.is_read));
    } catch (e) {
      console.error(e);
    }
  }, [currentUserId]);

  const fetchCoupons = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const data = await api.getCoupons(currentUserId);
      setCoupons(data);
    } catch (e) {
      console.error(e);
    }
  }, [currentUserId]);

  // Olvasatlan üzenetek feladóinak lekérése
  const fetchUnreadSenders = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const data = await api.getUnreadSenders(currentUserId);
      setHighlightUserIds(data || []);
    } catch (e) {
      setHighlightUserIds([]);
    }
  }, [currentUserId]);

  // Kezdeti olvasatlan üzenetek ellenőrzése
  const checkUnread = useCallback(() => {
    if (!currentUserId) return;
    api.getUnreadChatCount(currentUserId).then(data => {
      setHasUnread(data.unreadCount > 0);
    }).catch(console.error);
    fetchUnreadSenders(); // Frissítsük a feladókat is
  }, [currentUserId, fetchUnreadSenders]);

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

  // Új privát üzenetek figyelése értesítéshez
  useEffect(() => {
    if (!currentUserId) return;
    const handler = (msg: { from: number; to: number; message: string }) => {
      // Ha nekünk jön üzenet, frissítsük az állapotot
      if (Number(msg.to) === Number(currentUserId)) {
        checkUnread();
      }
    };

    const notifHandler = (data: { message: string }) => {
      fetchNotifications();
      setHasUnreadNotif(true);
    };

    socket.on("private message", handler);
    socket.on("notification", notifHandler);
    return () => {
      socket.off("private message", handler);
      socket.off("notification", notifHandler);
    };
  }, [currentUserId, checkUnread, fetchNotifications]);

  useEffect(() => {
    if (isChatOpen) fetchNotifications();
  }, [isChatOpen, fetchNotifications]);

  useEffect(() => {
    if (isCouponsOpen) fetchCoupons();
  }, [isCouponsOpen, fetchCoupons]);

  useEffect(() => { fetchUnreadSenders(); }, [currentUserId, isChatOpen, fetchUnreadSenders]);
  useEffect(() => { checkUnread(); }, [currentUserId, checkUnread]);

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

    <header className={isHomePage ? 'header--home' : ''}>

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

                  <button className="menu-item" onClick={() => { setIsCouponsOpen(true); setIsMenuOpen(false); }}>
                    Kuponjaim
                  </button>

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
        initialTab="login" 
      />

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
          <div className="chat-modal" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <div className="chat-tabs">
                <button 
                  className={`chat-tab ${activeModalTab === 'chat' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('chat')}
                >
                  Beszélgetések
                </button>
                <button 
                  className={`chat-tab ${activeModalTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveModalTab('notifications');
                    if (currentUserId) api.markAllNotificationsAsRead(currentUserId).then(() => setHasUnreadNotif(false));
                  }}
                >
                  Értesítések {hasUnreadNotif && <span className="unread-badge" />}
                </button>
              </div>
              <button className="chat-modal-close" onClick={() => setIsChatOpen(false)}>✖</button>
            </div>
            
            {activeModalTab === 'chat' ? (
              <>
                <div style={{padding: '0 20px'}}>
                  <UserSelect onSelect={setSelectedUser} selectedUserId={selectedUser?.user_id} highlightUserIds={highlightUserIds} />
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
              </>
            ) : (
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">Nincsenek értesítések.</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`notification-item ${n.is_read ? 'read' : 'unread'}`}>
                      <div className="notification-message">{n.message}</div>
                      <div className="notification-date">{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isCouponsOpen && (
        <div className="chat-modal-bg" onClick={() => setIsCouponsOpen(false)}>
          <div className="chat-modal" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <span>Kuponjaim</span>
              <button className="chat-modal-close" onClick={() => setIsCouponsOpen(false)}>✖</button>
            </div>
            <div className="coupons-list" style={{padding: '20px'}}>
              {coupons.length === 0 ? (
                <div className="no-coupons">Még nincsenek kuponjaid.</div>
              ) : (
                coupons.map(c => (
                  <div key={c.id} className="coupon-item">
                    <div className="coupon-code-row">
                      <span className="coupon-label">Kód:</span>
                      <code className="coupon-code">{c.kupon_kod}</code>
                      <button 
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(c.kupon_kod);
                          alert('Kuponkód másolva!');
                        }}
                      >
                        Másolás
                      </button>
                    </div>
                    <div className="coupon-expiry">
                      Lejár: {new Date(c.lejarat_datum).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </header>

  );

}