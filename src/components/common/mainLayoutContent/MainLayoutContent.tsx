import { Box } from "@mui/material";
import React from "react";

type TMainLayoutContentProps = {
  children: React.ReactNode;
};

const MainLayoutContent: React.FC<TMainLayoutContentProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {children}
    </Box>
  );
};

export default MainLayoutContent;
