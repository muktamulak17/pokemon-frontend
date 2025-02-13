import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer, searchPokemon } from "../store/slices/pokemonSlice";
import { pokemonDetailsReducer } from "./slices/pokemonDetailSlice";
import { authReducer, logout, clearError } from "../store/slices/authSlice";
import { favoriteReducer } from "./slices/favoriteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonReducer,
    pokemonDetails: pokemonDetailsReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, logout, clearError, searchPokemon };

export * from "../store/thunks/fetchFavorites";
export * from "../store/thunks/fetchPokemon";
export * from "../store/thunks/fetchPokemonDetails";
export * from "../store/thunks/loginUser";
