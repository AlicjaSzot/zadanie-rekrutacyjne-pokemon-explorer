import styles from "./PokemonCard.module.scss";
import type { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const typeNames = pokemon.types.map((t) => t.type.name);

  const type1 = pokemon.types[0]?.type.name;
  const type2 = pokemon.types[1]?.type.name;

  let backgroundStyle = `var(--color-${type1})`;
  if (type2) {
    backgroundStyle = `linear-gradient(135deg, var(--color-${type1}), var(--color-${type2}))`;
  }

  return (
    <div
      className={styles.card}
      style={{ background: backgroundStyle }}
      onClick={onClick}
    >
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className={styles.image}
      />
      <h2 className={styles.name}>{pokemon.name}</h2>
      <span className={styles.id}>{formattedId}</span>
      <div className={styles.typesContainer}>
        {typeNames.map((type) => (
          <span key={type} className={styles.typePill}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
