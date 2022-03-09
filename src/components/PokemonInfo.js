import React from "react";
import { Typography, ImageListItem, Box } from "@mui/material";

export default function PokemonInfo(props) {
  return (
    <Box>
      <Typography data-testid="name">Name: {props.name}</Typography>
      <ImageListItem>
        <img
          src={`${props.sprite}`}
          srcSet={`${props.sprite}`}
          alt={props.name}
          loading="lazy"
          data-testid="img"
        />
      </ImageListItem>
    </Box>
  );
}
