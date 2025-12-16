const db = require('../../config/db');

// GET /api/felhasznalok/:userId/kedvencek
exports.getKedvencek = async (req, res) => {
  const { userId } = req.params;
  try {
    const felhasznalo = await db.Felhasznalo.findByPk(userId, {
      include: [
        {

          model: db.Ajandek,

          as: "kedvencAjandekok", // alias a modellben

          // attributes: ["nev"], // Ezt kivesszük, hogy minden mezőt (főleg az ID-t) visszaadjon

          through: { attributes: [] } // kapcsolótábla mezőit nem kell

        }
      ]
    });

    if (!felhasznalo) {
      return res.status(404).json({ message: "Felhasználó nem található" });
    }

    res.json(felhasznalo.kedvencAjandekok);
  } catch (err) {
    console.error("Hiba a kedvencek lekérésekor:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST /api/felhasznalok/:userId/kedvencek
exports.addKedvenc = async (req, res) => {
  const { userId } = req.params;
  const { ajandek_id } = req.body;

  try {
    const felhasznalo = await db.Felhasznalo.findByPk(userId);
    const ajandek = await db.Ajandek.findByPk(ajandek_id);

    if (!felhasznalo || !ajandek) {
      return res.status(404).json({ message: "Felhasználó vagy ajándék nem található" });
    }

    await felhasznalo.addKedvencAjandekok(ajandek); // alias a modellekből

    res.json({ message: "Kedvenc hozzáadva" });
  } catch (err) {
    console.error("Hiba kedvenc hozzáadásakor:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/felhasznalok/:userId/kedvencek/:ajandekId
exports.deleteKedvenc = async (req, res) => {
  const { userId, ajandekId } = req.params;

  try {
    const felhasznalo = await db.Felhasznalo.findByPk(userId);
    const ajandek = await db.Ajandek.findByPk(ajandekId);

    if (!felhasznalo || !ajandek) {
      return res.status(404).json({ message: "Felhasználó vagy ajándék nem található" });
    }

    await felhasznalo.removeKedvencAjandekok(ajandek); // alias a modellekből

    res.json({ message: "Kedvenc törölve" });
  } catch (err) {
    console.error("Hiba kedvenc törlésekor:", err);
    res.status(500).json({ error: err.message });
  }
};