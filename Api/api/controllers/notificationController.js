const db = require("../../config/db");

// Felhasználó értesítéseinek lekérése
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await db.Notification.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  } catch (error) {
    console.error("Hiba az értesítések lekérésekor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Értesítés olvasottnak jelölése
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Notification.update(
      { is_read: true },
      { where: { id } }
    );
    res.json({ message: "Értesítés olvasottnak jelölve." });
  } catch (error) {
    console.error("Hiba az értesítés frissítésekor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Összes értesítés olvasottnak jelölése
exports.markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    await db.Notification.update(
      { is_read: true },
      { where: { user_id: userId, is_read: false } }
    );
    res.json({ message: "Összes értesítés olvasottnak jelölve." });
  } catch (error) {
    console.error("Hiba az értesítések frissítésekor:", error);
    res.status(500).json({ error: error.message });
  }
};
