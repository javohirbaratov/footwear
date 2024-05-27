import { lazy } from "react";

export const AdminHome = lazy(() => import('./home/AdminHome'));
export const AdminUser = lazy(() => import('./user/AdminUser'));
export const AdminProduct = lazy(() => import('./product/AdminProduct'));
export const AdminCategory = lazy(() => import('./category/AdminCategory'));
export const AdminExpense = lazy(() => import('./expense/AdminExpense'));