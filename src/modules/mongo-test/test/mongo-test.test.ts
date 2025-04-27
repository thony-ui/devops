import request from "supertest";
import { app, startServer } from "../../../test-app";
import { Server } from "http";
import dotenv from "dotenv";

dotenv.config();
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
process.env.MONGO_DB = process.env.MONGO_DB || "testDB";
let server: Server;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeAll(async () => {
  server = await startServer(); // wait until server actually starts
  await sleep(500);
});

afterAll(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) return reject(err);
        resolve(null);
      });
    });
  }
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
