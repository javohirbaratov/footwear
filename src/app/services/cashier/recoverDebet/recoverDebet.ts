import { cashier_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

// export interface ICustomer {
//   id: number,
//   firstname: string,
//   lastname: string,
//   phone_number: string,
//   telegram: string,
//   created_at: string,
//   updated_at: string
// }

// // index
// interface ICustomerRes extends IApiRes {
//   data: ICustomer[];
// }

// // show
// interface ICustomerByIdRes extends IApiRes {
//   data: ICustomer;
// }

// // update
// export interface ICustomerUpdate {
//   customerId: string;
//   body: ICustomerAdd;
// }
// post
export interface IRecoverDebetAdd {
  customer_id: string | null,
  naqd: number | "",
  usd: number | "",
  currency: number | "",
  bank: number | "",
  card: number | "",
  comment: string
}

interface IRecoverDebetRes extends IApiRes {
  data: null;
}

const cashier_tag = "customer";

export const recoverDebetApi = api
  .enhanceEndpoints({ addTagTypes: [cashier_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // post 
      addRecoverDebet: build.mutation<IRecoverDebetRes, IRecoverDebetAdd>({
        query: (body) => ({
          url: cashier_api.recover_debet,
          method: "POST",
          body,
        }),
        invalidatesTags: [cashier_tag],
      }),
      // index
      // getCustomer: build.query<ICustomerRes, void>({
      //   query: () => customer_api.customer_get,
      //   providesTags: [customer_tag],
      // }),
      // show
      // getCustomerById: build.query<
      //   ICustomerByIdRes,
      //   { customerId: string }
      // >({
      //   query: ({ customerId }) => customer_api.customer_get_by_id(customerId),
      //   providesTags: [customer_tag],
      // }),
    }),
  });

export const {
  useAddRecoverDebetMutation
} = recoverDebetApi;

export const {
  endpoints: {
    addRecoverDebet
  },
} = recoverDebetApi;
