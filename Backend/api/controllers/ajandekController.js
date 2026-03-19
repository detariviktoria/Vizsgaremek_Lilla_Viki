const ajandekService = require('../services/ajandekService');
const db = require('../../config/db'); // Néhány speciális lekérdezéshez még kellhet, ha nem mozgatunk át mindent

exports.getAjandekok = async (req, res) => {
  try {
    const ajandekok = await ajandekService.getAll();
    res.json(ajandekok);
  } catch (error) {
    console.error('Hiba az ajándékok lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAjandekById = async (req, res) => {
  const { id } = req.params;
  try {
    const ajandek = await ajandekService.getById(id);
    res.json(ajandek);
  } catch (error) {
    if (error.message === "Ajándék nem található") {
      return res.status(404).json({ message: error.message });
    }
    console.error('Hiba az ajándék lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createAjandek = async (req, res) => {
  try {
    const ajandek = await ajandekService.create(req.body);
    res.status(201).json(ajandek);
  } catch (error) {
    console.error('Hiba az ajándék létrehozásakor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAjandek = async (req, res) => {
  const { id } = req.params;
  try {
    await ajandekService.update(id, req.body);
    res.json({ message: "Ajándék frissítve" });
  } catch (error) {
    if (error.message === "Ajándék nem található") {
      return res.status(404).json({ message: error.message });
    }
    console.error('Hiba az ajándék frissítésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAjandek = async (req, res) => {
  const { id } = req.params;
  try {
    await ajandekService.delete(id);
    res.json({ message: "Ajándék törölve" });
  } catch (error) {
    if (error.message === "Ajándék nem található") {
      return res.status(404).json({ message: error.message });
    }
    console.error('Hiba az ajándék törlésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Ajándékok lekérése alkalom név alapján
exports.getAjandekokByAlkalom = async (req, res) => {
  const { alkalomNev } = req.params;
  try {
    const decodedNev = decodeURIComponent(alkalomNev);
    const ajandekok = await db.Ajandek.findAll({
      include: [
        {
          model: db.Alkalom,
          as: 'alkalmak',
          attributes: [],
          where: { nev: decodedNev },
          through: { attributes: [] },
        },
      ],
    });
    res.json(ajandekok);
  } catch (error) {
    console.error('Hiba az ajándékok lekérésekor alkalom szerint:', error);
    res.status(500).json({ error: error.message });
  }
};

// Ajándékok lekérése stílus név alapján
exports.getAjandekokByStilus = async (req, res) => {
  const { stilusNev } = req.params;
  try {
    const decodedNev = decodeURIComponent(stilusNev);
    const ajandekok = await db.Ajandek.findAll({
      include: [
        {
          model: db.Stilus,
          as: 'stilusok',
          attributes: [],
          where: { nev: decodedNev },
          through: { attributes: [] },
        },
      ],
    });
    res.json(ajandekok);
  } catch (error) {
    console.error('Hiba az ajándékok lekérésekor stílus szerint:', error);
    res.status(500).json({ error: error.message });
  }
};

// Ajándékok lekérése célcsoport név alapján
exports.getAjandekokByCelcsoport = async (req, res) => {
  const { celcsoportNev } = req.params;
  try {
    const decodedNev = decodeURIComponent(celcsoportNev);
    const ajandekok = await db.Ajandek.findAll({
      include: [
        {
          model: db.Celcsoport,
          as: 'celcsoportok',
          attributes: [],
          where: { nev: decodedNev },
          through: { attributes: [] },
        },
      ],
    });
    res.json(ajandekok);
  } catch (error) {
    console.error('Hiba az ajándékok lekérésekor célcsoport szerint:', error);
    res.status(500).json({ error: error.message });
  }
};