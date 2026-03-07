import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import KategoriaValasztas from './components/KategoriaValasztas';
import Tovabb from './components/Tovabb';
import Bejelentkezes from './components/Bejelentkezes';
import Regisztracio from './components/Regisztracio';
import Welcome from './components/Welcome';
import Kedvencek from './components/Kedvencek';
import Elozmenyek from './components/Elozmenyek';
import Baratok from './components/Baratok';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import Chat from './components/Chat';
import './App.css';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
  // v7 future flags workaround
  const future = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  };

  return (
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
        {/* A Chat route csak akkor működik hibamentesen, ha van currentUser és selectedUser. */}
        <Route path="/chat" element={<ProtectedRoute><Chat fromUserId={0} toUserId={0} onBack={() => {}} /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;