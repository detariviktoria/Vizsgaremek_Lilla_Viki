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
});
