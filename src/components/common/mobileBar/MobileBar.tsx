import { Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import MobileBarBtn, { IBottomBarBtn } from "./MobileBarBtn";

type TMobileBarProps = {
  data: IBottomBarBtn[];
};

export default function MobileBar({ data }: TMobileBarProps) {
  // location
  const { pathname } = useLocation();

  // Navigate
  const navigate = useNavigate();

  // Navigate
  const handleNavigate = (to: string) => {
    if (!data.find((item) => item.id === to)?.onClick) navigate(to);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 21,
        left: 0,
        right: 0,
        px: 1,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 10,
          mx: 1,
          maxWidth: 700,
          p: "5px",
          margin: "auto",
        }}
      >
        <Box
          component={motion.div}
          layout
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}
        >
          {data.map((item) => (
            <MobileBarBtn
              {...item}
              isActive={item.id === pathname}
              key={item.id}
              onNavigate={handleNavigate}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
