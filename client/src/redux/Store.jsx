import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
