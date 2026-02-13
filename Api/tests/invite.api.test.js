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
});
