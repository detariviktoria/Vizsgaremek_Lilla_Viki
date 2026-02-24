const db = require('../api/db/__mocks__/index');
jest.mock('../config/db', () => require('../api/db/__mocks__/index'));

const kuponService = require('../api/services/kuponService');

describe("Kupon Service Tests", () => {
  let user;
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
  });

  afterEach(async () => {
    await db.Kupon.destroy({ where: {} });
  });

  test("should create a coupon via service", async () => {
    const data = { user_id: user.user_id, coupon_code: "SAVE10", status: "active", discount: 10 };
    const result = await kuponService.create(data);
    expect(result.coupon_code).toBe(data.coupon_code);
  });
});
