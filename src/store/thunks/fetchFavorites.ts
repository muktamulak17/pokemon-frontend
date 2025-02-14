import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

export const updateFavorite = createAsyncThunk<
  void,
  {
    name: string;
    username: string | null;
    action: "add" | "remove";
    token: string | null;
  },
  { rejectValue: string }
>(
  "pokemon/updateFavorite",
  async (
    {
      username,
      name,
      action,
      token,
    }: {
      name: string;
      username: string | null;
      action: "add" | "remove";
      token: string | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await axios.post(
        `${API_URL}/favorites/update`,
        { name, action, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return resp.data;
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Failed to update favorite"
      );
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "pokemon/fetchFavorite",
  async (
    { token, username }: { token: string; username: string },
    { rejectWithValue }
  ) => {
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
  }
);
