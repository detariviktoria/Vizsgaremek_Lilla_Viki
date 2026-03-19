jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Kedvencek API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.Felhasznalo_KedvencAjandek.destroy({ where: {} });
        await db.Ajandek.destroy({ where: {}, cascade: true });
        await db.Felhasznalo.destroy({ where: {}, cascade: true });
    });

    test("GET /kedvencek/:userId should return favorites", async () => {
        const user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
        const gift = await db.Ajandek.create({ nev: "G", ar: 100, kategoria: "tárgy" });
        await user.addKedvencAjandekok(gift);

        const res = await request(app).get(`/kedvencek/${user.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].nev).toBe("G");
    });

    test("POST /kedvencek/:userId should add favorite", async () => {
        const user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
        const gift = await db.Ajandek.create({ nev: "G", ar: 100, kategoria: "tárgy" });

        const res = await request(app).post(`/kedvencek/${user.user_id}`).send({
            ajandek_id: gift.id
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Kedvenc hozzáadva");
    });

    test("DELETE /kedvencek/:userId/:ajandekId should remove favorite", async () => {
        const user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
        const gift = await db.Ajandek.create({ nev: "G", ar: 100, kategoria: "tárgy" });
        await user.addKedvencAjandekok(gift);

        const res = await request(app).delete(`/kedvencek/${user.user_id}/${gift.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Kedvenc törölve");
    });
});
