const { sendEmail } = require('../utilities/emailService');
const db = require('../../config/db');
const path = require('path');
const fs = require('fs');



exports.sendInvite = async (req, res, next) => {
  try {
    const { email, userId } = req.body;
    const trimmedEmail = email ? email.toLowerCase().trim() : '';

    if (!trimmedEmail || !userId) {
      return res.status(400).json({ message: 'Email és küldő ID megadása kötelező!' });
    }

    const kuldo = await db.Felhasznalo.findByPk(userId);

    if (!kuldo) {

      return res.status(404).json({ message: 'A küldő nem található!' });

    }

    // Frontend URL (ezt érdemes környezeti változóba tenni)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const inviteLink = `${frontendUrl}/regisztracio?ref=${userId}`;

    const subject = 'Meghívó a Vizsgaremek oldalra';
    const html = `
      <div style="text-align: center; font-family: sans-serif;">
        <img src="cid:kupon" alt="Kupon" style="max-width: 100%; height: auto; border-radius: 10px;" />
        <br><br>
        <a href="${inviteLink}" style="display: inline-block; padding: 10px 20px; background-color: #ff69b4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Regisztráció</a>
      </div>
    `;

    // Ellenőrizzük, hogy a kupon képe tényleg létezik-e az assets mappában
    const attachmentPath = path.join(__dirname, '../assets/kupon.jpg');
    const attachments = [];
    if (fs.existsSync(attachmentPath)) {
      attachments.push({
        filename: 'kupon.jpg',
        path: attachmentPath,
        cid: 'kupon'
      });
    } else {
      console.warn('Kupon kép nem található, a meghívó csatolmány nélkül lesz elküldve:', attachmentPath);
    }

    const success = await sendEmail(trimmedEmail, subject, html, attachments);

    if (success) {
      // Mentjük a meghívót az adatbázisba
      await db.Meghivo.create({
        kuldo_id: userId,
        email: trimmedEmail,
        kuldve_datum: new Date(),
        elfogadva: false
      });

      res.status(200).json({ message: 'Meghívó sikeresen elküldve!' });
    } else {
      // Adjunk hasznosabb hibajelzést a kliensnek (anélkül, hogy érzékeny adatokat küldenénk)
      res.status(500).json({ message: 'Hiba történt az email küldésekor. Ellenőrizd a szerver konzolját az .env és email beállítások miatt.' });
    }

  } catch (error) {
    next(error);
  }
};

// Meghívott barátok lekérése
exports.getInvitedFriends = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'Felhasználó ID megadása kötelező!' });
    }

    const friendsList = [];

    // 1. Lekérjük az összes meghívót, amit ez a felhasználó küldött
    const meghivok = await db.Meghivo.findAll({
      where: {
        kuldo_id: parseInt(userId)
      },
      order: [['kuldve_datum', 'DESC']]
    });

    // 2. Minden meghívóhoz ellenőrizzük, hogy regisztrált-e már
    for (const meghivo of meghivok) {
      const regisztraltBarat = await db.Felhasznalo.findOne({
        where: {
          email: meghivo.email,
          ajanlo_id: parseInt(userId)
        },
        attributes: ['user_id', 'name', 'email']
      });

      if (regisztraltBarat) {
        friendsList.push({
          email: meghivo.email,
          name: regisztraltBarat.name,
          status: 'Elfogadva',
          accepted: true,
          direction: 'en_hivtam_meg'
        });
        if (!meghivo.elfogadva) {
          await meghivo.update({
            elfogadva: true,
            elfogadva_datum: new Date()
          });
        }
      } else {
        friendsList.push({
          email: meghivo.email,
          name: null,
          status: 'Függőben',
          accepted: false,
          direction: 'en_hivtam_meg'
        });
      }
    }

    // 3. Megkeressük, hogy ki hívott meg minket (ha van ilyen)
    const me = await db.Felhasznalo.findByPk(userId);
    if (me && me.ajanlo_id) {
      const referrer = await db.Felhasznalo.findByPk(me.ajanlo_id, {
        attributes: ['user_id', 'name', 'email']
      });
      if (referrer) {
        friendsList.push({
          email: referrer.email,
          name: referrer.name,
          status: 'Engem hívott meg',
          accepted: true,
          direction: 'engem_hivott_meg'
        });
      }
    }

    res.status(200).json(friendsList);

  } catch (error) {
    console.error('Hiba a meghívott barátok lekérésekor:', error);
    next(error);
  }
};