import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import activeReducer from "./slices/activeSlice";
import businessReducer from "./slices/businessSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    active: activeReducer,
    business: businessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
