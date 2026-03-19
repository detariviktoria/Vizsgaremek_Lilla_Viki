jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");

describe("Chat API Tests", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await db.ChatMessage.destroy({ where: {}, cascade: true });
        await db.Felhasznalo.destroy({ where: {}, cascade: true });
    });

    test("POST /chat/send should send a message", async () => {
        const user1 = await db.Felhasznalo.create({ name: "U1", email: "u1@t.com", password: "pw" });
        const user2 = await db.Felhasznalo.create({ name: "U2", email: "u2@t.com", password: "pw" });
        
        const res = await request(app).post("/chat/send").send({
            from_user_id: user1.user_id,
            to_user_id: user2.user_id,
            message: "Hello"
        });
        
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Hello");
    });

    test("GET /chat/history/:user1Id/:user2Id should return history", async () => {
        const user1 = await db.Felhasznalo.create({ name: "U1", email: "u1@t.com", password: "pw" });
        const user2 = await db.Felhasznalo.create({ name: "U2", email: "u2@t.com", password: "pw" });
        
        await db.ChatMessage.create({
            from_user_id: user1.user_id,
            to_user_id: user2.user_id,
            message: "Hi"
        });

        const res = await request(app).get(`/chat/history/${user1.user_id}/${user2.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].message).toBe("Hi");
    });

    test("GET /chat/unread/:userId should return unread count", async () => {
        const user1 = await db.Felhasznalo.create({ name: "U1", email: "u1@t.com", password: "pw" });
        const user2 = await db.Felhasznalo.create({ name: "U2", email: "u2@t.com", password: "pw" });
        
        await db.ChatMessage.create({
            from_user_id: user1.user_id,
            to_user_id: user2.user_id,
            message: "Unread"
        });

        const res = await request(app).get(`/chat/unread/${user2.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body.unreadCount).toBe(1);
    });

    test("POST /chat/read should mark messages as read", async () => {
        const user1 = await db.Felhasznalo.create({ name: "U1", email: "u1@t.com", password: "pw" });
        const user2 = await db.Felhasznalo.create({ name: "U2", email: "u2@t.com", password: "pw" });
        
        await db.ChatMessage.create({
            from_user_id: user1.user_id,
            to_user_id: user2.user_id,
            message: "Unread"
        });

        const res = await request(app).post("/chat/read").send({
            fromUserId: user1.user_id,
            toUserId: user2.user_id
        });
        
        expect(res.status).toBe(200);
        const count = await db.ChatMessage.count({ where: { is_read: false } });
        expect(count).toBe(0);
    });

    test("POST /chat/send should return 400 for missing fields", async () => {
        const res = await request(app).post("/chat/send").send({});
        expect(res.status).toBe(400);
    });

    test("GET /chat/unread-senders/:userId should return senders", async () => {
        const user1 = await db.Felhasznalo.create({ name: "U1", email: "u1@t.com", password: "pw" });
        const user2 = await db.Felhasznalo.create({ name: "U2", email: "u2@t.com", password: "pw" });
        
        await db.ChatMessage.create({
            from_user_id: user1.user_id,
            to_user_id: user2.user_id,
            message: "Unread"
        });

        const res = await request(app).get(`/chat/unread-senders/${user2.user_id}`);
        expect(res.status).toBe(200);
        expect(res.body).toContain(user1.user_id);
    });
});
