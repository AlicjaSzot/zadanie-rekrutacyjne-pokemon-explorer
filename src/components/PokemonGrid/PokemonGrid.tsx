import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./PokemonGrid.module.scss";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { fetchPokemons } from "../../api/fetchPokemon";
import { usePokemonContext } from "../../context/PokemonContext";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import type { Pokemon } from "../../types/pokemon";

export const PokemonGrid = () => {
  const { searchQuery, selectedTypes } = usePokemonContext();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      queryFn: ({ pageParam = 0 }) => fetchPokemons(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 24 ? allPages.length * 24 : undefined;
      },
    });

  if (isLoading) return <div>Loading...</div>;

  const pokemons = data?.pages.flat() || [];

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTypes =
      selectedTypes.length === 0 ||
      pokemon.types.some((t) => selectedTypes.includes(t.type.name));

    return matchesSearch && matchesTypes;
  });

  return (
    <div className={styles.container}>
      {filteredPokemons.length === 0 && (
        <h2 className={styles.noResults}>0 results...</h2>
      )}

      <div className={styles.grid}>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => setSelectedPokemon(pokemon)}
          />
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.loadMoreBtn}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}

      {selectedPokemon && (
        <Modal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};
