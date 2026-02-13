jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Alkalmak API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.Alkalom.destroy({ where: {} });
    });

    describe("GET /alkalmak", () => {
        test("should return all occasions", async () => {
            await db.Alkalom.create({ nev: "Karácsony" });
            const res = await request(app).get("/alkalmak");
            expect(res.status).toBe(200);
            expect(res.body[0].nev).toBe("Karácsony");
        });
    });

    describe("POST /alkalmak", () => {
        test("should create an occasion", async () => {
            const res = await request(app).post("/alkalmak").send({ nev: "Húsvét" });
            expect(res.status).toBe(201);
            expect(res.body.nev).toBe("Húsvét");
        });
    });

    describe("DELETE /alkalmak/:id", () => {
        test("should delete an occasion", async () => {
            const item = await db.Alkalom.create({ nev: "Törlendő" });
            const res = await request(app).delete(`/alkalmak/${item.id}`);
            expect(res.status).toBe(200);
            const found = await db.Alkalom.findByPk(item.id);
            expect(found).toBeNull();
        });
    });
});
