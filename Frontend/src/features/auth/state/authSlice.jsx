import { createSlice, isPending } from "@reduxjs/toolkit"
import { RegisterThunk } from "./authThunkSlice"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isLoading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(RegisterThunk.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(RegisterThunk.fulfilled,(state,action)=>{
            state.user = action.payload
            state.isLoading = false
        })
        .addCase(RegisterThunk.rejected,(state)=>{
            state.isLoading = false
        })
    }
})


export default authSlice.reducer