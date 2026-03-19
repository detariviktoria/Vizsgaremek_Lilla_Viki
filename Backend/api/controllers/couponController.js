const db = require("../../config/db");
const { Op } = require("sequelize");

// Felhasználó összes kuponjának lekérése (amiket ő küldött vagy kapott)
exports.getUserCoupons = async (req, res) => {
  try {
    const { userId } = req.params;
    const uId = parseInt(userId);

    const coupons = await db.Meghivo.findAll({
      where: {
        [Op.and]: [
          { kupon_kod: { [Op.ne]: null } },
          {
            [Op.or]: [
              { kuldo_id: uId },
              { meghivott_id: uId }
            ]
          }
        ]
      },
      order: [['elfogadva_datum', 'DESC']]
    });

    // Átalakítjuk a formátumot a frontendnek
    const formatted = coupons.map(c => ({
      id: c.meghivo_id,
      kod: c.kupon_kod,
      lejarat_datum: c.lejarat_datum
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Hiba a kuponok lekérésekor:", error);
    res.status(500).json({ error: error.message });
  }
};
