import { Box, Button } from "@mui/material";
import React from "react";
import { ArrowRightIcon } from "../../icons";

export interface IAppMenuListItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
}

export interface IAppMenuListItemProps extends IAppMenuListItem {
  onPress?: () => void;
  isActive: boolean;
}

const AppMenuItem: React.FC<IAppMenuListItemProps> = ({
  id,
  label,
  icon,
  isActive,
  onPress = () => {},
}) => {
  return (
    <Button
      key={id}
      onClick={() => onPress()}
      fullWidth
      startIcon={icon}
      sx={{
        justifyContent: "start",
        "&.hover": {
          bgcolor: "none",
        },
        py: "4px",
        px: 1,
        pr: "4px",
        mb: 0.5,
      }}
      variant={isActive ? "contained" : "text"}
      color={isActive ? "secondary" : "inherit"}
      disableTouchRipple
    >
      <Box flexGrow={1} textAlign={"left"}>
        {label}
      </Box>
      <ArrowRightIcon color={isActive ? "#25252B" : "#BFBFBF"} />
    </Button>
  );
};

export default AppMenuItem;
