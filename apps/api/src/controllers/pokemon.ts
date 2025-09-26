import { PokemonService } from "../services/pokemon";
import { Request, Response } from "express";

export class PokemonController {
  private pokemonService: PokemonService;
  private static instance: PokemonController;

  constructor() {
    this.pokemonService = PokemonService.getInstance();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    // Logic to get all Pokémon
    const pokemons = await this.pokemonService.getAllPokemons();
    return res.json(pokemons);
  }

  getById(req: Request, res: Response) {
    // Logic to get a Pokémon by ID
    const id = parseInt(req.params.id, 10);
    return this.pokemonService.getPokemonById(id).then((pokemon) => res.json(pokemon));
  }

  create(req: Request, res: Response) {
    // Logic to create a new Pokémon
  }
}
