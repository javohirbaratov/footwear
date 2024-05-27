import { cashier_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";
import { ICustomer } from "../../customer/customer";

interface ICategoryProduct {
  id: number;
  name: string;
  article: string;
  sale_block: number;
  desc: string;
  sale_price: number;
  quantity_ordered: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ICashierOrder {
  id: number,
  customer: ICustomer,
  status: {
    name: string,
    code: string
  },
  total_price: number,
  products: ICategoryProduct[],
  comment: string,
  created_at: string,
  updated_at: string
}

// index
interface ICashierOrderRes extends IApiRes {
  data: ICashierOrder[];
}

// show
interface ICashierOrderByIdRes extends IApiRes {
  data: ICashierOrder;
}

const order_from_sales_tag = "order_from_sales_tag";

export const orderFromSalesApi = api
  .enhanceEndpoints({ addTagTypes: [order_from_sales_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getCashierOrder: build.query<ICashierOrderRes, void>({
        query: () => cashier_api.order,
        providesTags: [order_from_sales_tag],
      }),
      // get by status 
      getCashierOrderByStatus: build.query<ICashierOrderRes, {status: string|null}>({
        query: ({status}) => cashier_api.order_get_by_status(status),
        providesTags: [order_from_sales_tag],
      }), 
      // show
      getCashierOrderById: build.query<ICashierOrderByIdRes, {orderId: string|null}>({
        query: ({orderId}) => cashier_api.order_get_by_id(orderId),
        providesTags: [order_from_sales_tag],
      }), 
    }),
  });

export const {
  useGetCashierOrderQuery,
  useGetCashierOrderByIdQuery,
  useGetCashierOrderByStatusQuery,
} = orderFromSalesApi;

export const {
  endpoints: {
    getCashierOrder,
    getCashierOrderById,
    getCashierOrderByStatus
  },
} = orderFromSalesApi;