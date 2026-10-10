import {configureStore} from "@reduxjs/toolkit"
import authSlice from './features/auth/state/authSlice'
import songSlice from "./features/home/state/songSlice"
export const store = configureStore({
    reducer:{
        auth:authSlice,
        song:songSlice
    }
})