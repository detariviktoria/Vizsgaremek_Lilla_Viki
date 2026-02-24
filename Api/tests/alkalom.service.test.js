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
});
