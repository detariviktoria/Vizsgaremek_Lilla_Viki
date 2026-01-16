const db = require("../api/db/__mocks__/index");

describe("Ajándék Repository Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Ajandek.destroy({ where: {} });
  });

  test("should create and find an Ajandek", async () => {
    //#region Arrange
    const data = {
      nev: "Repository teszt",
      ar: 1000,
      kategoria: "tárgy",
    };
    //#endregion

    //#region Act
    const created = await db.Ajandek.create(data);
    const found = await db.Ajandek.findByPk(created.id);
    //#endregion

    //#region Assert
    expect(created.id).toBeDefined();
    expect(found).toMatchObject(data);
    //#endregion
  });

  test("should find Ajandek by category", async () => {
    //#region Arrange
    const ajandekok = [
        { nev: "Tárgy 1", ar: 1000, kategoria: "tárgy" },
        { nev: "Élmény 1", ar: 2000, kategoria: "élmény" }
    ];
    await db.Ajandek.bulkCreate(ajandekok);
    //#endregion

    //#region Act
    const targyak = await db.Ajandek.findAll({ where: { kategoria: "tárgy" } });
    //#endregion

    //#region Assert
    expect(targyak.length).toBe(1);
    expect(targyak[0].nev).toBe("Tárgy 1");
    //#endregion
  });
});
