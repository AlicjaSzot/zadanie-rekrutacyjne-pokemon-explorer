import styles from "./Modal.module.scss";
import type { Pokemon } from "../../types/pokemon";

interface ModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export const Modal = ({ pokemon, onClose }: ModalProps) => {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={handleContentClick}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>

        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className={styles.image}
        />
        <h2 className={styles.name}>{pokemon.name}</h2>

        <div className={styles.infoGrid}>
          <div>
            <strong>Wzrost:</strong> {pokemon.height / 10} m
          </div>
          <div>
            <strong>Waga:</strong> {pokemon.weight / 10} kg
          </div>
        </div>

        <h3 className={styles.statsTitle}>Statystyki:</h3>
        <div className={styles.statsContainer}>
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className={styles.statRow}>
              <span className={styles.statName}>{s.stat.name}:</span>
              <span className={styles.statValue}>{s.base_stat}</span>
              <div className={styles.statBarBg}>
                <div
                  className={styles.statBarFill}
                  style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
