const db = require("../api/db/__mocks__/index");

describe("Előzmény Repository Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("should add and find an Előzmény", async () => {
    const user = await db.Felhasznalo.create({ name: "U", email: "u2@u.com", password: "p" });
    const ajandek = await db.Ajandek.create({ nev: "A", ar: 10, kategoria: "tárgy" });
    
    await db.Felhasznalo_AjandekElozmeny.create({ user_id: user.user_id, ajandek_id: ajandek.id });
    
    const history = await user.getElozmenyek();
    expect(history.length).toBe(1);
    expect(history[0].nev).toBe("A");
  });
});
