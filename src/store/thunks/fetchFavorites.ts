import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../config";

interface IFavorite {
  favorites: { name: string; id: string }[];
}

export const updateFavorite = createAsyncThunk<
  IFavorite,
  {
    name: string;
    username: string | null;
    action: "add" | "remove";
    token: string | null;
  },
  { rejectValue: string | AxiosError }
>(
  "pokemon/updateFavorite",
  async ({ username, name, action, token }, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `${API_URL}/favorites/update`,
        { name, action, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return resp.data as IFavorite;
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Failed to update favorite"
      );
    }
  }
);

export const fetchFavorites = createAsyncThunk<
  IFavorite,
  { token: string; username: string },
  { rejectValue: string | AxiosError }
>("pokemon/fetchFavorite", async ({ token, username }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/favorites/list`, {
      params: { username },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      axios.isAxiosError(error)
        ? error.response?.data?.error
        : "Error in fetching favorites"
    );
  }
});
