import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import { PokemonProvider } from "./PokemonContext";
import "./App.css";

function App() {
  return (
    <Router>
      <PokemonProvider>
        <Routes>
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </PokemonProvider>
    </Router>
  );
}

export default App;
