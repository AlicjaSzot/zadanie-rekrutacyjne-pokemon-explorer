import React from "react";
import styles from "./Header.module.scss";
import pokeball from "./../../assets/poke-ball.png";

import { usePokemonContext } from "../../context/PokemonContext";

const Header = () => {
  const { searchQuery, setSearchQuery } = usePokemonContext();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={pokeball} alt="Pokeball" className={styles.icon} />
        <h1>Pokemon Explorer</h1>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokemon..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
