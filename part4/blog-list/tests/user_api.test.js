const { test, describe, after } = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const assert = require("node:assert");
const mongoose = require("mongoose");

describe("invalid users cannot be created and suitable status code and error message are returned", () => {
  test("password length must be at least 3 characters", async () => {
    const user = {
      username: "angelivanov",
      name: "Angel Ivanov",
      password: "12",
    };

    const status = await api.post("/api/users").send(user);

    assert.strictEqual(status.status, 400);
    assert.strictEqual(
      status.body.error,
      "password length must be at least 3 characters long"
    );
  });

  test("usename length must be at least 3 characters", async () => {
    const user = {
      username: "an",
      name: "Angel Ivanov",
      password: "123456",
    };

    const status = await api.post("/api/users").send(user);

    assert.strictEqual(status.status, 400);
    assert.strictEqual(
      status.body.error,
      "User validation failed: username: username length must be at least 3 characters long"
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
