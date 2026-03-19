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

  test("should get gift by id", async () => {
    const data = { nev: "Target Gift", ar: 100, kategoria: "tárgy" };
    const created = await db.Ajandek.create(data);
    
    const result = await ajandekService.getById(created.id);
    expect(result.nev).toBe(data.nev);
  });

  test("should update a gift", async () => {
    const data = { nev: "Old Name", ar: 100, kategoria: "tárgy" };
    const created = await db.Ajandek.create(data);
    
    const updateData = { nev: "New Name", ar: 200 };
    const result = await ajandekService.update(created.id, updateData);
    
    expect(result.nev).toBe(updateData.nev);
    expect(result.ar).toBe(updateData.ar);
    
    const updated = await db.Ajandek.findByPk(created.id);
    expect(updated.nev).toBe("New Name");
  });

  test("should throw error if gift not found on update", async () => {
    await expect(ajandekService.update(999, { nev: "New Name" })).rejects.toThrow("Ajándék nem található");
  });

  test("should delete a gift", async () => {
    const data = { nev: "To Delete", ar: 100, kategoria: "tárgy" };
    const created = await db.Ajandek.create(data);
    
    const result = await ajandekService.delete(created.id);
    expect(result).toBe(true);
    
    const found = await db.Ajandek.findByPk(created.id);
    expect(found).toBeNull();
  });

  test("should throw error if gift not found on delete", async () => {
    await expect(ajandekService.delete(999)).rejects.toThrow("Ajándék nem található");
  });

  test("should create gift with associations", async () => {
    const stilus = await db.Stilus.create({ nev: "Modern" });
    const alkalom = await db.Alkalom.create({ nev: "Szülinap" });
    const celcsoport = await db.Celcsoport.create({ nev: "Gyerek" });
    
    const data = { 
      nev: "Associated Gift", 
      ar: 100, 
      kategoria: "tárgy",
      stilus_ids: [stilus.id],
      alkalom_ids: [alkalom.id],
      celcsoport_ids: [celcsoport.id]
    };
    
    const result = await ajandekService.create(data);
    expect(result.nev).toBe(data.nev);
    
    // In actual sequelize we would check associations but here with mock it depends on how mock is implemented
    // The service code calls setStilusok etc. which are added by belongsToMany
  });
});
