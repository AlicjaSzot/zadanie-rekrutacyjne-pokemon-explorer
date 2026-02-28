import { createContext, useState, useContext, type ReactNode } from "react";

interface PokemonContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

//CONTEXT
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <PokemonContext.Provider
      value={{ searchQuery, setSearchQuery, selectedTypes, setSelectedTypes }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be in PokemonProvider");
  }
  return context;
};
