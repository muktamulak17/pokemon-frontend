import { useDispatch, useSelector } from "react-redux";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { RootState, AppDispatch, fetchPokemonDetails } from "../../store/store";
import { useEffect } from "react";
import { StyledDialog } from "./StyledDialog";
import { DialogHeader } from "./DialogHeader";

const CloseButton = styled(Button)(({ theme }: any) => ({
  color: "#ffffff",
  backgroundColor: theme.palette.primary.main,
  fontWeight: "bold",
}));

interface DialogProps {
  open: boolean;
  onClose: () => void;
  name: string | null;
}

export const DetailDialog = ({ open, onClose, name }: DialogProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemonDetails, isLoadingDetails } = useSelector(
    (state: RootState) => state.pokemonDetails
  );
  const { abilities, evolutions, types } = pokemonDetails;

  useEffect(() => {
    if (!name) return;
    dispatch(fetchPokemonDetails(name));
  }, [dispatch, name]);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogHeader>
        <Typography variant="h5" fontWeight="bold">
          {name}
        </Typography>
      </DialogHeader>
      <DialogContent>
        {isLoadingDetails ? (
          <>
            {Object.keys(pokemonDetails).map((keys) => {
              return (
                <Typography variant="h1" key={keys}>
                  <Skeleton animation="wave" height={"100px"} />
                </Typography>
              );
            })}
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: "bold", marginTop: 1 }}
            >
              Abilities
            </Typography>
            <Typography variant="body1">{abilities.join(", ")}</Typography>
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: "bold", marginTop: 2 }}
            >
              Types
            </Typography>
            <Typography variant="body1">{types.join(", ")}</Typography>
            <Typography
              variant="h6"
              sx={{ color: "primary.main", fontWeight: "bold", marginTop: 2 }}
            >
              Evolutions
            </Typography>
            <Typography variant="body1">{evolutions.join(" → ")}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <CloseButton onClick={onClose} variant="contained">
          Close
        </CloseButton>
      </DialogActions>
    </StyledDialog>
  );
};
