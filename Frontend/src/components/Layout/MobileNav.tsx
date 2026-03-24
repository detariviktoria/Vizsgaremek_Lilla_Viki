import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  hasUnread: boolean;
  hasUnreadNotif: boolean;
  onChatOpen: () => void;
  onCouponsOpen: () => void;
  onLogout: () => void;
}

export default function MobileNav({
  isOpen,
  onClose,
  hasUnread,
  hasUnreadNotif,
  onChatOpen,
  onCouponsOpen,
  onLogout
}: MobileNavProps) {
  // Keyboard navigation: Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose}></div>
      <div className="mobile-menu">
        <div className="mobile-menu-header">
          <button className="close-menu-btn" onClick={onClose}>✖</button>
        </div>
        <div className="mobile-menu-items">
          <Link to="/kedvencek" className="mobile-menu-item" onClick={onClose}>
            <span className="mobile-menu-icon">❤️</span> Kedvencek
          </Link>
          <button className="mobile-menu-item" onClick={() => { onChatOpen(); onClose(); }}>
            <span className="mobile-menu-icon">💬</span> 
            Üzenetek
            {(hasUnread || hasUnreadNotif) && <span className="mobile-unread-dot" />}
          </button>
          <Link to="/baratok" className="mobile-menu-item" onClick={onClose}>
            <span className="mobile-menu-icon">👥</span> Barátok
          </Link>
          <Link to="/elozmenyek" className="mobile-menu-item" onClick={onClose}>
            <span className="mobile-menu-icon">🕒</span> Előzmények
          </Link>
          <div className="mobile-menu-divider"></div>
          <Link to="/profil" className="mobile-menu-item" onClick={onClose}>
             <span className="mobile-menu-icon">👤</span> Profilom
          </Link>
          <button className="mobile-menu-item" onClick={() => { onCouponsOpen(); onClose(); }}>
            <span className="mobile-menu-icon">🎫</span> Kuponjaim
          </button>
          <button className="mobile-menu-item logout-item" onClick={() => { onLogout(); onClose(); }}>
            <span className="mobile-menu-icon">🚪</span> Kijelentkezés
          </button>
        </div>
      </div>
    </>
  );
}
