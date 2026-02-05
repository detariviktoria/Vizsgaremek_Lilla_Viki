const db = require("../../config/db");

// Új üzenet mentése
exports.sendMessage = async (req, res) => {
  try {
    const { from_user_id, to_user_id, message } = req.body;

    if (!from_user_id || !to_user_id || !message || !message.trim()) {
      return res.status(400).json({ message: "Hiányzó vagy üres mezők (from_user_id, to_user_id, message)." });
    }

    const chatMessage = await db.ChatMessage.create({
      from_user_id,
      to_user_id,
      message: message.trim(),
    });

    res.status(201).json(chatMessage);
  } catch (error) {
    console.error("Hiba az üzenet mentésekor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Két felhasználó közötti üzenetek lekérése
exports.getHistory = async (req, res) => {
  try {
    const { user1Id, user2Id } = req.params;

    if (!user1Id || !user2Id) {
      return res.status(400).json({ message: "Hiányzó felhasználó azonosítók." });
    }

    const messages = await db.ChatMessage.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { from_user_id: user1Id, to_user_id: user2Id },
          { from_user_id: user2Id, to_user_id: user1Id },
        ],
      },
      order: [["created_at", "ASC"]],
    });

    res.json(messages);
  } catch (error) {
    console.error("Hiba az üzenet előzmények lekérésekor:", error);
    res.status(500).json({ error: error.message });
  }
};

