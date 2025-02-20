import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import auth from "./services/auth/authSlice";
import appMenu from "./services/appMenu/appMenuSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth,
      appMenu,
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
