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
});
