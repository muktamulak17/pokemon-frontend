import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonDetails } from "../thunks/fetchPokemonDetails";

interface PokemonDetails {
  selectedPokemon: string | null;
  pokemonDetails: {
    abilities: string[];
    types: string[];
    evolutions: string[];
  };
  error: string | null;
  isLoadingDetails: boolean;
}

const initialState: PokemonDetails = {
  selectedPokemon: null,
  pokemonDetails: {
    abilities: [],
    types: [],
    evolutions: [],
  },
  error: null,
  isLoadingDetails: false,
};

const pokemonDetailSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.isLoadingDetails = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        state.pokemonDetails.abilities = action.payload.abilities;
        state.pokemonDetails.types = action.payload.types;
        state.pokemonDetails.evolutions = action.payload.evolutions;
        state.selectedPokemon = action.payload.selectedPokemon;
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.error = action.payload as string;
      });
  },
});

export const pokemonDetailsReducer = pokemonDetailSlice.reducer;
