const db = require('../../config/db');

exports.getCelcsoportok = async (req, res) => {
  try {
    const celcsoportok = await db.Celcsoport.findAll({
      attributes: ['nev'],
      raw: true,
    });
    const nevek = celcsoportok.map(c => c.nev);
    res.json(nevek);
  } catch (error) {
    console.error('Hiba a célcsoportok lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

