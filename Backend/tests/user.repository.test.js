const db = require("../api/db/__mocks__/index");

describe("User Repository Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Felhasznalo.destroy({ where: {}, cascade: true });
  });

  test("should create and find a User", async () => {
    const data = {
      name: "Test User",
      email: "test@example.com",
      password: "password123"
    };

    const created = await db.Felhasznalo.create(data);
    const found = await db.Felhasznalo.findByPk(created.user_id);

    expect(created.user_id).toBeDefined();
    expect(found.name).toBe(data.name);
    expect(found.email).toBe(data.email);
  });

  test("should find User by email", async () => {
    await db.Felhasznalo.create({
      name: "User 1",
      email: "user1@example.com",
      password: "password"
    });

    const found = await db.Felhasznalo.findOne({ where: { email: "user1@example.com" } });
    expect(found).toBeDefined();
    expect(found.name).toBe("User 1");
  });
});
