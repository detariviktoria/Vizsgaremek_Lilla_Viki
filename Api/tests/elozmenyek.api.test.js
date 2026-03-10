jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Előzmények API Tests", () => {
    let user, ajandek;
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
        ajandek = await db.Ajandek.create({ nev: "A", ar: 10, kategoria: "tárgy" });
    });

    test("POST /elozmenyek/:userId should add an history entry", async () => {
        const res = await request(app).post(`/elozmenyek/${user.user_id}`).send({ ajandek_id: ajandek.id });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Előzmény hozzáadva");
    });

    test("GET /elozmenyek/:userId should return history", async () => {
        const res = await request(app).get(`/elozmenyek/${user.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });
});
