import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { ICategory } from "../../common/category/category";
import { api } from "../../api";

export interface ISalesProduct {
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
interface ISalesProductRes extends IApiRes {
  data: ISalesProduct[];
}
type TSalesProductCategoryByIdParams = string|null


// show
interface ISalesProductByIdRes extends IApiRes {
  data: ISalesProduct;
}

const admin_product_tag = "admin_product";

export const productApi = api
  .enhanceEndpoints({ addTagTypes: [admin_product_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getSalesProduct: build.query<ISalesProductRes, void>({
        query: () => sales_api.product_get,
        providesTags: [admin_product_tag],
      }),
      // index by category
      getSalesProductByCategoryId: build.query<ISalesProductRes, TSalesProductCategoryByIdParams>({
        query: (categoryId) => sales_api.product_get_by_category_id(categoryId),
        providesTags: [admin_product_tag],
      }),
      // show
      getSalesProductById: build.query<ISalesProductByIdRes, { productId: number | null }>({
        query: ({ productId }) => sales_api.product_get_by_id(productId),
        providesTags: [admin_product_tag],
      }),
    }),
  });

export const {
  useGetSalesProductQuery,
  useGetSalesProductByIdQuery,
  useGetSalesProductByCategoryIdQuery
} = productApi;

export const {
  endpoints: {
    getSalesProduct,
    getSalesProductById,
    getSalesProductByCategoryId
  },
} = productApi;
