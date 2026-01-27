import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Header from './Header';
import './AuthModal.css'; // Újrahasználjuk a stílusokat

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState<'red' | 'green'>('red');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirmPassword) {
      setMessage('A jelszavak nem egyeznek!');
      setMessageColor('red');
      return;
    }

    if (password.length < 6) {
      setMessage('A jelszónak legalább 6 karakterből kell állnia!');
      setMessageColor('red');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await api.resetPassword(token, password);
      setMessage('A jelszavad sikeresen megváltozott!');
      setMessageColor('green');
      setTimeout(() => {
        navigate('/bejelentkezes');
      }, 3000);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Hiba történt a jelszó visszaállításakor.');
      setMessageColor('red');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-page">
      <Header title="Jelszó visszaállítása" showBack />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Új jelszó megadása</h2>
          </div>
          <div className="profile-content">
            <form className="login-form" onSubmit={handleSubmit}>
              <p className="form-info">Kérjük, add meg az új jelszavadat.</p>
              
              <input
                type="password"
                placeholder="Új jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
              
              <input
                type="password"
                placeholder="Új jelszó megerősítése"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />

              {message && (
                <div className="message-box" style={{ color: messageColor, marginBottom: '15px', textAlign: 'center' }}>
                  {message}
                </div>
              )}

              <button type="submit" className="save-btn" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? 'Folyamatban...' : 'Jelszó mentése'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
