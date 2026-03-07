const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const db = require("../../config/db");

const { sendEmail } = require('../utilities/emailService');
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production';



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

    // JWT token generálása
    const token = jwt.sign(
      { id: user.user_id, username: user.name, role: user.is_admin ? 'admin' : 'user' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Cookie-ba mentjük a tokent
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000 // 2 óra
    });

    res.json({ username: user.name, userId: user.user_id, role: user.is_admin ? 'admin' : 'user', isAdmin: !!user.is_admin });
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

// Admin: felhasználó frissítése (név, email, jelszó) – frontendbe is tükröződik
exports.updateUserAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await db.Felhasznalo.findByPk(id);
    if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

    if (name && name.trim() !== "") {
      if (name !== user.name) {
        const existingUser = await db.Felhasznalo.findOne({ where: { name } });
        if (existingUser) {
          return res.status(400).json({ message: "Ez a felhasználónév már foglalt." });
        }
      }
      user.name = name.trim();
    }

    if (email && email.trim() !== "") {
      if (email !== user.email) {
        const existingEmail = await db.Felhasznalo.findOne({ where: { email } });
        if (existingEmail) {
          return res.status(400).json({ message: "Ez az e-mail cím már foglalt." });
        }
      }
      user.email = email.trim();
    }

    if (password && password.trim() !== "") {
      user.password = password.trim();
    }

    await user.save();

    res.json({ message: "Felhasználó adatai frissítve!", user: { id: user.user_id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Hiba a felhasználó (admin) frissítésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Felhasználó frissítése
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, oldPassword } = req.body;
  try {
    const user = await db.Felhasznalo.findByPk(id);
    if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

    if (name && name !== user.name) {
      const existingUser = await db.Felhasznalo.findOne({ where: { name } });
      if (existingUser) {
        return res.status(400).json({ message: "Ez a felhasználónév már foglalt." });
      }
      user.name = name;
    }
    
    // Email módosítása le van tiltva biztonsági okokból
    if (email && email !== user.email) {
      return res.status(400).json({ message: "Az e-mail cím módosítása nem engedélyezett!" });
    }
    
    if (password) {
      if (!oldPassword) {
        return res.status(400).json({ message: "A jelszó módosításához meg kell adnia a régi jelszót!" });
      }
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return res.status(401).json({ message: "A megadott régi jelszó hibás!" });
      }
      user.password = password;
    }

    await user.save();

    res.json({ message: "Felhasználó adatai frissítve!", user: { id: user.user_id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Hiba a felhasználó frissítésekor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Elfelejtett jelszó - Token generálás és email küldés
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.Felhasznalo.findOne({ where: { email } });
    if (!user) {
      // Ha nincs ilyen felhasználó, jelezzük a frontendnek
      res.status(404);
      return res.json({ message: "Ehhez az emailcímhez még nincs felhasználó létrehozva." });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.reset_token = token;
    user.reset_token_expires = Date.now() + 3600000; // 1 óra
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${token}`;
    
    const subject = 'Jelszó visszaállítás - AjándékAjánló';
    const html = `
      <h1>Szia ${user.name}!</h1>
      <p>Jelszó visszaállítást kértél az AjándékAjánló fiókodhoz.</p>
      <p>Kattints az alábbi linkre a jelszavad megváltoztatásához:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #e91e63; color: white; text-decoration: none; border-radius: 5px;">Jelszó visszaállítása</a>
      <p>A link 1 óráig érvényes. Ha nem te kérted a visszaállítást, hagyd figyelmen kívül ezt az üzenetet.</p>
    `;

    await sendEmail(user.email, subject, html);

    res.json({ message: "Ha létezik fiók ezzel az email címmel, elküldtük a jelszó visszaállítási linket." });
  } catch (error) {
    console.error('Hiba az elfelejtett jelszó folyamatban:', error);
    res.status(500).json({ error: error.message });
  }
};

// Jelszó visszaállítása token alapján
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await db.Felhasznalo.findOne({
      where: {
        reset_token: token,
        reset_token_expires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "A jelszó visszaállító link érvénytelen vagy lejárt." });
    }

    user.password = password;
    user.reset_token = null;
    user.reset_token_expires = null;
    await user.save();

    res.json({ message: "A jelszavad sikeresen megváltozott! Most már bejelentkezhetsz az új jelszavaddal." });
  } catch (error) {
    console.error('Hiba a jelszó visszaállításakor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Új felhasználó hozzáadása


exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, ajanlo_id } = req.body;
  
  const transaction = await db.sequelize.transaction();

  try {
    const existingUser = await db.Felhasznalo.findOne({ where: { name }, transaction });
    if (existingUser) {
      await transaction.rollback();
      return res.status(400).json({ message: "Ez a felhasználónév már foglalt." });
    }

    const existingEmail = await db.Felhasznalo.findOne({ where: { email }, transaction });
    if (existingEmail) {
      await transaction.rollback();
      return res.status(400).json({ message: "Ezzel az email címmel már regisztráltak." });
    }

    const user = await db.Felhasznalo.create({
      name,
      email,
      password,
      ajanlo_id: ajanlo_id || null
    }, { transaction });

    // Ha van ajánló, generáljunk kupont
    if (ajanlo_id) {
      // Frissítjük a meghívó státuszát, ha létezik
      const meghivo = await db.Meghivo.findOne({
        where: {
          kuldo_id: parseInt(ajanlo_id),
          email: email,
          elfogadva: false
        },
        transaction
      });

      const couponCode = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      if (meghivo) {
        await meghivo.update({
          meghivott_id: user.user_id,
          elfogadva: true,
          elfogadva_datum: new Date(),
          kupon_kod: couponCode,
          lejarat_datum: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }, { transaction });
      }

      // Megpróbáljuk a Kupon táblába is elmenteni, ha létezik (kompatibilitás miatt)
      try {
        await db.Kupon.create({
           user_id: ajanlo_id,
           coupon_code: couponCode,
           status: 'active',
           discount: 5000,
           expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }, { transaction });
      } catch (e) {
        console.warn('Kupon tábla nem létezik, kihagyva.');
      }
    }

    await transaction.commit();

    // Email küldés (tranzakción kívül, mert ha az email hiba, az adatbázis már ok)
    if (ajanlo_id) {
      const referrer = await db.Felhasznalo.findByPk(ajanlo_id);
      if (referrer) {
        const couponCode = '...'; // Itt le kellene kérni az utolsót, de az egyszerűség kedvéért maradjunk a logikánál
        const subject = 'Gratulálunk! Új kuponod érkezett!';
        const html = `<h1>Szia ${referrer.name}!</h1><p>Ismerősöd regisztrált, kuponod érkezett!</p>`;
        sendEmail(referrer.email, subject, html).catch(err => console.error('Email hiba:', err));
      }
    }

    res.status(201).json({ message: "Felhasználó létrehozva!", userId: user.user_id });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Hiba a felhasználó létrehozásakor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Kijelentkezés
exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Sikeresen kijelentkezve' });
};

// Auth ellenőrzés (korábban checkSession)
exports.checkSession = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Nincs aktív bejelentkezés' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ username: decoded.username, userId: decoded.id, role: decoded.role, isAdmin: decoded.role === 'admin' });
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({ message: 'Érvénytelen token' });
  }
};