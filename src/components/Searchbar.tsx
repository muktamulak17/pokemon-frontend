import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { searchPokemon, AppDispatch } from "../store/store";

export const Searchbar = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(searchPokemon(search));
  }, [dispatch, search]);
  return (
    <TextField
      label="Search Pokemon"
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: <Search sx={{ marginRight: 1 }} />,
      }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
};
