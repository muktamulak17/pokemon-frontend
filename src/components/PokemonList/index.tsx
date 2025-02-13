import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AppDispatch, fetchPokemon } from "../../store/store";
import { Toast } from "../Toast";
import { Searchbar } from "../Searchbar";
import { DetailDialog } from "../DetailDialog";
import { ListHeader } from "./ListHeader";
import { usePokemonList } from "../../hooks/usePokemonList";

interface Pokemon {
  name: string;
  url: string;
}

export const PokemonList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    favorites,
    openDialog,
    selectedPokemon,
    pokemonData,
    loading,
    toastData,
    openToast,
    setOpenToast,
    setOpenDialog,
    toggleFavorite,
    handleRowClick,
    handleScroll,
  } = usePokemonList();

  // Fetch Pokemon Data on Page Change
  useEffect(() => {
    dispatch(fetchPokemon(0));
  }, [dispatch]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Searchbar />

      <TableContainer
        component={Paper}
        sx={{
          height: window.innerHeight - 200,
          maxWidth: "100%",
          overflowY: "auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
        onScroll={handleScroll}
      >
        <Table stickyHeader>
          <ListHeader headings={["Id", "Name", "Url", "Favorite"]} />
          <TableBody>
            {pokemonData.map((pokemon: Pokemon, index: number) => {
              let isFavorite = false;
              if (favorites) {
                isFavorite = favorites.some((item) => {
                  return item.name === pokemon.name;
                });
              }
              const favAction = isFavorite ? "remove" : "add";
              return (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(pokemon.name)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{pokemon.name}</TableCell>
                  <TableCell>{pokemon.url}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(pokemon.name, favAction);
                      }}
                    >
                      {isFavorite ? (
                        <Favorite sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {loading && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <DetailDialog
        open={!!openDialog}
        onClose={() => setOpenDialog(false)}
        name={selectedPokemon}
      />
      <Toast
        message={toastData.message}
        severity={toastData.severity}
        open={openToast}
        onClose={() => setOpenToast(false)}
      />
    </Paper>
  );
};
