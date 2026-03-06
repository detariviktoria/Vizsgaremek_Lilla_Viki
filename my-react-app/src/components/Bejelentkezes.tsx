import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AuthModal from './AuthModal';

export default function Bejelentkezes() {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate('/');
  };

  return (
    <>
      <Header title="Bejelentkezés" />
      <AuthModal isOpen={true} onClose={handleCloseModal} initialTab="login" />
    </>
  );
}