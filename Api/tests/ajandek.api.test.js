jest.mock("../api/db");
// A biztonság kedvéért a config/db-t is mockoljuk, mivel az app azt használja
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");
const jwt = require("jsonwebtoken");

const TEST_JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key-change-this-in-production";

function adminAuthHeader() {
    const token = jwt.sign({ id: 1, username: "Admin", role: "admin" }, TEST_JWT_SECRET, { expiresIn: "2h" });
    return { Authorization: `Bearer ${token}` };
}

describe("API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync();
    });

    describe("/ajandekok", () => {
        const ajandekok = [
            { nev: "Ajándék A", ar: 1000, kategoria: "tárgy" },
            { nev: "Ajándék B", ar: 2000, kategoria: "élmény" },
            { nev: "Ajándék C", ar: 3000, kategoria: "tárgy" },
        ];

        beforeEach(async () => {
            await db.Ajandek.bulkCreate(ajandekok);
        });

        afterEach(async () => {
            await db.Ajandek.destroy({ where: {} });
        });

        describe("GET", () => {
            test("should return all the gifts", async () => {
                const res = await request(app).get("/ajandekok")
                    .set("Accept", "application/json");
                
                expect(res.status).toBe(200);
                expect(res.type).toMatch(/json/);
                expect(res.body).toMatchObject(ajandekok);
            });

            test("should return gift by id", async () => {
                const all = await db.Ajandek.findAll();
                const target = all[0];
                
                const res = await request(app).get(`/ajandekok/${target.id}`)
                    .set("Accept", "application/json");
                
                expect(res.status).toBe(200);
                expect(res.type).toMatch(/json/);
                expect(res.body.nev).toBe(target.nev);
            });
        });

        describe("POST", () => {
            test("should create a gift", async () => {
                //#region Arrange
                const newAjandek = { nev: "Ajándék D", ar: 4000, kategoria: "élmény" };
                //#endregion

                //#region Act
                const res = await request(app)
                    .post("/ajandekok")
                    .set(adminAuthHeader())
                    .send(newAjandek);
                //#endregion

                //#region Assert
                expect(res.status).toBe(201);
                expect(res.type).toMatch(/json/);
                expect(res.body).toMatchObject(newAjandek);

                const found = await db.Ajandek.findOne({ where: { nev: "Ajándék D" } });
                expect(found).toBeDefined();
                expect(found.nev).toEqual("Ajándék D");
                //#endregion
            });
        });

        describe("DELETE", () => {
            test("should delete gift", async () => {
                const all = await db.Ajandek.findAll();
                const target = all[1]; // Ajándék B
                
                const res = await request(app)
                    .delete(`/ajandekok/${target.id}`)
                    .set(adminAuthHeader());
                
                expect(res.status).toBe(200);
                expect(res.type).toMatch(/json/);
                
                const found = await db.Ajandek.findByPk(target.id);
                expect(found).toBeNull();
                
                const count = await db.Ajandek.count();
                expect(count).toBe(2);
            });
        });
    });
});
