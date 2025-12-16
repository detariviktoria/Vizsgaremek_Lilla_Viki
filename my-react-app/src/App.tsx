import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import KategoriaValasztas from './components/KategoriaValasztas';
import KategoriaLista from './components/KategoriaLista';
import Tovabb from './components/Tovabb';
import Bejelentkezes from './components/Bejelentkezes';
import Regisztracio from './components/Regisztracio';
import Welcome from './components/Welcome';
import Kedvencek from './components/Kedvencek';
import Elozmenyek from './components/Elozmenyek';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategoria" element={<KategoriaValasztas />} />
        <Route path="/alkalom/:nev" element={<KategoriaValasztas />} />
        <Route path="/stilus/:nev" element={<KategoriaValasztas />} />
        <Route path="/celcsoport/:nev" element={<KategoriaValasztas />} />
        <Route path="/elmeny" element={<KategoriaLista />} />
        <Route path="/targy" element={<KategoriaLista />} />
        <Route path="/tovabb" element={<Tovabb />} />
        <Route path="/bejelentkezes" element={<Bejelentkezes />} />
        <Route path="/regisztracio" element={<Regisztracio />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/kedvencek" element={<Kedvencek />} />
        <Route path="/elozmenyek" element={<Elozmenyek />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;