import { combineReducers, configureStore } from "@reduxjs/toolkit";
import configReducer from "../features/config/configSlice";
import creationAssistantReducer from "../features/creationAssistantSlice";

const rootReducer = combineReducers({
  config: configReducer,
  creationAssistant: creationAssistantReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
