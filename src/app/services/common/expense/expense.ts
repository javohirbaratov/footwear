import { expense_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

export interface IExpense {
  id: number;
  name: string;
  parent: null | IExpense;
  created_at: string;
  updated_at: string;
}

// index
interface IExpenseRes extends IApiRes {
  data: IExpense[];
}

// show
interface IExpenseByIdRes extends IApiRes {
  data: IExpense;
}

// post
export interface IExpenseAdd {
  name: string;
  parent_id: number | "";
}

interface IExpenseAddRes extends IApiRes {
  data: IExpense;
}

// update
interface IExpenseUpdate {
  expenseId: string;
  body: IExpenseAdd;
}
interface IExpenseUpdateRes extends IExpenseAddRes { }
interface IExpenseDeleteRes extends IExpenseAddRes { }

const admin_expense_tag = "admin_expense";

export const ExpenseApi = api
  .enhanceEndpoints({ addTagTypes: [admin_expense_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getExpense: build.query<IExpenseRes, void>({
        query: () => expense_api.expense_get,
        providesTags: [admin_expense_tag],
      }),
      // show
      getExpenseById: build.query<
        IExpenseByIdRes,
        { expenseId: string | 0 }
      >({
        query: ({ expenseId }) => expense_api.expense_get_by_id(expenseId),
        providesTags: [admin_expense_tag],
      }),
      // post
      addExpense: build.mutation<IExpenseAddRes, IExpenseAdd>({
        query: (body) => ({
          url: expense_api.expense_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [admin_expense_tag],
      }),
      // put
      putExpense: build.mutation<IExpenseUpdateRes, IExpenseUpdate>({
        query: ({ body, expenseId }) => ({
          url: expense_api.expense_update(expenseId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [admin_expense_tag],
      }),
      // delete
      deleteExpense: build.mutation<
        IExpenseDeleteRes,
        { expenseId: string }
      >({
        query: ({ expenseId }) => ({
          url: expense_api.expense_update(expenseId),
          method: "DELETE",
        }),
        invalidatesTags: [admin_expense_tag],
      }),
    }),
  });

export const {
  useGetExpenseQuery,
  useGetExpenseByIdQuery,
  useAddExpenseMutation,
  usePutExpenseMutation,
  useDeleteExpenseMutation,
} = ExpenseApi;

export const {
  endpoints: {
    getExpense,
    getExpenseById,
    addExpense,
    putExpense,
    deleteExpense,
  },
} = ExpenseApi;
