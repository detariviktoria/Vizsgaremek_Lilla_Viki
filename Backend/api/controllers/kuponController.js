const db = require('../../config/db');

exports.getKuponok = async (req, res) => {
  try {
    const kuponok = await db.Kupon.findAll();
    
    // Map backend fields to what the frontend expects (id, kod, lejarat_datum)
    const formattedKuponok = kuponok.map(k => ({
      id: k.coupon_id,
      kod: k.coupon_code,
      lejarat_datum: k.expiry_date,
      user_id: k.user_id,
      status: k.status,
      discount: k.discount
    }));
    
    res.json(formattedKuponok);
  } catch (err) {
    console.error("Hiba a kuponok lekérésekor:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getKuponokByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const kuponok = await db.Kupon.findAll({ where: { user_id: userId } });
    
    // Map backend fields to what the frontend expects (id, kod, lejarat_datum)
    const formattedKuponok = kuponok.map(k => ({
      id: k.coupon_id,
      kod: k.coupon_code,
      lejarat_datum: k.expiry_date
    }));
    
    res.json(formattedKuponok);
  } catch (err) {
    console.error("Hiba a felhasználó kuponjainak lekérésekor:", err);
    res.status(500).json({ error: err.message });
  }
};

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