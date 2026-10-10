import {createSlice} from '@reduxjs/toolkit'
import { SongThunk } from './songThunk';

const songSlice = createSlice({
  name: "song",
  initialState: {
    song: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SongThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SongThunk.fulfilled, (state, action) => {
        state.song = action.payload;
        state.isLoading = false;
      })
      .addCase(SongThunk.rejected, (state) => {
        state.isLoading = false;
      });
     
  },
});

export const {addsong} = songSlice.actions
export default songSlice.reducer