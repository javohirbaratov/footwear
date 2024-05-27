import { auth_api, user_api } from "../../../constants/api";
import { IApiRes } from "../../../types/api";
import { api } from "../api";
import { IUser, IUserRes } from "../user/user";

// login
export interface IAuthLogin {
  login: string;
  password: string;
}

interface IAuthLoginRes extends IApiRes {
  data: {
    user_data: IUser;
    token: string;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    // show
    authGetUser: build.query<IUserRes, void>({
      query: () => user_api.user_get,
    }),
    login: build.mutation<IAuthLoginRes, IAuthLogin>({
      query: (credentials: IAuthLogin) => ({
        url: auth_api.login,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthGetUserQuery, useLoginMutation } = authApi;

export const {
  endpoints: { authGetUser, login },
} = authApi;