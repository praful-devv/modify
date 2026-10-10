import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/axios";

export const SongThunk = createAsyncThunk(
  "mood/song",
  async (data, thunk_api) => {
    try {
     const response = await api.get(`/song?mood=${data}`);;

      return response.data;
    } catch (error) {
      return thunk_api.rejectWithValue(error.response?.data?.message);
    }
  },
);
