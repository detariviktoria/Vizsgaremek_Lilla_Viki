const db = require('../api/db/__mocks__/index');
jest.mock('../config/db', () => require('../api/db/__mocks__/index'));

const stilusService = require('../api/services/stilusService');

describe("Stílus Service Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Stilus.destroy({ where: {} });
  });

  test("should create a style via service", async () => {
    const data = { nev: "Modern" };
    const result = await stilusService.create(data);
    expect(result.nev).toBe(data.nev);
  });

  test("should return all styles", async () => {
    await db.Stilus.create({ nev: "Retro" });
    const result = await stilusService.getAll();
    expect(result.length).toBe(1);
  });

  test("should get style by id", async () => {
    const created = await db.Stilus.create({ nev: "B" });
    const result = await stilusService.getById(created.id);
    expect(result.nev).toBe("B");
  });

  test("should update a style", async () => {
    const created = await db.Stilus.create({ nev: "C" });
    const result = await stilusService.update(created.id, { nev: "C Updated" });
    expect(result.nev).toBe("C Updated");
  });

  test("should delete a style", async () => {
    const created = await db.Stilus.create({ nev: "D" });
    const result = await stilusService.delete(created.id);
    expect(result).toBe(true);
  });

  test("should throw error if style not found", async () => {
    await expect(stilusService.getById(999)).rejects.toThrow("Stílus nem található");
    await expect(stilusService.update(999, { nev: "X" })).rejects.toThrow("Stílus nem található");
    await expect(stilusService.delete(999)).rejects.toThrow("Stílus nem található");
  });
});
