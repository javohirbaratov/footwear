import { admin_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

export interface ICategory {
  from: string,
  from_summa: number,
  to: string,
  to_summa: string
}

// index
interface ICategoryRes extends IApiRes {
  data: ICategory[];
}

// show
interface ICategoryByIdRes extends IApiRes {
  data: ICategory;
}

// post
export interface ICategoryAdd {
  name: string;
  parent_id: number | "";
}

interface ICategoryAddRes extends IApiRes {
  data: ICategory;
}

// update
interface ICategoryUpdate {
  categoryId: string;
  body: ICategoryAdd;
}
interface ICategoryUpdateRes extends ICategoryAddRes { }
interface ICategoryDeleteRes extends ICategoryAddRes { }

const admin_category_tag = "admin_category";

export const categoryApi = api
  .enhanceEndpoints({ addTagTypes: [admin_category_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getCategory: build.query<ICategoryRes, void>({
        query: () => admin_api.category_get,
        providesTags: [admin_category_tag],
      }),
      // show
      getCategoryById: build.query<
        ICategoryByIdRes,
        { categoryId: string | 0 }
      >({
        query: ({ categoryId }) => admin_api.category_get_by_id(categoryId),
        providesTags: [admin_category_tag],
      }),
      // post
      addCategory: build.mutation<ICategoryAddRes, ICategoryAdd>({
        query: (body) => ({
          url: admin_api.category_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [admin_category_tag],
      }),
      // put
      putCategory: build.mutation<ICategoryUpdateRes, ICategoryUpdate>({
        query: ({ body, categoryId }) => ({
          url: admin_api.category_update(categoryId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [admin_category_tag],
      }),
      // delete
      deleteCategory: build.mutation<
        ICategoryDeleteRes,
        { categoryId: string }
      >({
        query: ({ categoryId }) => ({
          url: admin_api.category_update(categoryId),
          method: "DELETE",
        }),
        invalidatesTags: [admin_category_tag],
      }),
    }),
  });

export const {
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export const {
  endpoints: {
    getCategory,
    getCategoryById,
    addCategory,
    putCategory,
    deleteCategory,
  },
} = categoryApi;
