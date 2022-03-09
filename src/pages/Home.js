import { useEffect, useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { fetchPokemon, fetchAllPokemons } from "../service/getPokemon";
import Search from "../components/Search";
import PokemonData from "../components/PokemonInfo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isAllLoading, setIsAllLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemonAllData = async () => {
      setIsAllLoading(true);
      const { success, error } = await fetchAllPokemons();
      if (success) setAllPokemon(success);
      else setErrorMessage(error);
      setIsAllLoading(false);
    };
    fetchPokemonAllData();
  }, []);

  const handleSearch = async (name) => {
    setIsLoading(true);
    const { success, error } = await fetchPokemon(name);
    if (success) {
      setPokemon(success);
      setErrorMessage("");
    } else setErrorMessage(error);
    setIsLoading(false);
  };

  return (
    <Container sx={{ m: 4 }}>
      <Search
        handleSearch={handleSearch}
        isLoading={isLoading}
        prefixTestId="search"
      />

      {isLoading && (
        <Box mt={2}>
          <CircularProgress />
        </Box>
      )}

      <Box mt={2}>
        {errorMessage && <Typography mt={2}>Error: {errorMessage}</Typography>}

        {!errorMessage && pokemon && (
          <Button
            sx={{ width: "20%", padding: "15px" }}
            mt={0}
            onClick={() => {
              navigate(`/pokemon/${pokemon.id}`);
            }}
          >
            <PokemonData
              name={pokemon.name}
              sprite={pokemon.sprites.front_default}
            />
          </Button>
        )}
      </Box>

      <Box mt={2}>
        <Search
          handleSearch={(value) => {
            setSearchValue(value);
          }}
          isLoading={isAllLoading}
          prefixTestId="search-all"
        />
      </Box>
      {searchValue &&
        allPokemon
          .filter((pokemon) => pokemon.name.includes(searchValue))
          .map((pokemon) => {
            const values = pokemon.url.split("/pokemon/");
            const id = values[values.length - 1].replace("/", "");
            return (
              <Button
                sx={{ width: "15%", padding: "15px" }}
                mt={0}
                onClick={() => {
                  navigate(`/pokemon/${id}`);
                }}
              >
                <span data-testid={`pokemon-smiliar-name-${id}`}>
                  {pokemon.name}
                </span>
              </Button>
            );
          })}
    </Container>
  );
};

export default Home;
