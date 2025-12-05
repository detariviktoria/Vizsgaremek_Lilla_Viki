import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import KategoriaValasztas from './components/KategoriaValasztas';
import Tovabb from './components/Tovabb';
import Bejelentkezes from './components/Bejelentkezes';
import Regisztracio from './components/Regisztracio';
import Welcome from './components/Welcome';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kategoria" element={<KategoriaValasztas />} />
        <Route path="/tovabb" element={<Tovabb />} />
        <Route path="/bejelentkezes" element={<Bejelentkezes />} />
        <Route path="/regisztracio" element={<Regisztracio />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;