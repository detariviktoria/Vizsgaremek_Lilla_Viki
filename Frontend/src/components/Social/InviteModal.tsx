import { useState } from 'react';
import { api } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import './InviteModal.css';
interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState<'red' | 'green'>('red');
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  if (!isOpen) return null;
  const handleClose = () => {
    setMessage('');
    setEmail('');
    onClose();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!userId) {
      setMessage('Kérlek, jelentkezz be a meghívó küldéséhez!');
      setMessageColor('red');
      return;
    }
    setIsLoading(true);
    try {
      await api.sendInvite(email, userId);
      setMessage('Meghívó sikeresen elküldve!');
      setMessageColor('green');
      setEmail('');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Hiba történt a küldéskor.');
      setMessageColor('red');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="modal show" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal-content invite-modal" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={handleClose}>&times;</span>
        <h2>Hívd meg ismerősödet!</h2>
        <p className="invite-description">
          Küldj meghívót ismerősödnek, és ha regisztrál, mindketten jól jártok! 
          Te egy <strong>5000 Ft-os kupont</strong> kapsz ajándékba!
        </p>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Ismerősöd email címe" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="invite-input"
          />
          {message && <div className="message-box" style={{ color: messageColor }}>{message}</div>}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Küldés...' : 'Meghívó küldése'}
          </button>
        </form>
      </div>
    </div>
  );
}
