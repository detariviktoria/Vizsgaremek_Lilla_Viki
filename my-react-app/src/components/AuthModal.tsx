import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../hooks/useAuth';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const { login } = useAuth();
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState<'red' | 'green'>('red');
  const navigate = useNavigate();

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
        login(data.username);
        setMessage('Sikeres bejelentkezés!');
        setMessageColor('green');
        setTimeout(() => {
          onClose();
          navigate('/');
        }, 500);
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
      await api.register(name, email, password);
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

  return (
    <div className="modal show" onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          <form className="login-form" id="modal-login-form" onSubmit={handleLogin}>
            <h2>Bejelentkezés</h2>
            <input type="text" name="username" placeholder="Felhasználónév" required />
            <input type="password" name="password" placeholder="Jelszó" required />
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit">Belépés</button>
            <div className="switch-link">
              Még nincs fiókom, <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }}>regisztrálok</a>.
            </div>
          </form>
        )}

        {activeTab === 'register' && (
          <form className="login-form" id="modal-register-form" onSubmit={handleRegister}>
            <h2>Regisztráció</h2>
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="username" placeholder="Felhasználónév" required />
            <input type="password" name="password" placeholder="Jelszó" required />
            <input type="password" name="confirmPassword" placeholder="Jelszó megerősítése" required />
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit">Regisztráció</button>
            <div className="switch-link">
              Már van fiókom, <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}>bejelentkezek</a>.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
