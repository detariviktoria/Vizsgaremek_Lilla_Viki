jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Stílusok API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.Stilus.destroy({ where: {} });
    });

    describe("GET /stilusok", () => {
        test("should return all styles", async () => {
            await db.Stilus.create({ nev: "Modern" });
            const res = await request(app).get("/stilusok");
            expect(res.status).toBe(200);
            expect(res.body[0].nev).toBe("Modern");
        });
    });

    describe("POST /stilusok", () => {
        test("should create a style", async () => {
            const res = await request(app).post("/stilusok").send({ nev: "Retro" });
            expect(res.status).toBe(201);
            expect(res.body.nev).toBe("Retro");
        });
    });

    describe("DELETE /stilusok/:id", () => {
        test("should delete a style", async () => {
            const item = await db.Stilus.create({ nev: "Törlendő" });
            const res = await request(app).delete(`/stilusok/${item.id}`);
            expect(res.status).toBe(200);
            const found = await db.Stilus.findByPk(item.id);
            expect(found).toBeNull();
        });
    });
});
