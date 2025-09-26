import axios, { AxiosInstance } from "axios";
import { db } from "../db";
import { pokemonSchema } from "../db/models";
import { and } from "drizzle-orm";

export class PokemonRepository {
  private apiClient: AxiosInstance;
  pokemons: string[] = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle"];

  constructor() {
    // Configuración de la instancia de Axios para futuras llamadas a APIs
    this.apiClient = axios.create({
      baseURL: "https://pokeapi.co/api/v2/pokemon/", // API de ejemplo, puedes cambiarla
      timeout: 10000, // 10 segundos de timeout
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Interceptor para manejo de respuestas
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Error en la petición HTTP:", error.message);
        return Promise.reject(error);
      }
    );
  }

  async getAllPokemons() {
    return await db.select().from(pokemonSchema).where(and(pokemonSchema.pkName, "hola"));
  }

  // Método genérico para hacer peticiones GET
  async fetchFromAPI(endpoint: string) {
    try {
      const response = await this.apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Error al realizar petición a ${endpoint}: ${error}`);
    }
  }
}
