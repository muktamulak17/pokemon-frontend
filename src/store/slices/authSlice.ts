import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginUser";

interface AuthState {
  loading: boolean;
  username: string | null;
  token: string | null;
  error: string | null | undefined;
}

const initialState: AuthState = {
  loading: false,
  username: null,
  token: localStorage.getItem("token") || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action?.payload?.token;
        state.username = action?.payload?.username;
        localStorage.setItem("token", action?.payload?.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
