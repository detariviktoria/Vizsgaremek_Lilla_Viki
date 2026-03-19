jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production';

describe("Notification API Tests", () => {
    let userToken;
    let userId;

    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        const user = await db.Felhasznalo.create({ 
            name: "NotifUser", 
            email: "notif@test.com", 
            password: "password" 
        });
        userId = user.user_id;
        userToken = jwt.sign(
            { id: userId, username: user.name, isAdmin: false },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
    });

    test("GET /notifications/:userId should return notifications", async () => {
        await db.Notification.create({
            user_id: userId,
            message: "Test notification",
            is_read: false
        });

        const res = await request(app)
            .get(`/notifications/${userId}`)
            .set("Authorization", `Bearer ${userToken}`);
        
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].message).toBe("Test notification");
    });

    test("PUT /notifications/:id/read should mark notification as read", async () => {
        const notif = await db.Notification.create({
            user_id: userId,
            message: "To read",
            is_read: false
        });

        const res = await request(app)
            .put(`/notifications/${notif.id}/read`)
            .set("Authorization", `Bearer ${userToken}`);
        
        expect(res.status).toBe(200);
        const updated = await db.Notification.findByPk(notif.id);
        expect(updated.is_read).toBe(true);
    });

    test("PUT /notifications/all-read/:userId should mark all as read", async () => {
        await db.Notification.create({ user_id: userId, message: "N1", is_read: false });
        await db.Notification.create({ user_id: userId, message: "N2", is_read: false });

        const res = await request(app)
            .put(`/notifications/all-read/${userId}`)
            .set("Authorization", `Bearer ${userToken}`);
        
        expect(res.status).toBe(200);
        const count = await db.Notification.count({ where: { user_id: userId, is_read: false } });
        expect(count).toBe(0);
    });
});
