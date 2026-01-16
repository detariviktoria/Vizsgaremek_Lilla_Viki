const bcrypt = require('bcrypt');

const db = require("../../config/db");

const { sendEmail } = require('../utilities/emailService');



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

    res.json({ username: user.name, userId: user.user_id });
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

// Felhasználó frissítése
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await db.Felhasznalo.findByPk(id);
    if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    // Ha a név változott, frissítsük a session-t is
    if (name && req.session.userId == id) {
      req.session.username = name;
    }

    res.json({ message: "Felhasználó adatai frissítve!", user: { id: user.user_id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Hiba a felhasználó frissítésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Új felhasználó hozzáadása


exports.createUser = async (req, res) => {

  const { name, email, password, ajanlo_id } = req.body;

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

      ajanlo_id: ajanlo_id || null

    });



    // Ha van ajánló, generáljunk kupont és küldjünk emailt

    if (ajanlo_id) {

      try {

        // Frissítjük a meghívó státuszát, ha létezik
        const meghivo = await db.Meghivo.findOne({
          where: {
            kuldo_id: parseInt(ajanlo_id),
            email: email,
            elfogadva: false
          }
        });

        if (meghivo) {
          await meghivo.update({
            elfogadva: true,
            elfogadva_datum: new Date()
          });
        }

        const couponCode = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        

        await db.Kupon.create({

           user_id: ajanlo_id,

           coupon_code: couponCode,

           status: 'active',

           discount: 5000,

           expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 nap

        });



        const referrer = await db.Felhasznalo.findByPk(ajanlo_id);

        if (referrer) {

            const subject = 'Gratulálunk! Új kuponod érkezett!';

            const html = `

                <h1>Szia ${referrer.name}!</h1>

                <p>Egy általad meghívott ismerősöd (${name}) sikeresen regisztrált!</p>

                <p>Jutalmad egy 5000 Ft értékű kupon:</p>

                <h2 style="color: #e91e63;">${couponCode}</h2>

                <p>A kupon 30 napig érvényes.</p>

            `;

            await sendEmail(referrer.email, subject, html);

        }

      } catch (err) {

        console.error('Hiba a kupon generálásakor vagy email küldéskor:', err);

      }

    }



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
    res.json({ username: req.session.username, userId: req.session.userId });
  } else {
    res.status(401).json({ message: 'Nincs aktív session' });
  }
};