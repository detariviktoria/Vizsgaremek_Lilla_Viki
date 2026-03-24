import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Pages/Home';
import KategoriaValasztas from './components/Gifts/KategoriaValasztas';
import Tovabb from './components/Gifts/Tovabb';
import Bejelentkezes from './components/Auth/Bejelentkezes';
import Regisztracio from './components/Auth/Regisztracio';
import Welcome from './components/Pages/Welcome';
import Kedvencek from './components/Gifts/Kedvencek';
import Elozmenyek from './components/Gifts/Elozmenyek';
import Baratok from './components/Social/Baratok';
import Profile from './components/User/Profile';
import ResetPassword from './components/Auth/ResetPassword';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { AuthProvider } from './hooks/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { username, isChecking } = useAuth();

  if (isChecking) {
    return <div className="loading-spinner">Betöltés...</div>;
  }

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const future = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  };

  return (
    <AuthProvider>
      <BrowserRouter future={future}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ajandekok" element={<KategoriaValasztas />} />
          <Route path="/alkalom/:nev" element={<KategoriaValasztas />} />
          <Route path="/stilus/:nev" element={<KategoriaValasztas />} />
          <Route path="/celcsoport/:nev" element={<KategoriaValasztas />} />
          <Route path="/elmeny" element={<KategoriaValasztas />} />
          <Route path="/targy" element={<KategoriaValasztas />} />
          <Route path="/tovabb" element={<Tovabb />} />
          <Route path="/bejelentkezes" element={<Bejelentkezes />} />
          <Route path="/regisztracio" element={<Regisztracio />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/kedvencek" element={<ProtectedRoute><Kedvencek /></ProtectedRoute>} />
          <Route path="/elozmenyek" element={<ProtectedRoute><Elozmenyek /></ProtectedRoute>} />
          <Route path="/baratok" element={<ProtectedRoute><Baratok /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;