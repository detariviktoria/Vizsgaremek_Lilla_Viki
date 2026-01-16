const db = require('../../config/db');

exports.getAlkalmak = async (req, res) => {
  try {
    const alkalmak = await db.Alkalom.findAll({
      attributes: ['nev'],
      raw: true,
    });
    const nevek = alkalmak.map(a => a.nev);
    res.json(nevek);
  } catch (error) {
    console.error('Hiba az alkalmak lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

