import { privateAPI } from "@/services/privateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../services/privateAPI";
import { publicAPI } from "@/services/publicAPI";

export const getUsersAsAdmin = createAsyncThunk(
  "admin/getUsersAsAdmin",
  async (page, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      const response = await privateAPI.get(`/admin/users`, {
        params: { page },
        headers: { Authorization: `Bearer ${persistToken}` },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAdvertsAsAdmin = createAsyncThunk(
  "admin/getAdvertsAsAdmin",
  async (page, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      const response = await privateAPI.get(`/admin/adverts`, {
        params: { page },
        headers: { Authorization: `Bearer ${persistToken}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAdvertsAsAdmin = createAsyncThunk(
  "admin/deleteAdvertsAsAdmin",
  async (id, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      await privateAPI.put(`/admin/adverts/${id}`, {
        headers: { Authorization: `Bearer ${persistToken}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteUserAsAdmin = createAsyncThunk(
  "admin/deleteUserAsAdmin",
  async (id, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      await privateAPI.put(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${persistToken}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCountryAsAdmin = createAsyncThunk(
  "admin/updateCountryAsAdmin",
  async (Data, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.post("/admin/countries", Data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCountriesAsAdmin = createAsyncThunk(
  "admin/getCountriesAsAdmin",
  async (_, thunkAPI) => {
    {
      try {
        const { data } = await privateAPI.get("/admin/countries");
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const addLanguagesAsAdmin = createAsyncThunk(
  "admin/addLanguagesAsAdmin",
  async (Data, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.post("/admin/languages", Data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getLanguages = createAsyncThunk(
  "admin/getLanguages",
  async (_, thunkAPI) => {
    try {
      const { data } = await publicAPI.get("/languages");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteLanguageAsAdmin = createAsyncThunk(
  "admin/deleteLanguageAsAdmin",
  async (id, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.delete(`/admin/languages/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getSpecializations = createAsyncThunk(
  "adverts/getSpecializations",
  async (_, thunkAPI) => {
    try {
      const { data } = await publicAPI.get("/specializations");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addSpecializationsAsAdmin = createAsyncThunk(
  "admin/addSpecializationsAsAdmin",
  async (Data, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.post("/admin/specializations", Data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteSpecializationAsAdmin = createAsyncThunk(
  "admin/deleteSpecializationAsAdmin",
  async (id, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState().auth.accessToken;
      token.set(userToken);
      const { data } = await privateAPI.delete(`/admin/specializations/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCountries = createAsyncThunk(
  "adverts/getCountries",
  async (_, thunkAPI) => {
    try {
      const { data } = await publicAPI.get("/countries");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFeedbacksAsAdmin = createAsyncThunk(
  "admin/getFeedbacksAsAdmin",
  async (_, thunkAPI) => {
    try {
      const persistToken = thunkAPI.getState().auth.accessToken;
      token.set(persistToken);
      const { data } = await privateAPI.get("/admin/feedbacks", {
        headers: { Authorization: `Bearer ${persistToken}` },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
