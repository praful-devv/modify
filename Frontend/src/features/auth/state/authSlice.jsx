import { createSlice } from "@reduxjs/toolkit"
import { LoginThunk, MeThunk, RegisterThunk } from "./authThunkSlice"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isLoading:false
    },
    reducers:{
      logout:(state)=>{
        state.user = null
      }
    },
    extraReducers:(builder)=>{
        builder
          .addCase(RegisterThunk.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(RegisterThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
          })
          .addCase(RegisterThunk.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(LoginThunk.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(LoginThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
          })
          .addCase(LoginThunk.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(MeThunk.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(MeThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
          })
          .addCase(MeThunk.rejected, (state) => {
            state.isLoading = false;
          });
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer