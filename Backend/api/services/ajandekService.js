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
    const { stilus_ids, alkalom_ids, celcsoport_ids, ...ajandekData } = data;
    const t = await db.sequelize.transaction();
    try {
      const ajandek = await db.Ajandek.create(ajandekData, { transaction: t });
      
      if (stilus_ids && stilus_ids.length > 0) {
        await ajandek.setStilusok(stilus_ids, { transaction: t });
      }
      if (alkalom_ids && alkalom_ids.length > 0) {
        await ajandek.setAlkalmak(alkalom_ids, { transaction: t });
      }
      if (celcsoport_ids && celcsoport_ids.length > 0) {
        await ajandek.setCelcsoportok(celcsoport_ids, { transaction: t });
      }

      await t.commit();
      return ajandek;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async update(id, data) {
    const ajandek = await db.Ajandek.findByPk(id);
    if (!ajandek) {
      throw new Error("Ajándék nem található");
    }

    const { stilus_ids, alkalom_ids, celcsoport_ids, ...updateData } = data;
    const t = await db.sequelize.transaction();
    try {
      await ajandek.update(updateData, { transaction: t });

      if (stilus_ids) {
        await ajandek.setStilusok(stilus_ids, { transaction: t });
      }
      if (alkalom_ids) {
        await ajandek.setAlkalmak(alkalom_ids, { transaction: t });
      }
      if (celcsoport_ids) {
        await ajandek.setCelcsoportok(celcsoport_ids, { transaction: t });
      }

      await t.commit();
      return ajandek;
    } catch (error) {
      await t.rollback();
      throw error;
    }
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
