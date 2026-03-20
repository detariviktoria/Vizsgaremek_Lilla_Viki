import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import AuthModal from './AuthModal';

export default function Regisztracio() {
  const [showModal] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Header title="Regisztráció" />
      <AuthModal isOpen={showModal} onClose={() => navigate('/')} initialTab="register" />
    </>
  );
}

