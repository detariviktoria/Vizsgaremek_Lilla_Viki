jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Kuponok API Tests", () => {
    let user;
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        user = await db.Felhasznalo.create({ name: "U", email: "u@u.com", password: "p" });
    });

    afterEach(async () => {
        await db.Kupon.destroy({ where: {} });
    });

    describe("GET /kuponok", () => {
        test("should return all coupons", async () => {
            await db.Kupon.create({ user_id: user.user_id, coupon_code: "C1", status: "active", discount: 10 });
            const res = await request(app).get(`/kuponok`);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].coupon_code).toBe("C1");
        });
    });

    describe("POST /kuponok", () => {
        test("should create a coupon", async () => {
            const newKupon = {
                user_id: user.user_id,
                coupon_code: "NEW50",
                status: "active",
                discount: 50
            };
            const res = await request(app).post("/kuponok").send(newKupon);
            expect(res.status).toBe(201);
            expect(res.body.kupon.coupon_code).toBe("NEW50");
        });
    });

    describe("DELETE /kuponok/:id", () => {
        test("should delete a coupon", async () => {
            const item = await db.Kupon.create({ user_id: user.user_id, coupon_code: "DEL", status: "active", discount: 0 });
            const res = await request(app).delete(`/kuponok/${item.coupon_id}`);
            expect(res.status).toBe(200);
            const found = await db.Kupon.findByPk(item.coupon_id);
            expect(found).toBeNull();
        });
    });
});
