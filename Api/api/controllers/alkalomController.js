const db = require('../../config/db');

exports.getAlkalmak = async (req, res) => {
  try {
    const alkalmak = await db.Alkalom.findAll();
    res.json(alkalmak);
  } catch (error) {
    console.error('Hiba az alkalmak lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createAlkalom = async (req, res) => {
  try {
    const ujAlkalom = await db.Alkalom.create(req.body);
    res.status(201).json(ujAlkalom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAlkalom = async (req, res) => {
  try {
    await db.Alkalom.destroy({ where: { id: req.params.id } });
    res.json({ message: "Alkalom törölve" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

