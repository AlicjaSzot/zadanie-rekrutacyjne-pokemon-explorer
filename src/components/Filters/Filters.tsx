import React from "react";
import { usePokemonContext } from "../../context/PokemonContext";
import styles from "./Filters.module.scss";

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const Filters = () => {
  const { selectedTypes, setSelectedTypes } = usePokemonContext();

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className={styles.filtersContainer}>
      {POKEMON_TYPES.map((type) => {
        const isSelected = selectedTypes.includes(type);

        return (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={styles.typePill}
            style={{
              backgroundColor: `var(--color-${type})`,
              border: isSelected ? "2px solid white" : "2px solid transparent",
              opacity: isSelected ? 1 : 0.7,
            }}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
};

export default Filters;
