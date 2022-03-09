/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import { allPokemons, mockPokemon1 } from "../mocks/pokemon";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: () => mockNavigate,
}));

jest.mock("../service/getPokemon", () => {
  const originalModule = jest.requireActual("../service/getPokemon");
  return {
    ...originalModule,
    fetchPokemon: jest.fn(),
    fetchAllPokemons: jest.fn(),
  };
});

describe("Homepage", () => {
  test("fetch PokemonData", async () => {
    const fetchPokemon = require("../service/getPokemon").fetchPokemon;
    const fetchAllPokemons = require("../service/getPokemon").fetchAllPokemons;
    fetchPokemon.mockResolvedValue({ success: mockPokemon1, error: null });
    fetchAllPokemons.mockResolvedValue({ success: [allPokemons], error: null });

    await act(async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });
    const searchInput = screen.getByTestId("search-input");
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
    fireEvent.change(searchInput, {
      target: { value: "urshifu-single-strike-gmax" },
    });

    fireEvent.click(screen.getByTestId("search-button"));

    await waitFor(() => {
      expect(
        screen.getByText("Name: urshifu-single-strike-gmax")
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Name: urshifu-single-strike-gmax"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
  test("found Error", async () => {
    const fetchPokemon = require("../service/getPokemon").fetchPokemon;
    const fetchAllPokemons = require("../service/getPokemon").fetchAllPokemons;
    fetchPokemon.mockResolvedValue({ success: null, error: "Not Found" });
    fetchAllPokemons.mockResolvedValue({ success: null, error: "Not Found" });

    await act(async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });
    const searchInput = screen.getByTestId("search-input");
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
    fireEvent.change(searchInput, {
      target: { value: "urshifu-single-strike-gmax" },
    });

    fireEvent.click(screen.getByTestId("search-button"));

    await waitFor(() => {
      expect(screen.getByText("Error: Not Found")).toBeInTheDocument();
    });
  });
});
