import { Router } from "express";
import { pokemonRoutes } from "./pokemon";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
router.use("/pokemon", pokemonRoutes);

export { router as apiRoutes };
