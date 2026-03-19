const db = require('../../config/db');

exports.getStilusok = async (req, res) => {
  try {
    const stilusok = await db.Stilus.findAll();
    res.json(stilusok);
  } catch (error) {
    console.error('Hiba a stílusok lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createStilus = async (req, res) => {
  try {
    const ujStilus = await db.Stilus.create(req.body);
    res.status(201).json(ujStilus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStilus = async (req, res) => {
  try {
    await db.Stilus.destroy({ where: { id: req.params.id } });
    res.json({ message: "Stílus törölve" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

