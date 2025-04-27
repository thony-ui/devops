import request from "supertest";
import { app, server } from "../../../test-app";
import { Server } from "http";
import dotenv from "dotenv";
import { seedDatabase } from "../../../seed/seed";

dotenv.config();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeAll(async () => {
  await sleep(2000);
  await seedDatabase(); // Seed the database before the test
});

afterAll(() => {
  server.close();
});
describe("MongoTest API", () => {
  describe("GET /", () => {
    it("should return 200 for the base route", async () => {
      const res = await request(app).get("/");

      expect(res.status).toBe(200);
    });
  });
  it("should return 200 and an array of students", async () => {
    const res = await request(app).get("/mongo-test/students");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
