import { Router } from "express";
import { PokemonController } from "../controllers/pokemon";

const router = Router();
const pokemonController = new PokemonController();

router.get("/", async (req, res, next) => {
	try {
		await pokemonController.getAll(req, res);
	} catch (err) {
		next(err);
	}
});
router.get("/:id", async (req, res, next) => {
	try {
		await pokemonController.getById(req, res);
	} catch (err) {
		next(err);
	}
});
router.post("/", async (req, res, next) => {
	try {
		await pokemonController.create(req, res);
	} catch (err) {
		next(err);
	}
});

export { router as pokemonRoutes };
