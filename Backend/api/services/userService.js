const db = require('../../config/db');
const bcrypt = require('bcrypt');

class UserService {
  async getAll() {
    return await db.Felhasznalo.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async getById(id) {
    const user = await db.Felhasznalo.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error("Felhasználó nem található");
    }
    return user;
  }

  async create(data) {
    return await db.Felhasznalo.create(data);
  }

  async update(id, data) {
    const user = await db.Felhasznalo.findByPk(id);
    if (!user) {
      throw new Error("Felhasználó nem található");
    }
    await user.update(data);
    return user;
  }

  async delete(id) {
    const user = await db.Felhasznalo.findByPk(id);
    if (!user) {
      throw new Error("Felhasználó nem található");
    }
    await user.destroy();
    return true;
  }
}

module.exports = new UserService();
