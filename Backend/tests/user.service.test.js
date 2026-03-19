const db = require('../api/db/__mocks__/index');
jest.mock('../config/db', () => require('../api/db/__mocks__/index'));

const userService = require('../api/services/userService');

describe("User Service Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Felhasznalo.destroy({ where: {}, cascade: true });
  });

  test("should create a user via service", async () => {
    const data = { name: "Service User", email: "service@example.com", password: "password" };
    const result = await userService.create(data);
    expect(result.name).toBe(data.name);
    const found = await db.Felhasznalo.findByPk(result.user_id);
    expect(found).toBeDefined();
  });

  test("should throw error if user not found on getById", async () => {
    await expect(userService.getById(999)).rejects.toThrow("Felhasználó nem található");
  });

  test("should return all users without password", async () => {
      await db.Felhasznalo.create({ name: "A", email: "a@a.com", password: "pw" });
      const result = await userService.getAll();
      expect(result.length).toBe(1);
      expect(result[0].password).toBeUndefined();
  });
});
