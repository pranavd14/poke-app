// src/App.js
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Pokémon data from the API
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();

      // Fetch details for each Pokémon
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );

      setPokemon(pokemonData);
    };

    fetchPokemon();
  }, []);

  // Filter Pokémon based on the search term
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon App</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="card-container">
        {filteredPokemon.map((poke, index) => (
          <PokemonCard key={index} name={poke.name} image={poke.image} />
        ))}
      </div>
    </div>
  );
};

export default App;
