import { Navigate, Route, Routes } from "react-router-dom";
import AuthRequired from "./components/common/authRequired/AuthRequired";
import { role_list } from "./constants/const";
import { admin_routes, auth_routes, cashier_routes, sales_routes } from "./constants/path";
import { AdminLayout, AuthLayout, CashierDeedsLayout, CashierLayout, SalesLayout } from "./layouts";
import {
  AdminExpense,
  AdminHome,
  AdminProduct,
  AdminUser,
  CashierBalance,
  CashierDebetHistory,
  CashierDebetHistoryShow,
  CashierDeedExpense,
  CashierDeedExpenseHistory,
  // Cashier 
  CashierDeeds,
  CashierDeedTransfer,
  CashierDeedTransferHistory,
  CashierHome,
  CashierOrder,
  CashierOrderShow,
  CashierRecoverDebet,
  CashierReport,
  CashierSalesHistory,
  Login,
  Page404,
  Profile,
  SalesCustomer,
  SalesHistory,
  SalesHistoryShow,
  SalesHome,
  SalesOrder,
  SalesOrderAdd,
  SalesOrderShow,
  SalesProduct,
  SalesProductAdd,
  SalesProductByCategory,
  SalesSpare
} from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={auth_routes.login} replace={true} />}
      />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path={auth_routes.login} element={<Login />} />
      </Route>

      {/* Private */}

      {/* Admin */}
      <Route element={<AuthRequired roles={[role_list.admin]} />}>
        <Route path={admin_routes.home} element={<AdminLayout />}>
          <Route path={admin_routes.home} element={<AdminHome />} />
          <Route path={admin_routes.user} element={<AdminUser />} />
          <Route path={admin_routes.product} element={<AdminProduct />} />
          <Route path={admin_routes.category} element={<AdminProduct />} />
          <Route path={admin_routes.expense} element={<AdminExpense />} />
        </Route>
      </Route>

      {/* Sales */}
      <Route element={<AuthRequired roles={[role_list.sales]} />}>
        <Route path={sales_routes.home} element={<SalesLayout />}>
          <Route path={sales_routes.home} element={<SalesHome />} />
          <Route path={sales_routes.order} element={<SalesOrder />} />
          <Route path={sales_routes.orderAdd} element={<SalesOrderAdd />} />
          <Route path={sales_routes.orderShow} element={<SalesOrderShow />} />
          <Route
            path={sales_routes.productByCategory}
            element={<SalesProductByCategory />}
          />
          <Route path={sales_routes.product} element={<SalesProduct />} />
          <Route path={sales_routes.productAdd} element={<SalesProductAdd />} />
          <Route path={sales_routes.profile} element={<Profile />} />
          <Route path={sales_routes.customer} element={<SalesCustomer />} />
          <Route path={sales_routes.salesHistory} element={<SalesHistory />} />
          <Route path={sales_routes.salesHistoryShow} element={<SalesHistoryShow />} />
          <Route path={sales_routes.spare} element={<SalesSpare />} />
        </Route>
      </Route>

      {/* Cashier */}
      <Route element={<AuthRequired roles={[role_list.cashier]} />}>
        <Route path={cashier_routes.home} element={<CashierLayout />}>
          <Route path={cashier_routes.home} element={<CashierHome />} />
          <Route path={cashier_routes.order} element={<CashierOrder />} />
          <Route path={cashier_routes.orderShow} element={<CashierOrderShow />} />
          {/* Deeds */}
          <Route element={<CashierDeedsLayout />}>
            <Route path={cashier_routes.deedDebt} element={<CashierDeeds />} />
            <Route path={cashier_routes.deedExpense} element={<CashierDeedExpense />} />
            <Route path={cashier_routes.deedTransfer} element={<CashierDeedTransfer />} />
          </Route>

          {/* Deeds History  */}
          <Route path={cashier_routes.deedExpenseHistory} element={<CashierDeedExpenseHistory />} />
          <Route path={cashier_routes.deedTransferHistory} element={<CashierDeedTransferHistory />} />
          
          <Route path={cashier_routes.profile} element={<Profile />} />
          <Route path={cashier_routes.recoverDebet} element={<CashierRecoverDebet />} />
          <Route path={cashier_routes.debetHistory} element={<CashierDebetHistory />} />
          <Route path={cashier_routes.debetHistoryShow} element={<CashierDebetHistoryShow />} />
          
          {/* Saidebar menu  */}
          <Route path={cashier_routes.salesHistory} element={<CashierSalesHistory />} />
          <Route path={cashier_routes.balance} element={<CashierBalance />} />
          <Route path={cashier_routes.report} element={<CashierReport />} />
        </Route>
      </Route>

      {/* Page 404 */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
