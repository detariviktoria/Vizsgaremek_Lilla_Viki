const bcrypt = require("bcryptjs");

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10;

module.exports = {
  // Szinkron hashelés (model setterben használható)
  hashPasswordSync: (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
  },

  // Aszinkron hashelés (regisztrációnál használható)
  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(password, salt, (err2, hash) => {
          if (err2) return reject(err2);
          resolve(hash);
        });
      });
    });
  },

  // Aszinkron összehasonlítás (bejelentkezésnél)
  comparePassword: (plainPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hashedPassword, (err, same) => {
        if (err) return reject(err);
        resolve(same);
      });
    });
  },

  // Szinkron összehasonlítás (ha szükséges)
  comparePasswordSync: (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
};