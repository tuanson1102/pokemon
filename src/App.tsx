import { useEffect, useState } from 'react';
import './App.css';



type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=16')
      .then((response) => response.json())
      .then((data) => {
        const datalist = data.results.map((pokemon: { url: string }) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(datalist).then((results) => setPokemons(results));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 


  return (
    <div className="container">
      <div className="heading">
        <div className="heading-info">
          <h2>Pokemon</h2>
          <p>Search for Pokemon by name or using the National Pokemon number</p>
        </div>
        <div className="searching">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input type="text" className='search-input' placeholder='What Pokemon are you looking for?'/>
        </div>
        
      </div>
      
      <div className="pokemon-grid">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <div className="pokemon-types">
                <p>{pokemon.id}</p>
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                {pokemon.types.map((typeInfo, index) => (
                  <span key={index} className={`pokemon-type  ${typeInfo.type.name}`}>{typeInfo.type.name}</span>
                ))}
              </div>

              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
          ))
        ) : null}

      </div>
    </div>
  );
}

export default App
