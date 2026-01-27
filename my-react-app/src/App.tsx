import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import './App.css';

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/kedvencek" element={<Kedvencek />} />
        <Route path="/elozmenyek" element={<Elozmenyek />} />
        <Route path="/baratok" element={<Baratok />} />
        <Route path="/profil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;