import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchFavorites } from "./fetchFavorites";
import { API_URL } from "../../config";

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    formData: { username: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      const { token, username } = response.data;
      dispatch(fetchFavorites({ token, username }));
      return { token, username };
    } catch (error) {
      return rejectWithValue(
        axios.isAxiosError(error) ? error.response?.data?.error : "Login failed"
      );
    }
  }
);
