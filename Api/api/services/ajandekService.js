const db = require('../../config/db');

class AjandekService {
  async getAll() {
    return await db.Ajandek.findAll();
  }

  async getById(id) {
    const ajandek = await db.Ajandek.findByPk(id);
    if (!ajandek) {
      throw new Error("Ajándék nem található");
    }
    return ajandek;
  }

  async create(data) {
    const { stilus_ids, ...ajandekData } = data;
    const ajandek = await db.Ajandek.create(ajandekData);
    if (stilus_ids && stilus_ids.length > 0) {
      await ajandek.setStilusok(stilus_ids);
    }
    return ajandek;
  }

  async update(id, data) {
    const ajandek = await db.Ajandek.findByPk(id);
    if (!ajandek) {
      throw new Error("Ajándék nem található");
    }

    const { stilus_ids, ...updateData } = data;
    await ajandek.update(updateData);

    if (stilus_ids) {
      await ajandek.setStilusok(stilus_ids);
    }
    return ajandek;
  }

  async delete(id) {
    const ajandek = await db.Ajandek.findByPk(id);
    if (!ajandek) {
      throw new Error("Ajándék nem található");
    }
    await ajandek.destroy();
    return true;
  }
}

module.exports = new AjandekService();
