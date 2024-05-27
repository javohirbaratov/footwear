import { Box } from "@mui/material";
import React from "react"; 
import { IAppMenuListItem } from "../appMenu/AppMenuItem";

type TMainLayoutProps = {
  children: React.ReactNode;
  appMenuData: IAppMenuListItem[];
};

const MainLayout: React.FC<TMainLayoutProps> = ({ children, appMenuData }) => {
  return (
    <Box p={"14px"}>
      {/* <AppMenu data={appMenuData} />  */}
      {children}
    </Box>
  );
};

export default MainLayout;
