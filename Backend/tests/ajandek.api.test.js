jest.mock("../api/db");
// A biztonság kedvéért a config/db-t is mockoljuk, mivel az app azt használja
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production';

describe("API Tests", () => {
    let adminToken;

    beforeAll(async () => {
        await db.sequelize.sync();
        adminToken = jwt.sign(
            { id: 1, username: "admin", isAdmin: true },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
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

            test("should return 404 if gift not found", async () => {
                const res = await request(app).get("/ajandekok/999");
                expect(res.status).toBe(404);
            });
        });

        describe("GET by criteria", () => {
            test("should get gifts by alkalom", async () => {
                const alkalom = await db.Alkalom.create({ nev: "Szülinap" });
                const gift = await db.Ajandek.create({ nev: "Bday Gift", ar: 100, kategoria: "tárgy" });
                await gift.addAlkalmak(alkalom);

                const res = await request(app).get(`/ajandekok/alkalom/${encodeURIComponent("Szülinap")}`);
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0);
                expect(res.body[0].nev).toBe("Bday Gift");
            });

            test("should get gifts by stilus", async () => {
                const stilus = await db.Stilus.create({ nev: "Modern" });
                const gift = await db.Ajandek.create({ nev: "Modern Gift", ar: 100, kategoria: "tárgy" });
                await gift.addStilusok(stilus);

                const res = await request(app).get(`/ajandekok/stilus/${encodeURIComponent("Modern")}`);
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0);
                expect(res.body[0].nev).toBe("Modern Gift");
            });

            test("should get gifts by celcsoport", async () => {
                const celcsoport = await db.Celcsoport.create({ nev: "Gyerek" });
                const gift = await db.Ajandek.create({ nev: "Kid Gift", ar: 100, kategoria: "tárgy" });
                await gift.addCelcsoportok(celcsoport);

                const res = await request(app).get(`/ajandekok/celcsoport/${encodeURIComponent("Gyerek")}`);
                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThan(0);
                expect(res.body[0].nev).toBe("Kid Gift");
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
                    .set("Authorization", `Bearer ${adminToken}`)
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

            test("should return 401 if not authorized", async () => {
                const res = await request(app).post("/ajandekok").send({ nev: "X" });
                expect(res.status).toBe(401);
            });
        });

        describe("PUT", () => {
            test("should update a gift", async () => {
                const all = await db.Ajandek.findAll();
                const target = all[0];
                
                const res = await request(app)
                    .put(`/ajandekok/${target.id}`)
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({ nev: "Updated Name" });
                
                expect(res.status).toBe(200);
                const updated = await db.Ajandek.findByPk(target.id);
                expect(updated.nev).toBe("Updated Name");
            });

            test("should return 404 if gift not found on update", async () => {
                const res = await request(app)
                    .put("/ajandekok/999")
                    .set("Authorization", `Bearer ${adminToken}`)
                    .send({ nev: "X" });
                expect(res.status).toBe(404);
            });
        });

        describe("DELETE", () => {
            test("should delete gift", async () => {
                const all = await db.Ajandek.findAll();
                const target = all[1]; // Ajándék B
                
                const res = await request(app)
                    .delete(`/ajandekok/${target.id}`)
                    .set("Authorization", `Bearer ${adminToken}`);
                
                expect(res.status).toBe(200);
                expect(res.type).toMatch(/json/);
                
                const found = await db.Ajandek.findByPk(target.id);
                expect(found).toBeNull();
                
                const count = await db.Ajandek.count();
                expect(count).toBe(2);
            });

            test("should return 404 if gift not found on delete", async () => {
                const res = await request(app)
                    .delete("/ajandekok/999")
                    .set("Authorization", `Bearer ${adminToken}`);
                expect(res.status).toBe(404);
            });
        });
    });
});
