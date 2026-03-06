import { useState, useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { api } from '../api';
import { useAuth } from '../hooks/useAuth';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'> (initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setMessage('');
    }
  }, [isOpen, initialTab]);

  const { login } = useAuth();
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const [messageColor, setMessageColor] = useState<'red' | 'green'>('red');

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();



  if (!isOpen) return null;

  const handleCloseModal = () => {
    setMessage('');
    onClose();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    setMessage('');
    setMessageColor('red');

    try {

      const data = await api.login(username, password);

      if (data && data.username) {

        login(data.username, data.userId, data.isAdmin);

        setMessage('Sikeres bejelentkezés!');

        setMessageColor('green');
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 800);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Hibás felhasználónév vagy jelszó!';
      setMessage(errorMessage);
      setMessageColor('red');
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('username') as string; // Az API 'name'-ként számon tartja
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    setMessage('');

    if (password !== confirmPassword) {
      setMessage('A jelszavak nem egyeznek!');
      setMessageColor('red');
      return;
    }

    try {

      const refId = searchParams.get('ref') || undefined;

      await api.register(name, email, password, refId);

      setMessage('Sikeres regisztráció! Most már bejelentkezhetsz.');

      setMessageColor('green');
      setTimeout(() => {
        setActiveTab('login');
        setMessage('');
      }, 1500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Hiba történt a regisztráció során.');
      setMessageColor('red');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.forgotPassword(email);
      setMessage('A jelszó visszaállító linket elküldtük az e-mail címedre.');
      setMessageColor('green');
    } catch (error) {
      // Ha a backend 404-et ad vissza, azt külön kezeljük
      if (error instanceof Error && error.message.includes('nincs felhasználó')) {
        setMessage(error.message);
        setMessageColor('red');
      } else {
        setMessage(error instanceof Error ? error.message : 'Hiba történt a kérés során.');
        setMessageColor('red');
      }
    }
  };

  return (
    <div className="modal show animate-fade-in" onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={handleCloseModal}>&times;</span>
        <div id="modal-tabs">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => { setActiveTab('login'); setMessage(''); }}
          >
            Bejelentkezés
          </button>
          <button
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => { setActiveTab('register'); setMessage(''); }}
          >
            Regisztráció
          </button>
        </div>

        {activeTab === 'login' && (
          <form className={`login-form animate-slide-up ${messageColor === 'red' && message ? 'animate-shake' : ''}`} id="modal-login-form" onSubmit={handleLogin}>
            <h2>Bejelentkezés</h2>
            <input type="text" name="username" placeholder="Felhasználónév" required className={`transition-all duration-300 focus:scale-105 ${messageColor === 'red' && message ? 'input-error' : ''}`} />
            <input type="password" name="password" placeholder="Jelszó" required className={`transition-all duration-300 focus:scale-105 ${messageColor === 'red' && message ? 'input-error' : ''}`} />
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit" className="transition-all duration-300 hover:scale-105 active:scale-95">Belépés</button>
            <div className="forgot-password-link">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('forgot'); setMessage(''); }}>Elfelejtetted a jelszavad?</a>
            </div>
            <div className="switch-link">
              Még nincs fiókom, <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }}>regisztrálok</a>.
            </div>
          </form>
        )}

        {activeTab === 'register' && (
          <form className="login-form animate-slide-up" id="modal-register-form" onSubmit={handleRegister}>
            <h2>Regisztráció</h2>
            <input type="email" name="email" placeholder="Email" required className="transition-all duration-300 focus:scale-105" />
            <input type="text" name="username" placeholder="Felhasználónév" required className="transition-all duration-300 focus:scale-105" />
            <input type="password" name="password" placeholder="Jelszó" required className="transition-all duration-300 focus:scale-105" />
            <input type="password" name="confirmPassword" placeholder="Jelszó megerősítése" required className="transition-all duration-300 focus:scale-105" />
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit" className="transition-all duration-300 hover:scale-105 active:scale-95">Regisztráció</button>
            <div className="switch-link">
              Már van fiókom, <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}>bejelentkezek</a>.
            </div>
          </form>
        )}

        {activeTab === 'forgot' && (
          <form className="login-form animate-slide-up" id="modal-forgot-form" onSubmit={handleForgotPassword}>
            <h2>Elfelejtett jelszó</h2>
            <p className="form-info">Add meg az e-mail címed, amivel regisztráltál, és küldünk egy linket a jelszó visszaállításához.</p>
            <input 
              type="email" 
              name="email" 
              placeholder="Email címed" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit" className="transition-all duration-300 hover:scale-105 active:scale-95">Visszaállító link küldése</button>
            <div className="switch-link">
              Vissza a <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); setMessage(''); }}>bejelentkezéshez</a>.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}