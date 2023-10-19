import { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export function usePokemonContext() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PokemonContext.Provider value={{ pokemonData, setPokemonData, currentPage, setCurrentPage }}>
      {children}
    </PokemonContext.Provider>
  );
}
