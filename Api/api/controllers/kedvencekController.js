// GET /api/felhasznalok/:userId/kedvencek
exports.getKedvencek = (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT A.* FROM Felhasznalo_KedvencAjandek K JOIN Ajandek A ON K.ajandek_id = A.id WHERE K.user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// POST /api/felhasznalok/:userId/kedvencek
exports.addKedvenc = (req, res) => {
  const userId = req.params.userId;
  const { ajandek_id } = req.body;
  db.query(
    "INSERT INTO Felhasznalo_KedvencAjandek (user_id, ajandek_id) VALUES (?, ?)",
    [userId, ajandek_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Kedvenc hozzáadva" });
    }
  );
};

// DELETE /api/felhasznalok/:userId/kedvencek/:ajandekId
exports.deleteKedvenc = (req, res) => {
  const { userId, ajandekId } = req.params;
  db.query(
    "DELETE FROM Felhasznalo_KedvencAjandek WHERE user_id = ? AND ajandek_id = ?",
    [userId, ajandekId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Kedvenc törölve" });
    }
  );
};
