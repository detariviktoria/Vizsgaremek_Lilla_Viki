import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register' | 'forgot';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(initialTab);
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState<'red' | 'green'>('red');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Real-time validation states
  const [regData, setRegData] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [regErrors, setRegErrors] = useState({ email: '', username: '', password: '', confirmPassword: '' });

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setMessage('');
    }
  }, [isOpen, initialTab]);

  // Debounced check for email/username availability
  useEffect(() => {
    if (activeTab !== 'register') return;

    const checkEmail = async () => {
      if (regData.email && !regErrors.email) {
        try {
          const { available } = await api.checkAvailability({ email: regData.email });
          if (!available) setRegErrors(prev => ({ ...prev, email: 'Ez az e-mail cím már foglalt.' }));
        } catch (err) { console.error(err); }
      }
    };

    const checkUsername = async () => {
      if (regData.username && regData.username.length >= 3) {
        try {
          const { available } = await api.checkAvailability({ name: regData.username });
          setRegErrors(prev => ({ ...prev, username: available ? '' : 'Ez a felhasználónév már foglalt.' }));
        } catch (err) { console.error(err); }
      }
    };

    const timer = setTimeout(() => {
      checkEmail();
      checkUsername();
    }, 500);

    return () => clearTimeout(timer);
  }, [regData.email, regData.username, activeTab]);

  // Keyboard navigation: Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

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
        login(data.username, data.userId, data.isAdmin, data.token);
        setMessage('Sikeres bejelentkezés!');
        setMessageColor('green');
        setTimeout(() => {
          onClose();
          // window.location.reload() removed - use state/context instead
          navigate('/'); 
        }, 800);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Hibás felhasználónév vagy jelszó!';
      setMessage(errorMessage);
      setMessageColor('red');
    }
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setRegErrors(prev => ({ ...prev, email: emailRegex.test(value) ? '' : 'Érvénytelen email formátum' }));
    } else if (name === 'username') {
      setRegErrors(prev => ({ ...prev, username: value.length >= 3 ? '' : 'A felhasználónévnek legalább 3 karakternek kell lennie' }));
    } else if (name === 'password') {
      setRegErrors(prev => ({ 
        ...prev, 
        password: value.length >= 6 ? '' : 'A jelszónak legalább 6 karakternek kell lennie',
        confirmPassword: regData.confirmPassword === value ? '' : 'A jelszavak nem egyeznek!'
      }));
    } else if (name === 'confirmPassword') {
      setRegErrors(prev => ({ ...prev, confirmPassword: value === regData.password ? '' : 'A jelszavak nem egyeznek!' }));
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (regErrors.email || regErrors.username || regErrors.password || regErrors.confirmPassword) {
      setMessage('Kérjük, javítsa a hibákat!');
      setMessageColor('red');
      return;
    }

    setMessage('');
    try {
      const refId = searchParams.get('ref') || undefined;
      await api.register(regData.username, regData.email, regData.password, refId);
      setMessage('Sikeres regisztráció! Most már bejelentkezhetsz.');
      setMessageColor('green');
      setTimeout(() => {
        setActiveTab('login');
        setMessage('');
        setRegData({ email: '', username: '', password: '', confirmPassword: '' });
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
      setMessage(error instanceof Error ? error.message : 'Hiba történt a kérés során.');
      setMessageColor('red');
    }
  };

  return (
    <div className="modal show animate-fade-in" onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={handleCloseModal}>&times;</span>
        <div id="modal-tabs">
          <button className={activeTab === 'login' ? 'active' : ''} onClick={() => { setActiveTab('login'); setMessage(''); }}>Bejelentkezés</button>
          <button className={activeTab === 'register' ? 'active' : ''} onClick={() => { setActiveTab('register'); setMessage(''); }}>Regisztráció</button>
        </div>

        {activeTab === 'login' && (
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Bejelentkezés</h2>
            <input type="text" name="username" placeholder="Felhasználónév" required />
            <input type="password" name="password" placeholder="Jelszó" required />
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit">Belépés</button>
            <div className="forgot-password-link">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('forgot'); setMessage(''); }}>Elfelejtetted a jelszavad?</a>
            </div>
          </form>
        )}

        {activeTab === 'register' && (
          <form className="login-form" onSubmit={handleRegister}>
            <h2>Regisztráció</h2>
            <input type="email" name="email" placeholder="Email" value={regData.email} onChange={handleRegChange} required className={regErrors.email ? 'input-error' : ''} />
            {regErrors.email && <span className="error-text">{regErrors.email}</span>}
            
            <input type="text" name="username" placeholder="Felhasználónév" value={regData.username} onChange={handleRegChange} required className={regErrors.username ? 'input-error' : ''} />
            {regErrors.username && <span className="error-text">{regErrors.username}</span>}
            
            <input type="password" name="password" placeholder="Jelszó" value={regData.password} onChange={handleRegChange} required className={regErrors.password ? 'input-error' : ''} />
            {regErrors.password && <span className="error-text">{regErrors.password}</span>}
            
            <input type="password" name="confirmPassword" placeholder="Jelszó megerősítése" value={regData.confirmPassword} onChange={handleRegChange} required className={regErrors.confirmPassword ? 'input-error' : ''} />
            {regErrors.confirmPassword && <span className="error-text">{regErrors.confirmPassword}</span>}
            
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit">Regisztráció</button>
          </form>
        )}

        {activeTab === 'forgot' && (
          <form className="login-form" onSubmit={handleForgotPassword}>
            <h2>Elfelejtett jelszó</h2>
            <p className="form-info">Add meg az e-mail címed, amivel regisztráltál.</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email címed" required />
            {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
            <button type="submit">Visszaállító link küldése</button>
          </form>
        )}
      </div>
    </div>
  );
}
