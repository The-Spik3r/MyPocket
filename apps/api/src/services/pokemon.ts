import { PokemonRepository } from "../repository/pokemon";
export class PokemonService {
  private static instance: PokemonService;
  private pokemonRepository: PokemonRepository;
  private constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }
    return PokemonService.instance;
  }

  async getAllPokemons() {
    return await this.pokemonRepository.getAllPokemons();
    // Logic to get a Pokémon by ID
  }

  async getPokemonById(id: number) {
    return await this.pokemonRepository.fetchFromAPI(`${id}`);
  }
}
