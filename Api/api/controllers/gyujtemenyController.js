const db = require('../../config/db');
exports.getGyujtemenyek = (req, res) => {
  db.query('SELECT nev FROM Gyujtemeny', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results.map(row => row.nev));
  });
};


// Egy gyűjtemény lekérése ID alapján
exports.getGyujtemenyById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Gyujtemeny WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Gyűjtemény nem található" });
    res.json(results[0]);
  });
};

// Új gyűjtemény létrehozása
exports.createGyujtemeny = (req, res) => {
  const { nev, leiras } = req.body;
  db.query('INSERT INTO Gyujtemeny (nev, leiras) VALUES (?, ?)', [nev, leiras], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Gyűjtemény létrehozva", id: results.insertId });
  });
};

// Gyűjtemény módosítása
exports.updateGyujtemeny = (req, res) => {
  const { id } = req.params;
  const { nev, leiras } = req.body;
  db.query('UPDATE Gyujtemeny SET nev = ?, leiras = ? WHERE id = ?', [nev, leiras, id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Gyűjtemény frissítve" });
  });
};

// Gyűjtemény törlése
exports.deleteGyujtemeny = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Gyujtemeny WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Gyűjtemény törölve" });
  });
};