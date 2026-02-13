const db = require('../../config/db');

class KuponService {
  async getAll() {
    return await db.Kupon.findAll();
  }

  async getById(id) {
    const kupon = await db.Kupon.findByPk(id);
    if (!kupon) {
      throw new Error("Kupon nem található");
    }
    return kupon;
  }

  async create(data) {
    return await db.Kupon.create(data);
  }

  async update(id, data) {
    const kupon = await db.Kupon.findByPk(id);
    if (!kupon) {
      throw new Error("Kupon nem található");
    }
    await kupon.update(data);
    return kupon;
  }

  async delete(id) {
    const kupon = await db.Kupon.findByPk(id);
    if (!kupon) {
      throw new Error("Kupon nem található");
    }
    await kupon.destroy();
    return true;
  }
}

module.exports = new KuponService();
