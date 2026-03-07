const db = require('../../config/db');

// Összes kupon lekérése
exports.getKuponok = async (req, res) => {
  try {
    const kuponok = await db.Kupon.findAll();
    res.json(kuponok);
  } catch (err) {
    console.error("Hiba a kuponok lekérésekor:", err);
    res.status(500).json({ error: err.message });
  }
};

// Egy kupon lekérése ID alapján
exports.getKuponById = async (req, res) => {
  const { id } = req.params;
  try {
    const kupon = await db.Kupon.findByPk(id);
    if (!kupon) return res.status(404).json({ message: "Kupon nem található" });
    res.json(kupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Új kupon létrehozása
exports.createKupon = async (req, res) => {
  const { coupon_code, discount, user_id, status, expiry_date } = req.body;
  try {
    const ujKupon = await db.Kupon.create({ coupon_code, discount, user_id, status, expiry_date });
    res.status(201).json({ message: "Kupon létrehozva", kupon: ujKupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Kupon frissítése
exports.updateKupon = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await db.Kupon.update(req.body, { where: { coupon_id: id } });
    if (updated) {
      const updatedKupon = await db.Kupon.findByPk(id);
      res.json({ message: "Kupon frissítve", kupon: updatedKupon });
    } else {
      res.status(404).json({ message: "Kupon nem található" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Kupon törlése
exports.deleteKupon = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.Kupon.destroy({ where: { coupon_id: id } });
    if (deleted) {
      res.json({ message: "Kupon törölve" });
    } else {
      res.status(404).json({ message: "Kupon nem található" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
