const db = require("../../config/db");

// Lekérés: Egy felhasználó előzményei

exports.getElozmenyek = async (req, res) => {

  const { userId } = req.params;

  try {

    const felhasznalo = await db.Felhasznalo.findByPk(userId, {

      include: [

        {

          model: db.Ajandek,

          as: "elozmenyek",

          through: { attributes: ['keresesi_ido'] } // Ha kell a keresés ideje is

        }

      ]

    });



    if (!felhasznalo) {

      return res.status(404).json({ message: "Felhasználó nem található" });

    }



    res.json(felhasznalo.elozmenyek);

  } catch (err) {

    console.error("DEBUG HIBA:", err);

    res.status(500).json({ error: err.message, stack: err.stack });

  }

};


// Új előzmény hozzáadása
exports.addElozmeny = async (req, res) => {
  const { userId } = req.params;
  const { ajandek_id } = req.body;

  try {
    const felhasznalo = await db.Felhasznalo.findByPk(userId);
    const ajandek = await db.Ajandek.findByPk(ajandek_id);

    if (!felhasznalo || !ajandek)
      return res.status(404).json({ message: "Felhasználó vagy ajándék nem található" });

    await felhasznalo.addElozmenyek(ajandek, { through: { keresesi_ido: new Date() } });

    res.json({ message: "Előzmény hozzáadva" });
  } catch (err) {
    console.error("Hiba új előzmény hozzáadásakor:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};