const db = require("../api/db/__mocks__/index");

describe("Célcsoport Repository Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Celcsoport.destroy({ where: {} });
  });

  test("should create and find a Célcsoport", async () => {
    const data = { nev: "Férfiak" };
    const created = await db.Celcsoport.create(data);
    const found = await db.Celcsoport.findByPk(created.id);
    expect(found.nev).toBe(data.nev);
  });
});
