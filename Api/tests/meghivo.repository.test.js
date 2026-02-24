const db = require("../api/db/__mocks__/index");

describe("Meghívó Repository Tests", () => {
  let user;
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    user = await db.Felhasznalo.create({
      name: "Meghivo User",
      email: "meghivo@example.com",
      password: "password"
    });
  });

  afterEach(async () => {
    await db.Meghivo.destroy({ where: {} });
  });

  test("should create and find a Meghívó", async () => {
    const data = {
      kuldo_id: user.user_id,
      email: "invited@example.com"
    };
    const created = await db.Meghivo.create(data);
    const found = await db.Meghivo.findByPk(created.meghivo_id);
    expect(found.email).toBe(data.email);
  });
});
