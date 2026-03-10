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

// Olvasatlan üzenetek száma egy felhasználó számára
exports.getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await db.ChatMessage.count({
      where: {
        to_user_id: userId,
        is_read: false,
      },
    });
    res.json({ unreadCount: count });
  } catch (error) {
    console.error("Hiba az olvasatlan üzenetek lekérésekor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Üzenetek olvasottnak jelölése
exports.markAsRead = async (req, res) => {
  try {
    const { fromUserId, toUserId } = req.body;
    await db.ChatMessage.update(
      { is_read: true },
      {
        where: {
          from_user_id: fromUserId,
          to_user_id: toUserId,
          is_read: false,
        },
      }
    );
    res.json({ message: "Üzenetek olvasottnak jelölve." });
  } catch (error) {
    console.error("Hiba az üzenetek olvasottnak jelölésekor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Olvasatlan üzenetek feladóinak listája
exports.getUnreadSenders = async (req, res) => {
  try {
    const { userId } = req.params;
    const senders = await db.ChatMessage.findAll({
      attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('from_user_id')), 'from_user_id']],
      where: {
        to_user_id: userId,
        is_read: false,
      },
      raw: true
    });
    const ids = senders.map(s => Number(s.from_user_id));
    console.log(`Olvasatlan üzenetek feladói (${userId} számára):`, ids);
    res.json(ids);
  } catch (error) {
    console.error("Hiba az olvasatlan feladók lekérésekor:", error);
    res.status(500).json({ error: error.message });
  }
};

