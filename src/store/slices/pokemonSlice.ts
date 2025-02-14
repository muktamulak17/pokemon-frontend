import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemon } from "../thunks/fetchPokemon";
import { LIMIT } from "../../config";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  allPokemon: Pokemon[];
  searchedPokemon: Pokemon[];
  favorites: Pokemon[];
  loading: boolean;
  offset: number;
  hasMore: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  allPokemon: [],
  searchedPokemon: [],
  favorites: [],
  loading: false,
  offset: 0,
  hasMore: true,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    searchPokemon: (state, action) => {
      if (action.payload.length > 0) {
        const filtered = state.allPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.searchedPokemon = filtered;
      } else {
        state.searchedPokemon = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.allPokemon = [...state.allPokemon, ...action.payload.pokemonData];
        state.offset = state.offset + Number(LIMIT);
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { searchPokemon } = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;
