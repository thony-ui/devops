import request from "supertest";
import { app, server } from "../../../test-app";
import dotenv from "dotenv";
import { seedDatabase } from "../../../seed/seed";
import { disconnectFromMongo } from "../../../db/mongo";

dotenv.config();

// dummy content
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeAll(async () => {
  await sleep(2000);
  await seedDatabase(); // Seed the database before the test
});

afterAll(() => {
  disconnectFromMongo();
  server.close();
});
describe("MongoTest API", () => {
  it("should return 200 for the base route", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
  });
  it("should return 200 and an array of students", async () => {
    const res = await request(app).get("/mongo-test/students");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
