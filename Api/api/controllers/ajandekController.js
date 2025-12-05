const db = require('../../config/db');

exports.getAjandekok = async (req, res) => {
  try {
    const ajandekok = await db.Ajandek.findAll();
    res.json(ajandekok);
  } catch (error) {
    console.error('Hiba az ajándékok lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAjandekById = async (req, res) => {
  const { id } = req.params;
  try {
    const ajandek = await db.Ajandek.findByPk(id);
    if (!ajandek) return res.status(404).json({ message: "Ajándék nem található" });
    res.json(ajandek);
  } catch (error) {
    console.error('Hiba az ajándék lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createAjandek = async (req, res) => {
  const { nev, leiras, ar, kategoria, stilus_ids, image_url, link_url } = req.body;
  try {
    const ajandek = await db.Ajandek.create({
      nev,
      leiras,
      ar,
      kategoria,
      image_url,
      link_url,
    });
    if (stilus_ids && stilus_ids.length > 0) {
      await ajandek.setStilusok(stilus_ids);
    }
    res.status(201).json({ message: "Ajándék létrehozva", id: ajandek.id });
  } catch (error) {
    console.error('Hiba az ajándék létrehozásakor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAjandek = async (req, res) => {
  const { id } = req.params;
  const { nev, leiras, ar, kategoria, stilus_ids, image_url, link_url } = req.body;
  try {
    const ajandek = await db.Ajandek.findByPk(id);
    if (!ajandek) return res.status(404).json({ message: "Ajándék nem található" });
    
    await ajandek.update({
      nev,
      leiras,
      ar,
      kategoria,
      image_url,
      link_url,
    });
    if (stilus_ids) {
      await ajandek.setStilusok(stilus_ids);
    }
    res.json({ message: "Ajándék frissítve" });
  } catch (error) {
    console.error('Hiba az ajándék frissítésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAjandek = async (req, res) => {
  const { id } = req.params;
  try {
    const ajandek = await db.Ajandek.findByPk(id);
    if (!ajandek) return res.status(404).json({ message: "Ajándék nem található" });
    
    await ajandek.destroy();
    res.json({ message: "Ajándék törölve" });
  } catch (error) {
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