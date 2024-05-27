import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  selectedIsAuthenticated,
  selectedUserRoles,
} from "../../../app/services/auth/authSlice";
import { useTypedSelector } from "../../../app/store";
import { auth_routes } from "../../../constants/path";

type TAuthRequiredProps = {
  roles: string[];
};

const AuthRequired: React.FC<TAuthRequiredProps> = ({ roles }) => {
  // Roles
  const currentRoles = useTypedSelector(selectedUserRoles);
  const isAuthenticated = useTypedSelector(selectedIsAuthenticated);

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(auth_routes.login);
  }, [isAuthenticated, navigate]);

  return isAuthenticated &&
    roles.find((role) => currentRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={auth_routes.login} replace={true} />
  );
};

export default AuthRequired;
