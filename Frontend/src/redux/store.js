import { configureStore } from '@reduxjs/toolkit';
import SearchReducer from './features/SearchSlice'
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
     search: SearchReducer,
     auth: authReducer,
  },
});