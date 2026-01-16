const { sendEmail } = require('../utilities/emailService');

const db = require('../../config/db');



exports.sendInvite = async (req, res, next) => {
  try {
    const { email, userId } = req.body;

    if (!email || !userId) {
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
      <h1>Szia!</h1>
      <p>${kuldo.name} meghívott téged a Vizsgaremek oldalra.</p>
      <p>Kattints az alábbi linkre a regisztrációhoz:</p>
      <a href="${inviteLink}">${inviteLink}</a>
      <p>Ha regisztrálsz, ${kuldo.name} egy 5000 Ft-os kupont kap!</p>
    `;

    const success = await sendEmail(email, subject, html);

    if (success) {
      // Mentjük a meghívót az adatbázisba
      await db.Meghivo.create({
        kuldo_id: userId,
        email: email,
        kuldve_datum: new Date(),
        elfogadva: false
      });

      res.status(200).json({ message: 'Meghívó sikeresen elküldve!' });
    } else {
      res.status(500).json({ message: 'Hiba történt az email küldésekor.' });
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
      // Keresünk felhasználót ezzel az email címmel, aki ezt a felhasználót ajánlotta
      const regisztraltBarat = await db.Felhasznalo.findOne({
        where: {
          email: meghivo.email,
          ajanlo_id: parseInt(userId)
        },
        attributes: ['user_id', 'name', 'email']
      });

      if (regisztraltBarat) {
        // Ha regisztrált, akkor elfogadva
        friendsList.push({
          email: meghivo.email,
          name: regisztraltBarat.name,
          status: 'Elfogadva',
          accepted: true
        });
        // Frissítjük a meghívó státuszát, ha még nem volt frissítve
        if (!meghivo.elfogadva) {
          await meghivo.update({
            elfogadva: true,
            elfogadva_datum: new Date()
          });
        }
      } else {
        // Ha még nem regisztrált, akkor függőben
        friendsList.push({
          email: meghivo.email,
          name: null,
          status: 'Függőben',
          accepted: false
        });
      }
    }

    res.status(200).json(friendsList);

  } catch (error) {
    console.error('Hiba a meghívott barátok lekérésekor:', error);
    next(error);
  }
};