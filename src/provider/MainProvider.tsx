import React from "react";
import { useAuthGetUserQuery } from "../app/services/auth/auth";
import { PageLoading } from "../pages";

type TMainProviderProps = {
  children: React.ReactNode;
};

const MainProvider: React.FC<TMainProviderProps> = ({ children }) => {
  const { isLoading } = useAuthGetUserQuery();

  return isLoading ? <PageLoading /> : <>{children}</>;
};

export default MainProvider;
