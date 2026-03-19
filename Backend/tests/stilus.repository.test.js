const db = require("../api/db/__mocks__/index");

describe("Stílus Repository Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Stilus.destroy({ where: {} });
  });

  test("should create and find a Stílus", async () => {
    const data = { nev: "Modern" };
    const created = await db.Stilus.create(data);
    const found = await db.Stilus.findByPk(created.id);
    expect(found.nev).toBe(data.nev);
  });
});
