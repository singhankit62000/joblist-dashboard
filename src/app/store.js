import { configureStore } from "@reduxjs/toolkit";
import joblistReducer from '../features/joblistSlice'

export const store = configureStore({
    reducer: joblistReducer,
})