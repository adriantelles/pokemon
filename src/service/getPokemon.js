import axios from "axios";

export async function fetchPokemon(pokemon) {
  let success = null,
    error = "Not found";
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  try {
    const res = await axios.get(url);
    if (res.data) {
      success = res.data;
      error = null;
    }
  } catch (err) {}
  return {
    success,
    error,
  };
}

export async function fetchAllPokemons(pokemon) {
  let success = null,
    error = "Not found";
  const url = `https://pokeapi.co/api/v2/pokemon?limit=-1`;
  try {
    const res = await axios.get(url);
    if (res.data) {
      success = res.data.results;
      error = null;
    }
  } catch (err) {}
  return {
    success,
    error,
  };
}
