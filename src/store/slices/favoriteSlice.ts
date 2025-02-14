import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites, updateFavorite } from "../store";

interface FavoriteState {
  isLoading: boolean;
  favorites: { name: string; id: string }[];
  error: string | null;
  updateFavorite: {
    isLoading: boolean;
    updateError: string | null;
  };
}

const initialState: FavoriteState = {
  isLoading: false,
  favorites: [],
  error: null,
  updateFavorite: {
    isLoading: false,
    updateError: null,
  },
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.favorites || [];
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateFavorite.pending, (state) => {
        state.updateFavorite.isLoading = true;
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload.favorites || [];
        state.updateFavorite.isLoading = false;
      })
      .addCase(updateFavorite.rejected, (state, action) => {
        state.updateFavorite.isLoading = false;
        state.updateFavorite.updateError = action.payload as string;
      });
  },
});

export const favoriteReducer = favoriteSlice.reducer;
