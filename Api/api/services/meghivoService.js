const db = require('../../config/db');

class MeghivoService {
  async getAll() {
    return await db.Meghivo.findAll();
  }

  async getById(id) {
    const meghivo = await db.Meghivo.findByPk(id);
    if (!meghivo) {
      throw new Error("Meghívó nem található");
    }
    return meghivo;
  }

  async create(data) {
    return await db.Meghivo.create(data);
  }

  async update(id, data) {
    const meghivo = await db.Meghivo.findByPk(id);
    if (!meghivo) {
      throw new Error("Meghívó nem található");
    }
    await meghivo.update(data);
    return meghivo;
  }

  async delete(id) {
    const meghivo = await db.Meghivo.findByPk(id);
    if (!meghivo) {
      throw new Error("Meghívó nem található");
    }
    await meghivo.destroy();
    return true;
  }
}

module.exports = new MeghivoService();
