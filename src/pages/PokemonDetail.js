import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  CircularProgress,
  Typography,
} from "@mui/material";
import { fetchPokemon } from "../service/getPokemon";
import PokemonInfo from "../components/PokemonInfo";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pokemon, setPokemon] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);
      const data = await fetchPokemon(id);
      const { success, error } = data;
      if (success) setPokemon(success);
      else setErrorMessage(error);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, [id]);

  return (
    <Container sx={{ m: 4 }}>
      {isLoading && (
        <Box mt={2}>
          <CircularProgress />
        </Box>
      )}
      <Box mt={2}>
        {errorMessage && <Typography mt={2}>Error: {errorMessage}</Typography>}
        {!errorMessage && pokemon && (
          <>
            <PokemonInfo
              name={pokemon.name}
              sprite={pokemon.sprites.front_default}
            />
            <Box display="flex" mt={2}>
              <Button href={`/pokemon/${pokemon.id - 1}`}>Prev</Button>
              <Button href={`/pokemon/${pokemon.id + 1}`}>Next</Button>
              <Button href={`/`}>Back to home</Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default PokemonDetail;
