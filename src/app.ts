import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { defineMongoDBTestRouter } from "./modules/mongo-test";
import { connectToMongo } from "./db/mongo";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Hello World" });
});

defineMongoDBTestRouter(app);
app.use(errorHandler);

const PORT = process.env.PORT || 9998;

// Wrap startup logic inside an async function

export async function startServer() {
  try {
    await connectToMongo();

    const server = app.listen(PORT, () =>
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

export { app };
