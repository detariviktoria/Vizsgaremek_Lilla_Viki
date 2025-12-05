const db = require('../../config/db');

exports.getStilusok = async (req, res) => {
  try {
    const stilusok = await db.Stilus.findAll({
      attributes: ['nev'],
      raw: true,
    });
    const nevek = stilusok.map(s => s.nev);
    res.json(nevek);
  } catch (error) {
    console.error('Hiba a stílusok lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

