import React, { useState, useRef } from "react";

const App = (props: any) => {
  const { name: userName, numberOfPokemons } = props;
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState();
  const inputRef = useRef<any>();

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

  const onSearchClick = (): void => {
    const inputValue = inputRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(res => {
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
  const addNumbers = (a: number, b: number): number => {
    return a + b;
  };

  return (
    <div>
      <p>
        User {userName}{" "}
        {numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}
      </p>
      <input type="text" ref={inputRef} />
      <button onClick={onSearchClick} className="my-button">
        Search
      </button>
      {resultMarkup}
    </div>
  );
};

export default App;
