import type { Pokemon } from "../types/pokemon";

export const fetchPokemons = async (offset: number = 0): Promise<Pokemon[]> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`,
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();

    const queryDetails = data.results.map(
      async (pokemon: { name: string; url: string }) => {
        const resDetails = await fetch(pokemon.url);
        if (!resDetails.ok)
          throw new Error(`Error fetching details for: ${pokemon.name}`);
        return resDetails.json();
      },
    );

    const pokemonDetails = await Promise.all(queryDetails);

    return pokemonDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
