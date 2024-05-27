import { admin_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";
import { ICategory } from "../../common/category/category";

export interface IProduct {
  id: number;
  name: string;
  volume: number;
  article: string;
  price: number;
  block: number;
  desc: string;
  categories_list: ICategory[]
}

// index
interface IProductRes extends IApiRes {
  data: IProduct[];
}
// show
interface IProductByIdRes extends IApiRes {
  data: IProduct;
}

// post
export interface IProductAdd {
  name: string;
  volume: number | "";
  article: string;
  price: string;
  block: number | "";
  desc: string;
  categories_list: number[]
}

interface IProductAddRes extends IApiRes {
  data: IProduct;
}

// update
interface IProductUpdate {
  productId: string;
  body: IProduct;
}
interface IProductUpdateRes extends IProductAddRes {}
interface IProductDeleteRes extends IApiRes{}

const admin_product_tag = "admin_product";

export const productApi = api
  .enhanceEndpoints({ addTagTypes: [admin_product_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getAdminProduct: build.query<IProductRes, void>({
        query: () => admin_api.product_get,
        providesTags: [admin_product_tag],
      }),
      // show
      getAdminProductById: build.query<IProductByIdRes, {productId: string|null}>({
        query: ({productId}) => admin_api.product_get_by_id(productId),
        providesTags: [admin_product_tag],
      }),
      // post
      addAdminProduct: build.mutation<IProductAddRes, IProductAdd>({
        query: (body) => ({
          url: admin_api.product_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [admin_product_tag],
      }),
      // put
      putAdminProduct: build.mutation<IProductUpdateRes, IProductUpdate>({
        query: ({ body, productId }) => ({
          url: admin_api.product_update(productId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [admin_product_tag],
      }),
      // delete
      deleteAdminProduct: build.mutation<IProductDeleteRes, { productId: string }>({
        query: ({ productId }) => ({
          url: admin_api.product_update(productId),
          method: "DELETE",
        }),
        invalidatesTags: [admin_product_tag],
      }),
    }),
  });

export const {
  useGetAdminProductQuery,
  useGetAdminProductByIdQuery,
  useAddAdminProductMutation,
  usePutAdminProductMutation,
  useDeleteAdminProductMutation,
} = productApi;

export const {
  endpoints: {
    getAdminProduct,
    getAdminProductById,
    addAdminProduct,
    putAdminProduct,
    deleteAdminProduct,
  },
} = productApi;
