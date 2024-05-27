import { lazy } from "react";

export const AuthLayout = lazy(() => import("./auth/AuthLayout"));
export const AdminLayout = lazy(() => import("./admin/AdminLayout"));
export const SalesLayout = lazy(() => import("./sales/SalesLayout"));
// cashier
export const CashierLayout = lazy(() => import("./cashier/CashierLayout"));
export const CashierDeedsLayout = lazy(() => import("./cashier/CashierDeedsLayout"));