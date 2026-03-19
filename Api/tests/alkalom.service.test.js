const db = require('../api/db/__mocks__/index');
jest.mock('../config/db', () => require('../api/db/__mocks__/index'));

const alkalomService = require('../api/services/alkalomService');

describe("Alkalom Service Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Alkalom.destroy({ where: {} });
  });

  test("should create an occasion via service", async () => {
    const data = { nev: "Karácsony" };
    const result = await alkalomService.create(data);
    expect(result.nev).toBe(data.nev);
  });

  test("should return all occasions", async () => {
    await db.Alkalom.create({ nev: "A" });
    const result = await alkalomService.getAll();
    expect(result.length).toBe(1);
  });

  test("should get occasion by id", async () => {
    const created = await db.Alkalom.create({ nev: "B" });
    const result = await alkalomService.getById(created.id);
    expect(result.nev).toBe("B");
  });

  test("should update an occasion", async () => {
    const created = await db.Alkalom.create({ nev: "C" });
    const result = await alkalomService.update(created.id, { nev: "C Updated" });
    expect(result.nev).toBe("C Updated");
  });

  test("should delete an occasion", async () => {
    const created = await db.Alkalom.create({ nev: "D" });
    const result = await alkalomService.delete(created.id);
    expect(result).toBe(true);
  });

  test("should throw error if occasion not found", async () => {
    await expect(alkalomService.getById(999)).rejects.toThrow("Alkalom nem található");
    await expect(alkalomService.update(999, { nev: "X" })).rejects.toThrow("Alkalom nem található");
    await expect(alkalomService.delete(999)).rejects.toThrow("Alkalom nem található");
  });
});
