import express from "express";
import cors from "cors";
import { testConnection } from "./db";
import { apiRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./env";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", apiRoutes);

// Health check
app.get("/health/db", async (req, res) => {
  const isConnected = await testConnection();
  res.json({
    status: isConnected ? "connected" : "disconnected",
    database: "MySQL with Drizzle ORM",
  });
});

// Error handling
app.use(errorHandler);

app.listen(env.PORT, async () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
  await testConnection();
});
