const db = require('../../config/db');

class StilusService {
  async getAll() {
    return await db.Stilus.findAll();
  }

  async getById(id) {
    const stilus = await db.Stilus.findByPk(id);
    if (!stilus) {
      throw new Error("Stílus nem található");
    }
    return stilus;
  }

  async create(data) {
    return await db.Stilus.create(data);
  }

  async update(id, data) {
    const stilus = await db.Stilus.findByPk(id);
    if (!stilus) {
      throw new Error("Stílus nem található");
    }
    await stilus.update(data);
    return stilus;
  }

  async delete(id) {
    const stilus = await db.Stilus.findByPk(id);
    if (!stilus) {
      throw new Error("Stílus nem található");
    }
    await stilus.destroy();
    return true;
  }
}

module.exports = new StilusService();
