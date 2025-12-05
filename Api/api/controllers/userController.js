const bcrypt = require('bcrypt');
const db = require("../../config/db");

// Bejelentkezés
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.Felhasznalo.findOne({ where: { name: username } });
    
    if (!user) {
      return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó!" });
    }

    // Session-be mentjük a felhasználó adatait
    req.session.userId = user.user_id;
    req.session.username = user.name;

    res.json({ username: user.name });
  } catch (error) {
    console.error('Bejelentkezési hiba:', error);
    res.status(500).json({ error: error.message });
  }
};

// Összes felhasználó lekérése
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.Felhasznalo.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error) {
    console.error('Hiba a felhasználók lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Egy felhasználó lekérése ID alapján
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.Felhasznalo.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return res.status(404).json({ message: "Felhasználó nem található" });
    res.json(user);
  } catch (error) {
    console.error('Hiba a felhasználó lekérésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Új felhasználó hozzáadása
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await db.Felhasznalo.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: "Ez a felhasználónév már foglalt." });
    }

    const existingEmail = await db.Felhasznalo.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Ezzel az email címmel már regisztráltak." });
    }

    const user = await db.Felhasznalo.create({
      name,
      email,
      password,
    });

    res.status(201).json({ message: "Felhasználó létrehozva!", userId: user.user_id });
  } catch (error) {
    console.error('Hiba a felhasználó létrehozásakor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kijelentkezés
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba a kijelentkezéskor' });
    }
    res.json({ message: 'Sikeresen kijelentkezve' });
  });
};

// Session ellenőrzés
exports.checkSession = (req, res) => {
  if (req.session.userId) {
    res.json({ username: req.session.username });
  } else {
    res.status(401).json({ message: 'Nincs aktív session' });
  }
};