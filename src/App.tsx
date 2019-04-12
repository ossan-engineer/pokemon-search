import React, { useState } from "react";

interface User {
  name: string;
  numberOfPokemons?: number;
}

interface Pokemon {
  name: string;
  numberOfAbilites: number;
  baseExperience: string;
  imageUrl: string;
}

const App = (props: User) => {
  const { name: userName, numberOfPokemons } = props;
  const [error, setError] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [input, setInput] = useState<string>("");

  let resultMarkup;
  if (error) {
    resultMarkup = <p>Pokemon not found, please try again</p>;
  } else if (pokemon) {
    resultMarkup = (
      <div>
        <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
        <p>
          {name} has {pokemon.numberOfAbilites} abilities and{" "}
          {pokemon.baseExperience} base experience points
        </p>
      </div>
    );
  }

  const handleInputChange = (e: any): void => {
    setInput(e.target.value);
  };

  const onSearchClick = (e: any): void => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`).then(res => {
      if (res.status !== 200) {
        setError(true);
        return;
      }
      res.json().then(data => {
        setError(false);
        setPokemon({
          name: data.name,
          numberOfAbilites: data.abilities.length,
          baseExperience: data.base_experience,
          imageUrl: data.sprites.front_default
        });
      });
    });
  };

  return (
    <div>
      <p>
        User {userName}{" "}
        {numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}
      </p>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={onSearchClick} className="my-button">
        Search
      </button>
      {resultMarkup}
    </div>
  );
};

export default App;
