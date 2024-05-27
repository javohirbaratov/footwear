// Main url
export const main_url = "https://sezon-mysystem.uz/api";

// Auth
const auth_api = {
  login: "/auth/login",
};

// User
const user_api = {
  user_get: "/user",
  user_update: "/user",
  user_update_password: "/user/password",
  user_logout: "/user/logout",
};

// CUSTOMER - [admin,sales]
const customer_api = {
  customer_get: "/customers",
  customer_get_by_id: (id: string) => `/customers/${id}`,
  customer_add: "/customers",
  customer_update: (id: string) => `/customers/${id}`,
  customer_delete: (id: string) => `/customers/${id}`,
};

// EXPENSE - [admin,cashier]
const expense_api = {
  expense_get: "/expenses",
  expense_get_by_id: (id: string | 0) => `/expenses/${id}`,
  expense_add: "/expenses",
  expense_update: (id: string) => `/expenses/${id}`,
  expense_delete: (id: string) => `/expenses/${id}`,
}

// Admin
const admin_api = {
  // user
  user_get: "/admin/users",
  user_add: "/admin/users",
  user_update: (id: string) => `/admin/users/${id}`,
  user_delete: (id: string) => `/admin/users/${id}`,
  // category
  category_get: "/categories",
  category_get_by_id: (id: string | 0) => `/categories/${id}`,
  category_add: "/categories",
  category_update: (id: string) => `/categories/${id}`,
  category_delete: (id: string) => `/categories/${id}`,
  // product
  product_get: "/admin/products",
  product_get_by_id: (id: string | null) => `/admin/products/${id}`,
  product_add: "/admin/products",
  product_update: (id: string) => `/admin/products/${id}`,
  product_delete: (id: string) => `/admin/products/${id}`,
};

// Sales
const sales_api = {
  // order
  order_get: "/sales/orders",
  order_get_by_id: (id: string | null) => `/sales/orders/${id}`,
  order_add: "/sales/orders",
  order_update: (id: number | null) => `/sales/orders/${id}`,
  order_delete: (id: number | null) => `/sales/orders/${id}`,

  // Products
  product_get: "/sales/products",
  product_get_by_id: (id: number| null) => `/sales/products/${id}`,
  product_get_by_category_id: (id: string | null) => `/sales/products?category_id=${id}`,

  //ReceivingProducts
  receiving_products_add: "/receives"
}

const cashier_api = {
  // order
  order: "/cashier/orderFromSales",
  order_get_by_status:(status: string | null) =>  `/cashier/orderFromSales?status=${status}`,
  order_get_by_id: (id: string | null) => `/cashier/orderFromSales/${id}`,

  // payment 
  cashier_payments: "/cashier/payments",
  cashier_payments_add: "/cashier/payments",

  //debet
  recover_debet: "/cashier/paymentCustomerDebt",

  // balance 
  balance : "/cashier/cash"

}
export { auth_api, user_api, customer_api, expense_api, admin_api, sales_api, cashier_api };
