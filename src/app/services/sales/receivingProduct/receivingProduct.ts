import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

interface ISalesProductItem {
  name: string,
  block: number,
  quantity_received: number,
  created_at: string,
  updated_at: string
}
// post 
export interface ISalesReceivingProductAddListItem {
  product_id: number,
  quantity: number|'' // bu block soni
}

interface ISalesReceivingProductAdd {
  products_list: ISalesReceivingProductAddListItem[]
}

interface ISalesReceivingProductRes extends IApiRes {
  id: number,
  products: ISalesProductItem[];
  created_at: string,
  updated_at: string
}

const sales_receiving_product_tag = "sales_receiving_product_tag";

export const productApi = api
  .enhanceEndpoints({ addTagTypes: [sales_receiving_product_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // post
      addReceivingSalesProduct: build.mutation<ISalesReceivingProductRes, ISalesReceivingProductAdd>({
        query: (body) => ({
          url: sales_api.receiving_products_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [sales_receiving_product_tag],
      }),
    }),
  });

export const {
  useAddReceivingSalesProductMutation
} = productApi;

export const {
  endpoints: {
    addReceivingSalesProduct
  },
} = productApi;
