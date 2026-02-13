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
});
