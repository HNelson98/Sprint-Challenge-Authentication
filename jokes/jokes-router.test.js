const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest());
});

test("GET /api/jokes to get all dad jokes, and for the jokes to have an id and a joke", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "Henry", password: "chickennuggets" });
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "Henry", password: "chickennuggets" });
    const res = await request(server)
        .get("/api/jokes")
        .set("authorization", login.body.token)
    // console.log(res)
    expect(res.body).toHaveLength(20)
    expect(res.body[0]).toHaveProperty("id")
    expect(res.body[0]).toHaveProperty("joke")
})