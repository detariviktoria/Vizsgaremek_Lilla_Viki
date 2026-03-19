const db = require('../api/db/__mocks__/index');
jest.mock('../config/db', () => require('../api/db/__mocks__/index'));

const celcsoportService = require('../api/services/celcsoportService');

describe("Célcsoport Service Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Celcsoport.destroy({ where: {} });
  });

  test("should create a target group via service", async () => {
    const data = { nev: "Gyerekek" };
    const result = await celcsoportService.create(data);
    expect(result.nev).toBe(data.nev);
  });

  test("should return all target groups", async () => {
    await db.Celcsoport.create({ nev: "A" });
    const result = await celcsoportService.getAll();
    expect(result.length).toBe(1);
  });

  test("should get target group by id", async () => {
    const created = await db.Celcsoport.create({ nev: "B" });
    const result = await celcsoportService.getById(created.id);
    expect(result.nev).toBe("B");
  });

  test("should update a target group", async () => {
    const created = await db.Celcsoport.create({ nev: "C" });
    const result = await celcsoportService.update(created.id, { nev: "C Updated" });
    expect(result.nev).toBe("C Updated");
  });

  test("should delete a target group", async () => {
    const created = await db.Celcsoport.create({ nev: "D" });
    const result = await celcsoportService.delete(created.id);
    expect(result).toBe(true);
  });

  test("should throw error if target group not found", async () => {
    await expect(celcsoportService.getById(999)).rejects.toThrow("Célcsoport nem található");
    await expect(celcsoportService.update(999, { nev: "X" })).rejects.toThrow("Célcsoport nem található");
    await expect(celcsoportService.delete(999)).rejects.toThrow("Célcsoport nem található");
  });
});
