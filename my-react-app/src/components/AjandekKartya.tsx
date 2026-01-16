import React, { useState, useEffect } from 'react';

import { api, type Ajandek, API_BASE_URL } from '../api';

import { useAuth } from '../hooks/useAuth';
import './AjandekKartya.css';

interface AjandekKartyaProps {
  ajandek: Ajandek;
  isKedvenc?: boolean;
  onKedvencValtozas?: () => void; // Callback, ha változik a kedvenc státusz (pl. listából törlésnél)
}

const AjandekKartya: React.FC<AjandekKartyaProps> = ({ ajandek, isKedvenc = false, onKedvencValtozas }) => {
  const { userId } = useAuth();
  const [kedvenc, setKedvenc] = useState(isKedvenc);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setKedvenc(isKedvenc);
  }, [isKedvenc]);

  const handleKedvencClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId || loading || !ajandek.id) return;

    setLoading(true);
    try {
      if (kedvenc) {
        await api.removeKedvenc(userId, ajandek.id);
        setKedvenc(false);
      } else {
        await api.addKedvenc(userId, ajandek.id);
        setKedvenc(true);
      }
      if (onKedvencValtozas) onKedvencValtozas();
    } catch (error) {
      console.error('Hiba a kedvenc módosításakor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async () => {
    if (userId && ajandek.id) {
      try {
        await api.addElozmeny(userId, ajandek.id);
        console.log('Előzmény mentve');
      } catch (error) {
        console.error('Hiba az előzmény mentésekor:', error);
      }
    }
  };

  // Kép URL kezelése: ha nincs, placeholder

  // A backend szolgálja ki a képeket a /images útvonalon

  const imageUrl = ajandek.image_url ? `${API_BASE_URL}/images/${ajandek.image_url.split('/').pop()}` : 'https://via.placeholder.com/300x200?text=Nincs+kép';

  return (
    <div className="ajandek-kartya">
      <div className="ajandek-kep-container">
        <img src={imageUrl} alt={ajandek.nev} className="ajandek-kep" />
        {userId && (
          <button 
            className={`kedvenc-ikon ${kedvenc ? 'aktiv' : 'inaktiv'}`}
            onClick={handleKedvencClick}
            title={kedvenc ? "Törlés a kedvencekből" : "Hozzáadás a kedvencekhez"}
          >
            {kedvenc ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      <div className="ajandek-info">
        <h3 className="ajandek-nev">{ajandek.nev}</h3>
        <p className="ajandek-ar">{ajandek.ar ? `${ajandek.ar.toLocaleString()} Ft` : 'Ár nem elérhető'}</p>
        <a 
          href={ajandek.link_url || '#'}
          target="_blank" 
          rel="noopener noreferrer" 
          className="ajandek-gomb"
          onClick={handleLinkClick}
        >
          Megnézem
        </a>
      </div>
    </div>
  );
};

export default AjandekKartya;