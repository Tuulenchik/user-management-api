"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConnection_1 = require("../models/mongoConnection");
const users_model_mongo_1 = require("../models/users.model.mongo");
jest.setTimeout(20000); // mongo can be slow on CI / first connect
beforeAll(async () => {
    await (0, mongoConnection_1.mongoConnect)();
});
beforeEach(async () => {
    await users_model_mongo_1.User.deleteMany({});
});
afterAll(async () => {
    await mongoose_1.default.disconnect();
});
async function registerUser(params) {
    return (0, supertest_1.default)(app_1.default).post("/auth/register").send(params);
}
async function loginUser(params) {
    return (0, supertest_1.default)(app_1.default).post("/auth/login").send(params);
}
describe("Auth + Users protection", () => {
    test("GET /users without token -> 401", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/users");
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
    });
    test("GET /users/:id as self -> 200", async () => {
        // register u1 and u2
        await registerUser({ email: "u1@test.com", password: "Password123!", name: "UserOne" });
        await registerUser({ email: "u2@test.com", password: "Password123!", name: "UserTwo" });
        const u1 = await users_model_mongo_1.User.findOne({ email: "u1@test.com" });
        expect(u1).toBeTruthy();
        const login = await loginUser({ email: "u1@test.com", password: "Password123!" });
        const token = login.body.token;
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/users/${String(u1._id)}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id", String(u1._id));
        expect(res.body).toHaveProperty("email", "u1@test.com");
    });
    test("GET /users/:id as non-admin for someone else -> 403", async () => {
        await registerUser({ email: "u1@test.com", password: "Password123!", name: "UserOne" });
        await registerUser({ email: "u2@test.com", password: "Password123!", name: "UserTwo" });
        const u2 = await users_model_mongo_1.User.findOne({ email: "u2@test.com" });
        expect(u2).toBeTruthy();
        const login = await loginUser({ email: "u1@test.com", password: "Password123!" });
        const token = login.body.token;
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/users/${String(u2._id)}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
    });
    test("PATCH /users/:id as self -> 200 (can change name)", async () => {
        await registerUser({ email: "u1@test.com", password: "Password123!", name: "UserOne" });
        const u1 = await users_model_mongo_1.User.findOne({ email: "u1@test.com" });
        expect(u1).toBeTruthy();
        const login = await loginUser({ email: "u1@test.com", password: "Password123!" });
        const token = login.body.token;
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/users/${String(u1._id)}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "NewName" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("name", "NewName");
    });
    test("PATCH /users/:id as self trying to change role -> 403", async () => {
        await registerUser({ email: "u1@test.com", password: "Password123!", name: "UserOne" });
        const u1 = await users_model_mongo_1.User.findOne({ email: "u1@test.com" });
        expect(u1).toBeTruthy();
        const login = await loginUser({ email: "u1@test.com", password: "Password123!" });
        const token = login.body.token;
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/users/${String(u1._id)}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ role: "admin" });
        expect(res.status).toBe(403);
    });
    test("Register + Login -> returns token", async () => {
        const email = "user@test.com";
        const password = "Password123!";
        const name = "UserOne"; // IMPORTANT: no digits if your schema forbids numbers in name
        const reg = await registerUser({ email, password, name });
        expect(reg.status).toBe(201);
        const login = await loginUser({ email, password });
        expect(login.status).toBe(200);
        expect(login.body).toHaveProperty("token");
        expect(typeof login.body.token).toBe("string");
        expect(login.body.token.length).toBeGreaterThan(10);
        expect(login.body).toHaveProperty("user");
        expect(login.body.user).toHaveProperty("email", email.toLowerCase());
        expect(login.body.user).not.toHaveProperty("passwordHash"); // DTO must hide it
    });
    test("GET /users with token -> 200 + array", async () => {
        // seed DB by registering 2 users
        const r1 = await registerUser({
            email: "u1@test.com",
            password: "Password123!",
            name: "UserOne",
        });
        expect(r1.status).toBe(201);
        const r2 = await registerUser({
            email: "u2@test.com",
            password: "Password123!",
            name: "UserTwo",
        });
        expect(r2.status).toBe(201);
        // login u1 and call protected route
        const login = await loginUser({ email: "u1@test.com", password: "Password123!" });
        expect(login.status).toBe(200);
        const token = login.body.token;
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
        // quick shape check
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("email");
        expect(res.body[0]).toHaveProperty("role");
    });
    test("DELETE /users/:id as normal user -> 403", async () => {
        // create two normal users
        const r1 = await registerUser({
            email: "u1@test.com",
            password: "Password123!",
            name: "UserOne",
        });
        expect(r1.status).toBe(201);
        const r2 = await registerUser({
            email: "u2@test.com",
            password: "Password123!",
            name: "UserTwo",
        });
        expect(r2.status).toBe(201);
        // find u2 id from DB
        const u2 = await users_model_mongo_1.User.findOne({ email: "u2@test.com" });
        expect(u2).toBeTruthy();
        // login as u1 (normal user)
        const login = await loginUser({ email: "u1@test.com", password: "Password123!" });
        expect(login.status).toBe(200);
        const token = login.body.token;
        // try delete u2 as non-admin
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/users/${String(u2._id)}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty("message");
    });
});
//# sourceMappingURL=users.controller.test.js.map