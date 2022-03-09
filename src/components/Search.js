import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";

export default function Search({ isLoading, handleSearch, prefixTestId }) {
  const [name, setName] = useState("");
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5} md={5}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          inputProps={{
            "data-testid": `${prefixTestId}-input`,
          }}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Grid>
      <Grid item xs={5} md={5}>
        <Button
          data-testid={`${prefixTestId}-button`}
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={() => handleSearch(name)}
          disabled={!name || isLoading}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
