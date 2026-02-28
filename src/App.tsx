import "./App.css";
import Filters from "./components/Filters/Filters";
import Header from "./components/Header/Header";
import { PokemonGrid } from "./components/PokemonGrid/PokemonGrid";
import { PokemonProvider } from "./context/PokemonContext";

function App() {
  return (
    <PokemonProvider>
      <Header />
      <Filters />
      <PokemonGrid />
    </PokemonProvider>
  );
}

export default App;
