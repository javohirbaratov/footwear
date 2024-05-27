import { cashier_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";


export interface ICashierBalance {
  naqd: number,
  usd: number,
  bank: number,
  card: number,
  updated_at: string
}

// index
interface ICashierBalanceRes extends IApiRes {
  data: ICashierBalance;
}


const order_from_sales_tag = "order_from_sales_tag";

export const orderFromSalesApi = api
  .enhanceEndpoints({ addTagTypes: [order_from_sales_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getCashierBalance: build.query<ICashierBalanceRes, void>({
        query: () => cashier_api.balance,
        providesTags: [order_from_sales_tag],
      }),
      
    }),
  });

export const {
  useGetCashierBalanceQuery
} = orderFromSalesApi;

export const {
  endpoints: {
    getCashierBalance
  },
} = orderFromSalesApi;