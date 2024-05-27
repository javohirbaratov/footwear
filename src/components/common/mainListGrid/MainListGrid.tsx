import { Grid } from "@mui/material";
import React from "react";
import style from "./mainListGrid.module.css";
interface MainListGridProps {
  children: React.ReactNode; 
}

const MainListGrid: React.FC<MainListGridProps> = ({ children }) => {
  return (
    <Grid className={style.listContainer} container rowSpacing={1} alignItems="center">
      {children}
    </Grid>
  );
};

export default MainListGrid;
