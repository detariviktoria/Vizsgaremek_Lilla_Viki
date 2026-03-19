jest.mock("../api/db");
jest.mock("../config/db", () => require("../api/db"));

const request = require("supertest");
const app = require("../app");
const db = require("../api/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production';

describe("User API Tests", () => {
    let adminToken;
    let userToken;
    let userId;

    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        const admin = await db.Felhasznalo.create({ 
            name: "Admin", 
            email: "admin@test.com", 
            password: "password",
            is_admin: true 
        });
        const user = await db.Felhasznalo.create({ 
            name: "User", 
            email: "user@test.com", 
            password: "password",
            is_admin: false 
        });
        userId = user.user_id;

        adminToken = jwt.sign(
            { id: admin.user_id, username: admin.name, isAdmin: true },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
        userToken = jwt.sign(
            { id: user.user_id, username: user.name, isAdmin: false },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
    });

    afterEach(async () => {
        await db.Felhasznalo.destroy({ where: {}, cascade: true });
    });

    test("GET /users should return all users", async () => {
        const res = await request(app).get("/users");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    test("POST /users should create a user", async () => {
        const newUser = { name: "New User", email: "new@test.com", password: "password" };
        const res = await request(app).post("/users").send(newUser);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Felhasználó létrehozva!");
    });

    test("POST /users/login should return token", async () => {
        const res = await request(app).post("/users/login").send({
            username: "User",
            password: "password"
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.username).toBe("User");
    });

    test("POST /users/login should return 401 for wrong password", async () => {
        const res = await request(app).post("/users/login").send({
            username: "User",
            password: "wrong"
        });
        expect(res.status).toBe(401);
    });

    test("GET /users/:id should return user", async () => {
        const res = await request(app)
            .get(`/users/${userId}`)
            .set("Authorization", `Bearer ${userToken}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("User");
    });

    test("PUT /users/:id should update user", async () => {
        const res = await request(app)
            .put(`/users/${userId}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({ name: "Updated User" });
        expect(res.status).toBe(200);
        expect(res.body.user.name).toBe("Updated User");
    });

    test("PUT /users/:id should return 403 if updating other user", async () => {
        const otherUser = await db.Felhasznalo.create({ name: "Other", email: "other@test.com", password: "password" });
        const res = await request(app)
            .put(`/users/${otherUser.user_id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({ name: "Hacker" });
        expect(res.status).toBe(403);
    });

    test("GET /users/check/session should return session info", async () => {
        const res = await request(app)
            .get("/users/check/session")
            .set("Authorization", `Bearer ${userToken}`);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe("User");
    });

    test("POST /users/forgot-password should send email", async () => {
        const res = await request(app).post("/users/forgot-password").send({
            email: "user@test.com"
        });
        expect(res.status).toBe(200);
    });

    test("POST /users/forgot-password should return 404 if email not found", async () => {
        const res = await request(app).post("/users/forgot-password").send({
            email: "notfound@test.com"
        });
        expect(res.status).toBe(404);
    });

    test("POST /users/reset-password should change password", async () => {
        // First get a token
        await request(app).post("/users/forgot-password").send({ email: "user@test.com" });
        const user = await db.Felhasznalo.findOne({ where: { email: "user@test.com" } });
        
        const res = await request(app).post("/users/reset-password").send({
            token: user.reset_token,
            password: "newpassword"
        });
        expect(res.status).toBe(200);
        
        // Verify login with new password
        const loginRes = await request(app).post("/users/login").send({
            username: "User",
            password: "newpassword"
        });
        expect(loginRes.status).toBe(200);
    });

    test("POST /users/reset-password should return 400 for invalid token", async () => {
        const res = await request(app).post("/users/reset-password").send({
            token: "invalid",
            password: "new"
        });
        expect(res.status).toBe(400);
    });

    test("POST /users/logout should clear cookie", async () => {
        const res = await request(app).post("/users/logout");
        expect(res.status).toBe(200);
    });

    test("PUT /users/:id/admin should update admin status", async () => {
        const res = await request(app)
            .put(`/users/${userId}/admin`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Admin Updated", email: "admin@updated.com" });
        expect(res.status).toBe(200);
    });

    test("PUT /users/:id should return 400 if email change attempted", async () => {
        const res = await request(app)
            .put(`/users/${userId}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({ email: "newemail@test.com" });
        expect(res.status).toBe(400);
    });
});
