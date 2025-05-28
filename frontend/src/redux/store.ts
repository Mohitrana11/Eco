import { configureStore } from "@reduxjs/toolkit";

export const server = import.meta.env.VITE_Server;

export const store = configureStore({
  reducer: [],
});
