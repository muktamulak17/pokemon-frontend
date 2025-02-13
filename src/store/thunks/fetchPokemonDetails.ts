import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

interface DetailResponse {
  data: {
    name: string | null;
    abilities: string[];
    types: string[];
    evolutions: string[];
  };
}

export const fetchPokemonDetails = createAsyncThunk(
  "pokemon/details",
  async (pokemonName: string | null, { rejectWithValue }) => {
    try {
      const response: DetailResponse = await axios.get(
        `${API_URL}/pokemon/${pokemonName}`
      );

      const { abilities, types, evolutions } = response.data;
      return {
        selectedPokemon: pokemonName,
        abilities,
        types,
        evolutions,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch pokemon details"
      );
    }
  }
);
