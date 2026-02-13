const db = require('../../config/db');

class CelcsoportService {
  async getAll() {
    return await db.Celcsoport.findAll();
  }

  async getById(id) {
    const celcsoport = await db.Celcsoport.findByPk(id);
    if (!celcsoport) {
      throw new Error("Célcsoport nem található");
    }
    return celcsoport;
  }

  async create(data) {
    return await db.Celcsoport.create(data);
  }

  async update(id, data) {
    const celcsoport = await db.Celcsoport.findByPk(id);
    if (!celcsoport) {
      throw new Error("Célcsoport nem található");
    }
    await celcsoport.update(data);
    return celcsoport;
  }

  async delete(id) {
    const celcsoport = await db.Celcsoport.findByPk(id);
    if (!celcsoport) {
      throw new Error("Célcsoport nem található");
    }
    await celcsoport.destroy();
    return true;
  }
}

module.exports = new CelcsoportService();
