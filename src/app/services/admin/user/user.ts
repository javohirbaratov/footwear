import { admin_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

interface IUser {
  id: number;
  name: string;
  parent: null|number;
  created_at: string;
  updated_at: string;
}

// index
interface IUserRes extends IApiRes {
  data: IUser[];
}

// post
interface IUserAdd {
  name: string;
  parent_id: number;
}

interface IUserAddRes extends IApiRes {
  data: IUser;
}

// update
interface IUserUpdate {
  categoryId: string;
  body: IUser;
}
interface IUserUpdateRes extends IUserAddRes {}

const admin_user_tag = "admin_user_tag";

export const categoryApi = api
  .enhanceEndpoints({ addTagTypes: [admin_user_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getAdminUser: build.query<null, IUserRes>({
        query: () => admin_api.category_get,
        providesTags: [admin_user_tag],
      }),
      // post
      addAdminUser: build.mutation<IUserAddRes, IUserAdd>({
        query: (body) => ({
          url: admin_api.category_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [admin_user_tag],
      }),
      // put
      putAdminUser: build.mutation<IUserUpdateRes, IUserUpdate>({
        query: ({ body, categoryId }) => ({
          url: admin_api.category_update(categoryId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [admin_user_tag],
      }),
      // delete
      deleteAdminUser: build.mutation<null, { categoryId: string }>({
        query: ({ categoryId }) => ({
          url: admin_api.category_update(categoryId),
          method: "DELETE",
        }),
        invalidatesTags: [admin_user_tag],
      }),
    }),
  });

export const { useGetAdminUserQuery } = categoryApi;

export const {
  endpoints: {
    getAdminUser,
    addAdminUser,
    putAdminUser,
    deleteAdminUser,
  },
} = categoryApi;
