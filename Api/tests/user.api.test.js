jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("User API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.Felhasznalo.destroy({ where: {}, cascade: true });
    });

    test("GET /users should return all users", async () => {
        await db.Felhasznalo.create({ name: "Admin", email: "admin@test.com", password: "pw" });
        const res = await request(app).get("/users");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Admin");
    });

    test("POST /users should create a user", async () => {
        const newUser = { name: "New User", email: "new@test.com", password: "password" };
        const res = await request(app).post("/users").send(newUser);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Felhasználó létrehozva!");
    });
});
