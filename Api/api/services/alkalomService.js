const db = require('../../config/db');

class AlkalomService {
  async getAll() {
    return await db.Alkalom.findAll();
  }

  async getById(id) {
    const alkalom = await db.Alkalom.findByPk(id);
    if (!alkalom) {
      throw new Error("Alkalom nem található");
    }
    return alkalom;
  }

  async create(data) {
    return await db.Alkalom.create(data);
  }

  async update(id, data) {
    const alkalom = await db.Alkalom.findByPk(id);
    if (!alkalom) {
      throw new Error("Alkalom nem található");
    }
    await alkalom.update(data);
    return alkalom;
  }

  async delete(id) {
    const alkalom = await db.Alkalom.findByPk(id);
    if (!alkalom) {
      throw new Error("Alkalom nem található");
    }
    await alkalom.destroy();
    return true;
  }
}

module.exports = new AlkalomService();
