import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import MyCoupons from '../User/MyCoupons';
import AuthModal from '../Auth/AuthModal';
import ChatModal from '../Social/ChatModal';
import MobileNav from './MobileNav';
import './Header.css';
import '../Social/ChatModal.css';
import { api } from "../../api";
import socket from "../../socket";
interface HeaderProps {
  title?: string;
}
export default function Header({ title = 'Ajándékajánló' }: HeaderProps) {
  const { username, userId, logout, remainingTime } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [hasUnreadNotif, setHasUnreadNotif] = useState(false);
  const [highlightUserIds, setHighlightUserIds] = useState<number[]>([]);
  const [highlightUserName, setHighlightUserName] = useState<string | undefined>(undefined);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'register' | 'forgot'>('login');
  const currentUserId = userId;
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
  const fetchUnreadSenders = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const data = await api.getUnreadSenders(currentUserId);
      setHighlightUserIds(prev => {
        if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
        return data || [];
      });
    } catch (e) {
      setHighlightUserIds(prev => prev.length > 0 ? [] : prev);
    }
  }, [currentUserId]);
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
      if (Number(msg.to) === Number(currentUserId)) {
        if (!isChatOpen) {
          setHasUnread(true);
          setHighlightUserIds(prev => {
            if (prev.includes(Number(msg.from))) return prev;
            return [...prev, Number(msg.from)];
          });
        }
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
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCouponsOpen(false);
    };
    if (isCouponsOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isCouponsOpen]);
  const handleLogout = async () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    await logout();
    navigate('/');
  };
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [username]);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);
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
            <div className="nav-icons desktop-nav">
              <Link to="/kedvencek" title="Kedvencek" className="icon-link">❤️</Link>
              <button className="chat-icon-btn" onClick={() => setIsChatOpen(true)} title="Chat">
                💬
                {(hasUnread || hasUnreadNotif) && <span className="chat-unread-dot" />}
              </button>
              <Link to="/baratok" title="Barátok" className="icon-link">👥</Link>
              <Link to="/elozmenyek" title="Előzmények" className="icon-link">🕒</Link>
              <div className="menu-container">
                <button onClick={toggleMenu} className="settings-btn" title="Beállítások">⚙️</button>
                {isMenuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profil" className="menu-item" onClick={() => setIsMenuOpen(false)}>Profilom</Link>
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsCouponsOpen(true); setIsMenuOpen(false); }} className="menu-item">Kuponjaim</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="menu-item">Kijelentkezés</a>
                  </div>
                )}
              </div>
            </div>
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Menu">☰</button>
            <MobileNav 
              isOpen={isMobileMenuOpen} 
              onClose={toggleMobileMenu} 
              hasUnread={hasUnread} 
              hasUnreadNotif={hasUnreadNotif} 
              onChatOpen={() => setIsChatOpen(true)} 
              onCouponsOpen={() => setIsCouponsOpen(true)} 
              onLogout={handleLogout} 
            />
          </>
        ) : (
          <div className="nav-links">
            <button className="auth-btn" onClick={() => setIsAuthModalOpen(true)}>Bejelentkezés</button>
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
      {highlightUserIds.length > 0 && highlightUserName && !isChatOpen && (
        <button className="floating-notification" onClick={() => setIsChatOpen(true)}>
          <span className="notification-icon">💬</span>
          <span>{highlightUserName} {highlightUserIds.length > 1 ? `és még ${highlightUserIds.length - 1} személy` : ''} üzenetet küldött!</span>
        </button>
      )}
      {userId && (
        <ChatModal 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          userId={Number(userId)} 
          username={username || ''} 
          hasUnread={hasUnread} 
          hasUnreadNotif={hasUnreadNotif} 
          checkUnread={checkUnread} 
          highlightUserIds={highlightUserIds} 
        />
      )}
    </header>
  );
}
