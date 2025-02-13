import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  fetchPokemon,
  updateFavorite,
} from "../store/store";
import { useToast } from "./useToast";

export const usePokemonList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, token } = useSelector((state: RootState) => state.auth);
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { allPokemon, searchedPokemon, loading, offset } = useSelector(
    (state: RootState) => {
      return state.pokemon;
    }
  );

  const { openToast, toastData, setOpenToast, setToastData } = useToast();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  // Handle Scroll to Load More Data
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop <=
      event.currentTarget.clientHeight + 10;
    if (bottom && !loading) {
      dispatch(fetchPokemon(offset));
    }
  };

  // Toggle Favorite Pokemon
  const toggleFavorite = (name: string, action: "add" | "remove") => {
    if (!username || !token) {
      setOpenToast(true);
      setToastData({
        severity: "info",
        message: "You need to login to use this feature",
      });
    } else {
      dispatch(updateFavorite({ name, username, action, token }))
        .unwrap()
        .then(() => {
          setOpenToast(true);
          setToastData({
            severity: "success",
            message: `Favorite ${action}ed successfully!`,
          });
        })
        .catch((err) => {
          setOpenToast(true);
          setToastData({
            severity: "error",
            message: `Failed to ${action} favorite: ${err.message}`,
          });
        });
    }
  };

  // Fetch Pokemon Details on Row Click
  const handleRowClick = async (pokemonName: string) => {
    setOpenDialog(true);
    setSelectedPokemon(pokemonName);
  };

  const pokemonData = searchedPokemon.length > 0 ? searchedPokemon : allPokemon;

  return {
    favorites,
    openDialog,
    openToast,
    toastData,
    selectedPokemon,
    loading,
    pokemonData,
    setOpenDialog,
    setOpenToast,
    setSelectedPokemon,
    handleScroll,
    toggleFavorite,
    handleRowClick,
  };
};
