jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

// Mock auth middleware
jest.mock("../api/middlewares/auth", () => (req, res, next) => {
    req.user = { id: 1, username: "user", role: "user" };
    next();
});

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Kedvencek API Tests", () => {
    let user, ajandek;
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
        ajandek = await db.Ajandek.create({ nev: "A", ar: 10, kategoria: "tárgy" });
    });

    test("POST /kedvencek/:userId should add a favorite", async () => {
        const res = await request(app).post(`/kedvencek/${user.user_id}`).send({ ajandek_id: ajandek.id });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Kedvenc hozzáadva");
    });

    test("GET /kedvencek/:userId should return favorites", async () => {
        const res = await request(app).get(`/kedvencek/${user.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });
});
