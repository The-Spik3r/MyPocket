import express, { Request, Response } from "express";
import { testConnection } from "./db";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/health/db", async (req: Request, res: Response) => {
  const isConnected = await testConnection();
  res.json({
    status: isConnected ? "connected" : "disconnected",
    database: "MySQL with Drizzle ORM",
  });
});

// Probar la conexión al iniciar el servidor
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  await testConnection();
});
