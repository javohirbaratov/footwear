import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";
import { ICustomer } from "../../customer/customer";

interface ISalesOrderProduct {
  name: string,
  article: string,
  desc: string,
  sale_price: number,
  sale_block: number,
  sale_volume: number,
  created_at: string,
  updated_at: string
}

export interface ISalesOrder {
  id: number,
  customer: ICustomer,
  status: string,
  total_price: number,
  products: ISalesOrderProduct[],
  created_at: string,
  updated_at: string
}

// index
interface ISalesOrderRes extends IApiRes {
  data: ISalesOrder[];
}
// show
interface ISalesOrderByIdRes extends IApiRes {
  data: ISalesOrder;
} 

interface IOrderAddProduct {
  product_id: number,
  volume: number
}

// create
export interface IOrderAdd {
  customer_id: number;
  comment: string;
  products: IOrderAddProduct[] | null;
}

const sales_order_tag = "sales_order";

export const orderApi = api
  .enhanceEndpoints({ addTagTypes: [sales_order_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getSalesOrder: build.query<ISalesOrderRes, void>({
        query: () => sales_api.order_get,
        providesTags: [sales_order_tag],
      }),
      // show 
      getSalesOrderById: build.query<ISalesOrderByIdRes, {orderId: string|null}>({
        query: ({orderId}) => sales_api.order_get_by_id(orderId),
        providesTags: [sales_order_tag],
      }), 
      // create
      addSalesOrderAdd: build.mutation<ISalesOrderRes, IOrderAdd>({
        query: (body) => ({
          url: sales_api.order_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [sales_order_tag],
      }),
    }),
  });

export const {
  useGetSalesOrderQuery,
  useGetSalesOrderByIdQuery,
  useAddSalesOrderAddMutation
} = orderApi;

export const {
  endpoints: {
    getSalesOrder,
    getSalesOrderById, 
    addSalesOrderAdd
  },
} = orderApi;
