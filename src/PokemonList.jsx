import React, { useEffect } from "react";
import { usePokemonContext } from "./PokemonContext";
import "./App.css";

function PokemonList() {
  const { pokemonData, currentPage, setCurrentPage, setPokemonData } = usePokemonContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage - 1) * 10}&limit=10`);
        if (response.ok) {
          const data = await response.json();
          setPokemonData(data.results);
        } else {
          throw new Error("Gagal mengambil data");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchData();
  }, [currentPage, setPokemonData]);


  return (
    <div>
      <h1 id="top">Tugas Modul 5</h1>
      <h3>Kelompok 11</h3>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="pokemon-item">
            {pokemon.name}
          </div>
        ))}
      </div>
      <div  >
        <div className="tombol">
        <button id="tombol1" onClick={() => setCurrentPage(1)}>Halaman 1</button>
        <button id="tombol2" onClick={() => setCurrentPage(2)}>Halaman 2</button>
        </div>
        
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Tugas Modul 5</h1>
  //     <h3>Kelompok 11</h3>
  //     <ul className="pokemon-list">
  //       {pokemonData.map((pokemon, index) => (
  //         <li key={index} className="pokemon-item">
  //           {pokemon.name}
  //         </li>
  //       ))}
  //     </ul>
  //     <div className="pagination">
  //       <button onClick={() => setCurrentPage(1)}>Halaman 1</button>
  //       <button onClick={() => setCurrentPage(2)}>Halaman 2</button>
  //     </div>
  //     </div>
  // );
}

export default PokemonList;
