const db = require("../api/db/__mocks__/index");

describe("Kedvenc Repository Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("should add and find a Kedvenc", async () => {
    const user = await db.Felhasznalo.create({ name: "U", email: "u1@u.com", password: "p" });
    const ajandek = await db.Ajandek.create({ nev: "A", ar: 10, kategoria: "tárgy" });
    
    await db.Felhasznalo_KedvencAjandek.create({ user_id: user.user_id, ajandek_id: ajandek.id });
    
    const favorites = await user.getKedvencAjandekok();
    expect(favorites.length).toBe(1);
    expect(favorites[0].nev).toBe("A");
  });
});
