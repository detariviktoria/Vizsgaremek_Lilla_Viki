const db = require('../api/db/__mocks__/index');
jest.mock('../config/db', () => require('../api/db/__mocks__/index'));

const meghivoService = require('../api/services/meghivoService');

describe("Meghívó Service Tests", () => {
  let user;
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
  });

  afterEach(async () => {
    await db.Meghivo.destroy({ where: {} });
  });

  test("should create an invitation via service", async () => {
    const data = { kuldo_id: user.user_id, email: "friend@example.com" };
    const result = await meghivoService.create(data);
    expect(result.email).toBe(data.email);
  });

  test("should return all invites", async () => {
    await db.Meghivo.create({ kuldo_id: user.user_id, email: "a@a.com" });
    const result = await meghivoService.getAll();
    expect(result.length).toBe(1);
  });

  test("should get invite by id", async () => {
    const created = await db.Meghivo.create({ kuldo_id: user.user_id, email: "b@b.com" });
    const result = await meghivoService.getById(created.meghivo_id);
    expect(result.email).toBe("b@b.com");
  });

  test("should update an invite", async () => {
    const created = await db.Meghivo.create({ kuldo_id: user.user_id, email: "c@c.com" });
    const result = await meghivoService.update(created.meghivo_id, { elfogadva: true });
    expect(result.elfogadva).toBe(true);
  });

  test("should delete an invite", async () => {
    const created = await db.Meghivo.create({ kuldo_id: user.user_id, email: "d@d.com" });
    const result = await meghivoService.delete(created.meghivo_id);
    expect(result).toBe(true);
  });

  test("should throw error if invite not found", async () => {
    await expect(meghivoService.getById(999)).rejects.toThrow("Meghívó nem található");
    await expect(meghivoService.update(999, { elfogadva: true })).rejects.toThrow("Meghívó nem található");
    await expect(meghivoService.delete(999)).rejects.toThrow("Meghívó nem található");
  });
});
