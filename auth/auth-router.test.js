const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest());
});

test("environment test", () => {
    expect(process.env.NODE_ENV).toBe("testing");
});

test("POST /api/auth/register to be successful", async () => {
    const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "Henry", password: "chickennuggets" });
    //console.log(res.body)
    expect(res.status).toBe(201)
    expect(res.body.data.username).toEqual("Henry")
    expect(res.body.data.id).toEqual(1)
})

test("POST /api/auth/login successful", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "Henry", password: "chickennuggets" });
    const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "Henry", password: "chickennuggets" });
    //console.log(res)
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token")
})
