import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { defineStudentRouter } from "./modules/student";
import { Server } from "http";
import { connectToMongo } from "./db/mongo";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello World" });
});

defineStudentRouter(app);
app.use(errorHandler);

const PORT = process.env.PORT || 9998;

// Wrap startup logic inside an async function

let server: Server;
export async function startServer() {
  try {
    await connectToMongo();

    server = app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
    // Optional: export server if needed (for testing)
    return server;
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Exit the app if startup fails
  }
}

// Start the server
startServer();

export { app, server };
