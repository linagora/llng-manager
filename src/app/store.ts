import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/data/dataSlice";
import issuerReducer from "../features/toggles/issuerSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    issuerToggle: issuerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
