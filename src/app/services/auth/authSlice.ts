import { createSlice } from "@reduxjs/toolkit";
import { localTokenKey } from "../../../constants/const";
import { authApi } from "./auth";
import { RootState } from "../../store";
import { IUser, userApi } from "../user/user";

type TAuthState = {
  user: null | IUser;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState: TAuthState = {
  user: null,
  token: localStorage.getItem(localTokenKey),
  isAuthenticated: false,
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Reset state to initial values
      Object.assign(state, initialState);

      // Remove token from local storage
      localStorage.removeItem(localTokenKey);
    },
  },
  extraReducers: (builder) => {
    builder
      // getUser
      .addMatcher(authApi.endpoints.authGetUser.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.authGetUser.matchPending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.authGetUser.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          if (!action.payload.success) {
            localStorage.removeItem(localTokenKey);
            state.isAuthenticated = false;
            return;
          }

          state.user = action.payload.data;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(authApi.endpoints.authGetUser.matchRejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      // login
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        if (!action.payload.success) {
          localStorage.removeItem(localTokenKey);
          state.isAuthenticated = false;
          return;
        }

        // console.log("fulfilled", action);
        const { user_data, token } = action.payload.data;

        state.user = user_data;
        state.token = token;
        state.isAuthenticated = true;
        state.isLoading = false;

        /* LOCAL STORAGE */
        localStorage.setItem(localTokenKey, token);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      // logoutUser
      .addMatcher(userApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;

        // Reset state to initial values
        Object.assign(state, initialState);

        // Remove token from local storage
        localStorage.removeItem(localTokenKey);
      });
  },
});

export default slice.reducer;

export const { logout } = slice.actions;

export const selectedIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectedUser = (state: RootState) => state.auth?.user;
export const selectedUserRoles = (state: RootState): string[] =>
  state.auth?.user?.roles || [];
export const selectedIsLoading = (state: RootState): boolean =>
  state.auth.isLoading;
