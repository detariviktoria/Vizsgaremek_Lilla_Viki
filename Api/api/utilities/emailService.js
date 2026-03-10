const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config(); 



console.log('Email konfiguráció ellenőrzése:', {
  user: process.env.EMAIL_USER ? 'BEÁLLÍTVA' : 'HIÁNYZIK',
  pass: process.env.EMAIL_PASS ? 'BEÁLLÍTVA' : 'HIÁNYZIK'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Hiányzó email konfiguráció! Ellenőrizd az .env fájlt.');
    }
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments
    });

    console.log('Email elküldve: %s', info.messageId);

    return true;

  } catch (error) {

    console.error('Hiba az email küldésekor:', error);

    if (error.response) {

      console.error(error.response);

    }

    return false;

  }

};
module.exports = { sendEmail };