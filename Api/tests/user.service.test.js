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

  test("should get user by id without password", async () => {
    const user = await db.Felhasznalo.create({ name: "B", email: "b@b.com", password: "pw" });
    const result = await userService.getById(user.user_id);
    expect(result.name).toBe("B");
    expect(result.password).toBeUndefined();
  });

  test("should update user", async () => {
    const user = await db.Felhasznalo.create({ name: "C", email: "c@c.com", password: "pw" });
    const result = await userService.update(user.user_id, { name: "C Updated" });
    expect(result.name).toBe("C Updated");
  });

  test("should delete user", async () => {
    const user = await db.Felhasznalo.create({ name: "D", email: "d@d.com", password: "pw" });
    const result = await userService.delete(user.user_id);
    expect(result).toBe(true);
    const found = await db.Felhasznalo.findByPk(user.user_id);
    expect(found).toBeNull();
  });

  test("should throw error if user not found on update", async () => {
    await expect(userService.update(999, { name: "X" })).rejects.toThrow("Felhasználó nem található");
  });

  test("should throw error if user not found on delete", async () => {
    await expect(userService.delete(999)).rejects.toThrow("Felhasználó nem található");
  });
});
