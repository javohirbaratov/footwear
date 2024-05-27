import { cashier_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

interface ICashierPaymentProductItem {
  id: number,
  name: string,
  article: string,
  desc: string,
  price_of_lost: number,
  price_product: number,
  price_payment: number,
  block_payment: number,
  quantity_payment: number
}

interface ICashierPaymentItem {
  id: number,
  status: {
    name: string,
    code: string
  },
  naqd: number,
  usd: number,
  currency: number,
  bank: number,
  card: number,
  comment: string,
  price_at_lost: number,
  products: ICashierPaymentProductItem[],
  created_at: string,
  updated_at: string
}


// index
interface ICashierPaymentRes extends IApiRes {
  data: ICashierPaymentItem[];
}

type TSalesProductCategoryByIdParams = string | null


// show
interface ISalesProductByIdRes extends IApiRes {
  data: ICashierPaymentProductItem;
}

export interface ICahierPatmentAddProductList {
  product_id: number,
  sale_price: number
}

// create
export interface IPatmentAdd {
  order_id: string;
  products_list: ICahierPatmentAddProductList[];
  comment: string;
}

const cashier_payment_tag = "admin_product";

export const paymentApi = api
  .enhanceEndpoints({ addTagTypes: [cashier_payment_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getCashierPayment: build.query<ICashierPaymentRes, void>({
        query: () => cashier_api.cashier_payments,
        providesTags: [cashier_payment_tag],
      }),
      // create
      addCashierPaymentAdd: build.mutation<ICashierPaymentRes, IPatmentAdd>({
        query: (body) => ({
          url: cashier_api.cashier_payments_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [cashier_payment_tag],
      }),
      // // index by category
      // getCashierPaymentByCategoryId: build.query<ISalesProductRes, TSalesProductCategoryByIdParams>({
      //   query: (categoryId) => sales_api.product_get_by_category_id(categoryId),
      //   providesTags: [cashier_payment_tag],
      // }),
      // // show
      // getCashierPaymentById: build.query<ISalesProductByIdRes, { productId: number | null }>({
      //   query: ({ productId }) => sales_api.product_get_by_id(productId),
      //   providesTags: [cashier_payment_tag],
      // }),
    }),
  });

export const {
  useGetCashierPaymentQuery,
  useAddCashierPaymentAddMutation
  // useGetCashierPaymentByIdQuery,
  // useGetCashierPaymentByCategoryIdQuery
} = paymentApi;

export const {
  endpoints: {
    getCashierPayment,
    // getCashierPaymentById,
    // getCashierPaymentByCategoryId
  },
} = paymentApi;
