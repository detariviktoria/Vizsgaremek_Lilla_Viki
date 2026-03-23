jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Elozmenyek API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.Felhasznalo_AjandekElozmeny.destroy({ where: {} });
        await db.Ajandek.destroy({ where: {}, cascade: true });
        await db.Felhasznalo.destroy({ where: {}, cascade: true });
    });

    test("GET /elozmenyek/:userId should return history", async () => {
        const user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
        const gift = await db.Ajandek.create({ nev: "G", ar: 100, kategoria: "tárgy" });
        await user.addElozmenyek(gift, { through: { keresesi_ido: new Date() } });

        const res = await request(app).get(`/elozmenyek/${user.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].nev).toBe("G");
    });

    test("POST /elozmenyek/:userId should add history", async () => {
        const user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
        const gift = await db.Ajandek.create({ nev: "G", ar: 100, kategoria: "tárgy" });

        const res = await request(app).post(`/elozmenyek/${user.user_id}`).send({
            ajandek_id: gift.id
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Előzmény hozzáadva");
    });

    test("GET /elozmenyek/:userId should return 404 if user not found", async () => {
        const res = await request(app).get("/elozmenyek/999");
        expect(res.status).toBe(404);
    });
});
