import {createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../../config/axios"


export const RegisterThunk = createAsyncThunk("user/login",async(data,thunk_api)=>{

    try {

        const response = await api.post("/auth/register", {
          username: data.username,
          email: data.email,
          password: data.password,
        });

        return response.data
        
    } catch (error) {
        return thunk_api.rejectWithValue(error.response?.data?.message)
    }
})