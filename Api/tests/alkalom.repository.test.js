const db = require("../api/db/__mocks__/index");

describe("Alkalom Repository Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Alkalom.destroy({ where: {} });
  });

  test("should create and find an Alkalom", async () => {
    const data = { nev: "Születésnap" };
    const created = await db.Alkalom.create(data);
    const found = await db.Alkalom.findByPk(created.id);
    expect(found.nev).toBe(data.nev);
  });
});
