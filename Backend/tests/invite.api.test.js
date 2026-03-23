jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));
jest.mock("../api/utilities/emailService", () => ({
    sendEmail: jest.fn().mockResolvedValue(true)
}));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Invite API Tests", () => {
    let user;
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
    });

    afterEach(async () => {
        await db.Meghivo.destroy({ where: {} });
    });

    test("POST /invite should create an invitation", async () => {
        const res = await request(app).post("/invite").send({
            userId: user.user_id,
            email: "friend@test.com"
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Meghívó sikeresen elküldve!");
    });

    test("POST /invite should return 400 if missing fields", async () => {
        const res = await request(app).post("/invite").send({
            userId: user.user_id
        });
        expect(res.status).toBe(400);
    });

    test("POST /invite should return 404 if sender not found", async () => {
        const res = await request(app).post("/invite").send({
            userId: 999,
            email: "x@x.com"
        });
        expect(res.status).toBe(404);
    });

    test("GET /invite/friends/:userId should return invited friends", async () => {
        await db.Meghivo.create({
            kuldo_id: user.user_id,
            email: "friend@test.com",
            elfogadva: false
        });

        const res = await request(app).get(`/invite/friends/${user.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].email).toBe("friend@test.com");
        expect(res.body[0].status).toBe("Függőben");
    });

    test("GET /invite/friends/:userId should return accepted friends", async () => {
        const friend = await db.Felhasznalo.create({ 
            name: "Friend", 
            email: "friend@test.com", 
            password: "p",
            ajanlo_id: user.user_id
        });

        await db.Meghivo.create({
            kuldo_id: user.user_id,
            email: "friend@test.com",
            elfogadva: false
        });

        const res = await request(app).get(`/invite/friends/${user.user_id}`);
        expect(res.status).toBe(200);
        const f = res.body.find(x => x.email === "friend@test.com");
        expect(f.status).toBe("Elfogadva");
    });
});
