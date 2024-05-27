import { lazy } from "react";

export const CashierHome = lazy(() => import('./home/CashierHome'))
export const CashierDeeds = lazy(() => import('./deeds/CashierDeeds'))
export const CashierOrder = lazy(() => import('./order/CashierOrder'))
export const CashierOrderShow = lazy(() => import('./orderShow/CashierOrderShow'))
export const CashierRecoverDebet = lazy(() => import('./recoverDebet/CashierRecoverDebet'))
export const CashierBalance = lazy(() => import('./balance/CashierBalance'));
export const CashierDebetHistory = lazy(() => import('./debetHistory/CashierDebetHistory'));
export const CashierDebetHistoryShow = lazy(() => import('./debetHistoryShow/CashierDebetHistoryShow'));
// deeds
export const CashierDeedDebt = lazy(() => import('./deedDebt/CashierDeedDebt'));
export const CashierDeedTransfer = lazy(() => import('./deedTransfer/CashierDeedTransfer'));
export const CashierDeedTransferHistory = lazy(() => import('./transferHistory/CashierTransferHistory'));
export const CashierDeedExpense = lazy(() => import('./deedExpense/CashierDeedExpense'));
export const CashierDeedExpenseHistory = lazy(() => import('./expenceHistory/CashierExpenceHistory'));

export const CashierSalesHistory = lazy(() => import('./salesHistory/CashierSalesHistory'));
export const CashierCustomerBalance = lazy(() => import('./customerBalance/CustomerBalance'));
export const CashierReport = lazy(() => import('./report/CashierReport'));
