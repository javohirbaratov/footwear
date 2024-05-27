import { customer_api } from "../../../constants/api";
import { IApiRes } from "../../../types/api";
import { api } from "../api";


export interface ICustomer {
  id: number,
  firstname: string,
  lastname: string,
  phone_number: string,
  telegram_id: string,
  created_at: string,
  updated_at: string
}

// index
interface ICustomerRes extends IApiRes {
  data: ICustomer[];
}

// show
interface ICustomerByIdRes extends IApiRes {
  data: ICustomer;
}

// post
export interface ICustomerAdd {
  firstname: string,
  lastname: string,
  phone_number: string,
  telegram_id: string
}

interface ICustomerAddRes extends IApiRes {
  data: ICustomer;
}

// update
export interface ICustomerUpdate {
  customerId: string;
  body: ICustomerAdd;
}
interface ICustomerUpdateRes extends ICustomerAddRes { }
interface ICustomerDeleteRes extends ICustomerAddRes { }

const customer_tag = "customer";

export const customerApi = api
  .enhanceEndpoints({ addTagTypes: [customer_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getCustomer: build.query<ICustomerRes, void>({
        query: () => customer_api.customer_get,
        providesTags: [customer_tag],
      }),
      // show
      getCustomerById: build.query<
        ICustomerByIdRes,
        { customerId: string }
      >({
        query: ({ customerId }) => customer_api.customer_get_by_id(customerId),
        providesTags: [customer_tag],
      }),
      // post
      addCustomer: build.mutation<ICustomerAddRes, ICustomerAdd>({
        query: (body) => ({
          url: customer_api.customer_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [customer_tag],
      }),
      // put
      putCustomer: build.mutation<ICustomerUpdateRes, ICustomerUpdate>({
        query: ({ body, customerId }) => ({
          url: customer_api.customer_update(customerId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [customer_tag],
      }),
      // // delete
      deleteCustomer: build.mutation<ICustomerDeleteRes, { customerId: string }>({
        query: ({ customerId }) => ({
          url: customer_api.customer_delete(customerId),
          method: "DELETE",
        }),
        invalidatesTags: [customer_tag],
      }),
    }),
  });

export const {
  useGetCustomerQuery,
  useGetCustomerByIdQuery,
  useAddCustomerMutation,
  usePutCustomerMutation,
  useDeleteCustomerMutation
} = customerApi;

export const {
  endpoints: {
    getCustomer,
    getCustomerById,
    addCustomer,
    deleteCustomer,
    putCustomer
  },
} = customerApi;
