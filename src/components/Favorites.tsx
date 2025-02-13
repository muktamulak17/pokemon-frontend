import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Paper,
  Grid2 as Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Toast } from "./Toast";
import { updateFavorite, RootState } from "../store/store";
import { useToast } from "../hooks/useToast";

export const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { username, token } = useSelector((state: RootState) => state.auth);

  const { toastData, setToastData, openToast, setOpenToast } = useToast();

  const handleRemove = (name) => {
    dispatch(updateFavorite({ name, username, action: "remove", token }))
      .unwrap()
      .then(() => {
        setOpenToast(true);
        setToastData({
          severity: "success",
          message: "Favorite removed successfully!",
        });
      })
      .catch((err) => {
        setOpenToast(true);
        setToastData({
          severity: "error",
          message: `Failed to remove favorite: ${err.message}`,
        });
      });
  };

  return (
    <Paper sx={{ padding: 2, backgroundColor: "primar.main" }}>
      <Grid container spacing={2}>
        {favorites.map((pokemon) => (
          <Grid xs={12} sm={6} md={4} key={pokemon.id}>
            <Card sx={{ maxWidth: 300, backgroundColor: "secondary.main" }}>
              <CardContent>
                <Typography variant="h6">{pokemon.name}</Typography>
                <IconButton
                  color="error"
                  onClick={() => handleRemove(pokemon.name)}
                >
                  <FavoriteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Toast
          message={toastData.message}
          severity={toastData.severity}
          open={openToast}
          onClose={() => setOpenToast(false)}
        />
      </Grid>
    </Paper>
  );
};
