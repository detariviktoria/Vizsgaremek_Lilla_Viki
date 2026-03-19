jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Célcsoportok API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.Celcsoport.destroy({ where: {} });
    });

    describe("GET /celcsoportok", () => {
        test("should return all target groups", async () => {
            await db.Celcsoport.create({ nev: "Nők" });
            const res = await request(app).get("/celcsoportok");
            expect(res.status).toBe(200);
            expect(res.body[0].nev).toBe("Nők");
        });
    });

    describe("POST /celcsoportok", () => {
        test("should create a target group", async () => {
            const res = await request(app).post("/celcsoportok").send({ nev: "Férfiak" });
            expect(res.status).toBe(201);
            expect(res.body.nev).toBe("Férfiak");
        });
    });

    describe("DELETE /celcsoportok/:id", () => {
        test("should delete a target group", async () => {
            const item = await db.Celcsoport.create({ nev: "Törlendő" });
            const res = await request(app).delete(`/celcsoportok/${item.id}`);
            expect(res.status).toBe(200);
            const found = await db.Celcsoport.findByPk(item.id);
            expect(found).toBeNull();
        });
    });
});
