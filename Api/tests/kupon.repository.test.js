const db = require("../api/db/__mocks__/index");

describe("Kupon Repository Tests", () => {
  let user;
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    user = await db.Felhasznalo.create({
      name: "Kupon User",
      email: "kupon@example.com",
      password: "password"
    });
  });

  afterEach(async () => {
    await db.Kupon.destroy({ where: {} });
  });

  test("should create and find a Kupon", async () => {
    const data = {
      user_id: user.user_id,
      coupon_code: "TEST50",
      status: "active",
      discount: 50
    };
    const created = await db.Kupon.create(data);
    const found = await db.Kupon.findByPk(created.coupon_id);
    expect(found.coupon_code).toBe(data.coupon_code);
  });
});
