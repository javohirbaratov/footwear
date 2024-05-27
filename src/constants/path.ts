// Auth
export const auth_routes = {
  login: '/login',
}

// Private
export const admin_routes = {
  home: "/admin",
  user: "/admin/user",
  product: "/admin/product",
  category: "/admin/category",
  expense: "/admin/expense",
  profileSettings: '/admin/profileSettings'
}

export const sales_routes = {
  home: "/sales",
  order: "/sales/order",
  orderAdd: "/sales/orderAdd",
  orderShow: "/sales/order/:id/show",
  productByCategory: "/sales/productsByCategory",
  product: "/sales/productsByCategory/:categoryId/productByCategory",
  productAdd: "/sales/productAdd",
  profile: "/sales/profile",
  customer: "/sales/customer",
  salesHistory: "/sales/salesHistory",
  salesHistoryShow: "/sales/salesHistory/:customerId/salesHistory",
  spare: "/sales/spare"
}

export const cashier_routes = {
  home: "/cashier",
  // order 
  order: "/cashier/order",
  orderShow: "/cashier/order/:id/show",
  // deeds
  deedDebt: "/cashier/deeds",
  deedExpense: "/cashier/deeds/expense",
  deedExpenseHistory: "/cashier/deeds/expense/history",
  deedTransfer: "/cashier/deeds/transfer",
  deedTransferHistory: "/cashier/deeds/transfer/history",
  recoverDebet: "/cashier/deeds/debet/:customerId/debetAdd",
  debetHistory: "/cashier/deeds/history",
  debetHistoryShow: "/cashier/deeds/debetHistory/:customerId/debetHistory",

  profile: "/cashier/profile",

  // sales history 
  salesHistory: "/cashier/salesHistory",
  //customer balance
  customerBalance: "/cashier/customer/balance",
  // balance 
  balance: "/cashier/balance",
  //report 
  report: "/cashier/report",

}