import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAPI, register } from "@/services/publicAPI";
import { privateAPI, refresh, token } from "@/services/privateAPI";

export const loginUser = createAsyncThunk(
  "/users/login",
  async (credentials, thunkAPI) => {
    if (!navigator.onLine) return thunkAPI.rejectWithValue({ type: "network" });
    try {
      const res = await publicAPI.post("/auth/signin", credentials);
      token.set(res.data.tokens.accessToken);
      return res.data;
    } catch ({ request, response, message }) {
      return thunkAPI.rejectWithValue({ type: "request", message });
    }
  }
);

export const registerUser = createAsyncThunk("/users/register", register);

export const refreshUser = createAsyncThunk("/users/refresh", refresh);

export const logoutUser = createAsyncThunk(
  "/users/logout",
  async (_, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.refreshToken;
      token.set(persistToken);
      const { data } = await privateAPI.post("/auth/logout");
      token.unset();
      localStorage.removeItem("persist:auth");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "/users/password",
  async ({ oldPassword, newPassword }, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.patch(
        "/users/password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
