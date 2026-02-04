const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const ChatMessage = require('../models/ChatMessage');

// Üzenet küldése
router.post('/send', async (req, res) => {
  const { from_user_id, to_user_id, message } = req.body;
  if (!from_user_id || !to_user_id || !message) {
    return res.status(400).json({ error: 'Hiányzó adat!' });
  }
  try {
    const msg = await ChatMessage.create({ from_user_id, to_user_id, message });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Adatbázis hiba!' });
  }
});

// Üzenet előzmények lekérése két felhasználó között
router.get('/history/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await ChatMessage.findAll({
      where: db.Sequelize.or(
        { from_user_id: user1, to_user_id: user2 },
        { from_user_id: user2, to_user_id: user1 }
      ),
      order: [['created_at', 'ASC']]
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Adatbázis hiba!' });
  }
});

module.exports = router;
