const db = require('../../config/db');

exports.getCelcsoportok = async (req, res) => {
  try {
    const celcsoportok = await db.Celcsoport.findAll();
    res.json(celcsoportok);
  } catch (error) {
    console.error('Hiba a célcsoportok lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createCelcsoport = async (req, res) => {
  try {
    const ujCelcsoport = await db.Celcsoport.create(req.body);
    res.status(201).json(ujCelcsoport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCelcsoport = async (req, res) => {
  try {
    await db.Celcsoport.destroy({ where: { id: req.params.id } });
    res.json({ message: "Célcsoport törölve" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

