import React from 'react';
import { Link } from 'react-router-dom';
import './NincsAdat.css';

interface NincsAdatProps {
  ikon: string;
  uzenet: string;
  gombSzoveg?: string;
  gombLink?: string;
}

const NincsAdat: React.FC<NincsAdatProps> = ({ ikon, uzenet, gombSzoveg, gombLink }) => {
  return (
    <div className="nincs-adat-container animate-fade-in">
      <div className="nincs-adat-ikon">{ikon}</div>
      <div className="nincs-adat-szoveg">{uzenet}</div>
      {gombSzoveg && gombLink && (
        <Link to={gombLink} className="vissza-gomb">
          {gombSzoveg}
        </Link>
      )}
    </div>
  );
};

export default NincsAdat;
