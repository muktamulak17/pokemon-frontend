import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, LIMIT } from "../../config";

// Async thunk to fetch pokemon list
export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchAll",
  async (offset: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/pokemon/list`, {
        params: { offset, limit: LIMIT },
      });
      return { pokemonData: response.data, hasMore: response.data.length > 0 };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch Pokemon lists"
      );
    }
  }
);
