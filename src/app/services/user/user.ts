import { user_api } from "../../../constants/api";
import { IApiRes, TRoles } from "../../../types/api";
import { api } from "../api";

export interface IUser {
  name: string;
  phone: string;
  login: string;
  roles: TRoles;
}

// show
export interface IUserRes extends IApiRes {
  data: IUser;
}

// update
export interface IUserUpdate {
  name: string;
  phone: string;
}

interface IUserUpdateRes extends IApiRes {
  data: IUser;
}

// update password
export interface IUserUpdatePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
interface IUserUpdatePasswordRes extends IApiRes {
  data: null;
}

const user_tag = "user";

export const userApi = api
  .enhanceEndpoints({ addTagTypes: [user_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // show
      getUser: build.query<IUserRes, void>({
        query: () => user_api.user_get,
        providesTags: [user_tag],
      }),
      // update
      updateUser: build.mutation<IUserUpdateRes, IUserUpdate>({
        query: (body) => ({
          url: user_api.user_update,
          method: "PUT",
          body,
        }),
        invalidatesTags: [user_tag],
      }),
      // update password
      updateUserPassword: build.mutation<
        IUserUpdatePasswordRes,
        IUserUpdatePassword
      >({
        query: (body) => ({
          url: user_api.user_update_password,
          method: "PUT",
          body,
        }), 
      }),
      // logout
      logoutUser: build.mutation<void, void>({
        query: () => ({
          url: user_api.user_logout,
          method: "POST",
        }),
        invalidatesTags: [user_tag],
      }),
    }),
  });

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useLogoutUserMutation,
} = userApi;

export const {
  endpoints: { getUser, updateUser, updateUserPassword, logoutUser },
} = userApi;
