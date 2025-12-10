const db = require("../../config/db");

// Előzmények lekérése
exports.getElozmenyek = (req, res) => {
  const { userId } = req.params;
  db.query(
    `SELECT A.*, E.keresesi_ido
     FROM Felhasznalo_AjandekElozmeny E
     JOIN Ajandek A ON E.ajandek_id = A.id
     WHERE E.user_id = ?
     ORDER BY E.keresesi_ido DESC`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Új előzmény hozzáadása
exports.addElozmeny = (req, res) => {
  const { userId } = req.params;
  const { ajandek_id } = req.body;

  db.query(
    "INSERT INTO Felhasznalo_AjandekElozmeny (user_id, ajandek_id) VALUES (?, ?)",
    [userId, ajandek_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Előzmény hozzáadva" });
    }
  );
};
