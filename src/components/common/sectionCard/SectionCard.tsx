import { Box, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../sectionTitle/SectionTitle";
import styles from "./sectionCard.module.css";

export interface ISectionCardProps {
  children?: React.ReactNode;
  title: string;
  caption: string | React.ReactNode;
  startIcon?: React.ReactElement;
  icon?: React.ReactElement;
  toOfIcon?: string;
  onPressOfIcon?: Function;
  isLoading?: boolean;
}

const SectionCard: React.FC<ISectionCardProps> = ({
  children,
  title,
  caption,
  startIcon,
  icon,
  toOfIcon = "",
  onPressOfIcon,
  isLoading=false,
}) => {
  // Navigate
  const navigate = useNavigate();

  // handle navigate
  const handleNavigate = (to: string) => {
    if (onPressOfIcon) onPressOfIcon();
    else if (to) navigate(to);
  };

  return (
    <div className={styles.sectionCard}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "row",
          mb: children ? 3 : 0,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
        >
          {startIcon ? (
            <div className={styles.sectionCardStartIcon}>{startIcon}</div>
          ) : null}
          <Box flexGrow={1} sx={{ mx: "6px", mt: "2px" }}>
            <SectionTitle title={title} caption={caption} isLoading={isLoading} />
          </Box>
        </Box>
        {icon ? (
          <Box>
            <IconButton onClick={() => handleNavigate(toOfIcon)}>
              {icon}
            </IconButton>
          </Box>
        ) : null}
      </Box>
      {children}
    </div>
  );
};

export default SectionCard;
