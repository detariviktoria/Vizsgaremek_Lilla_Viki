jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production';

describe("Kupon API Tests", () => {
    let userToken;
    let userId;

    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        const user = await db.Felhasznalo.create({ 
            name: "CouponUser", 
            email: "coupon@test.com", 
            password: "password" 
        });
        userId = user.user_id;
        userToken = jwt.sign(
            { id: userId, username: user.name, isAdmin: false },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
    });

    afterEach(async () => {
        await db.Meghivo.destroy({ where: {} });
        await db.Kupon.destroy({ where: {} });
    });

    test("GET /coupons/user/:userId should return user coupons from invites", async () => {
        await db.Meghivo.create({
            kuldo_id: userId,
            email: "friend@test.com",
            kupon_kod: "TEST-KOD-123",
            elfogadva: true,
            elfogadva_datum: new Date(),
            lejarat_datum: new Date(Date.now() + 86400000)
        });

        const res = await request(app)
            .get(`/coupons/user/${userId}`)
            .set("Authorization", `Bearer ${userToken}`);
        
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].kod).toBe("TEST-KOD-123");
    });

    test("GET /kuponok should return all coupons", async () => {
        await db.Kupon.create({
            coupon_code: "GENERIC-10",
            discount: 10,
            user_id: userId,
            status: "active"
        });

        const res = await request(app).get("/kuponok");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test("GET /kuponok/:id should return one coupon", async () => {
        const k = await db.Kupon.create({
            coupon_code: "ONE-20",
            discount: 20,
            user_id: userId,
            status: "active"
        });

        const res = await request(app).get(`/kuponok/${k.coupon_id}`);
        expect(res.status).toBe(200);
        expect(res.body.coupon_code).toBe("ONE-20");
    });

    test("POST /kuponok should create a coupon", async () => {
        const res = await request(app).post("/kuponok").send({
            coupon_code: "NEW-30",
            discount: 30,
            user_id: userId,
            status: "active"
        });
        expect(res.status).toBe(201);
        expect(res.body.kupon.coupon_code).toBe("NEW-30");
    });

    test("PUT /kuponok/:id should update a coupon", async () => {
        const k = await db.Kupon.create({
            coupon_code: "OLD",
            discount: 5,
            user_id: userId,
            status: "active"
        });

        const res = await request(app).put(`/kuponok/${k.coupon_id}`).send({
            coupon_code: "UPDATED"
        });
        expect(res.status).toBe(200);
        expect(res.body.kupon.coupon_code).toBe("UPDATED");
    });

    test("DELETE /kuponok/:id should delete a coupon", async () => {
        const k = await db.Kupon.create({
            coupon_code: "TO-DEL",
            discount: 5,
            user_id: userId,
            status: "active"
        });

        const res = await request(app).delete(`/kuponok/${k.coupon_id}`);
        expect(res.status).toBe(200);
        const found = await db.Kupon.findByPk(k.coupon_id);
        expect(found).toBeNull();
    });
});
