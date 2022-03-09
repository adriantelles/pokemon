/* eslint-disable testing-library/no-unnecessary-act */
import { render, waitFor, act, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import { mockPokemon1 } from "../mocks/pokemon";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "10226",
  }),
}));

jest.mock("../service/getPokemon", () => {
  const originalModule = jest.requireActual("../service/getPokemon");
  return {
    ...originalModule,
    fetchPokemon: jest.fn(),
  };
});

describe("PokemonDetail page", () => {
  test("fetch PokemonData", async () => {
    const fetchPokemon = require("../service/getPokemon").fetchPokemon;
    fetchPokemon.mockResolvedValue({ success: mockPokemon1, error: null });

    await act(async () => {
      render(
        <Router>
          <PokemonDetail />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Prev")).toBeInTheDocument();
    });
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(
      screen.getByText("Name: urshifu-single-strike-gmax")
    ).toBeInTheDocument();
  });
  test("not found Pokemon", async () => {
    const fetchPokemon = require("../service/getPokemon").fetchPokemon;
    fetchPokemon.mockResolvedValue({ success: null, error: "Not Found" });

    await act(async () => {
      render(
        <Router>
          <PokemonDetail />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Error: Not Found")).toBeInTheDocument();
    });
  });
});
