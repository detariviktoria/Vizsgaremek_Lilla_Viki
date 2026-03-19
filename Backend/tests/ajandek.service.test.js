const db = require('../api/db/__mocks__/index');
// Mocking config/db to use the mock db
jest.mock('../config/db', () => require('../api/db/__mocks__/index'));

const ajandekService = require('../api/services/ajandekService');

describe("Ajándék Service Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.Ajandek.destroy({ where: {} });
  });

  test("should create a gift via service", async () => {
    //#region Arrange
    const data = { nev: "Service Gift", ar: 100, kategoria: "tárgy" };
    //#endregion

    //#region Act
    const result = await ajandekService.create(data);
    //#endregion

    //#region Assert
    expect(result.nev).toBe(data.nev);
    const found = await db.Ajandek.findByPk(result.id);
    expect(found).toBeDefined();
    //#endregion
  });

  test("should throw error if gift not found on getById", async () => {
    //#region Act & Assert
    await expect(ajandekService.getById(999)).rejects.toThrow("Ajándék nem található");
    //#endregion
  });

  test("should return all gifts", async () => {
      //#region Arrange
      const ajandekok = [
          { nev: "A", ar: 10, kategoria: "tárgy" },
          { nev: "B", ar: 20, kategoria: "élmény" }
      ];
      await db.Ajandek.bulkCreate(ajandekok);
      //#endregion

      //#region Act
      const result = await ajandekService.getAll();
      //#endregion

      //#region Assert
      expect(result.length).toBe(2);
      expect(result).toMatchObject(ajandekok);
      //#endregion
  });
});
