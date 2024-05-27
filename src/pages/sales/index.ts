import { lazy } from "react";

export const SalesHome = lazy(() => import('./home/SalesHome'))
export const SalesOrder = lazy(() => import('./order/SalesOrder'))
export const SalesOrderAdd = lazy(()  => import("./orderAdd/SalesOrderAdd"));
export const SalesOrderShow = lazy(()  => import("./orderShow/SalesOrderShow"));
export const SalesProductByCategory = lazy(()  => import("./productByCategory/SalesProductByCategory"));
export const SalesProduct = lazy(()  => import("./product/SalesProduct"));
export const SalesProductAdd = lazy(()  => import("./productAdd/SalesProductAdd"));
export const SalesCustomer = lazy(()  => import("./customer/SalesCustomer"));
export const SalesHistory = lazy(()  => import("./salesHistory/SalesHistory"));
export const SalesHistoryShow = lazy(()  => import("./salesHistoryShow/SalesHistoryShow")); 
export const SalesSpare = lazy(()  => import("./spare/SalesSpare")); 