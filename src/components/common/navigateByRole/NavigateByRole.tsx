import React from "react";
import { Navigate } from "react-router-dom";
import { role_list } from "../../../constants/const";
import { admin_routes, auth_routes, cashier_routes, sales_routes } from "../../../constants/path";

type TNavigateByRoleProps = {
  role: string;
};

const NavigateByRole: React.FC<TNavigateByRoleProps> = ({role}) => {
  // swtich
  switch (role) {
    case role_list.admin: return <Navigate to={admin_routes.home} replace={true} />;
    case role_list.sales: return <Navigate to={sales_routes.home} replace={true} />;
    case role_list.cashier: return <Navigate to={cashier_routes.home} replace={true} />;
    default: return <Navigate to={auth_routes.login} replace={true}/>;
  }
  
  
};

export default NavigateByRole;
