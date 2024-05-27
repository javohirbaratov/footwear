import { Button, SxProps, Theme } from "@mui/material";
import styles from "./sectionCardActionBtn.module.css";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface ISectionCardBtnProps {
  sx?: SxProps<Theme> | undefined;
  icon: React.ReactElement;
  title: string;
  link?: string;
}

const SectionCardActionBtn: React.FC<ISectionCardBtnProps> = ({
  sx,
  icon,
  title,
  link,
}) => {
  //Navigate
  const navigate = useNavigate();

  const btnOnPress = useCallback(() => {
    if(!link) return
    navigate(link);
  }, [link, navigate]);
  return (
    <Button
      sx={{
        ...(sx ? sx : {}),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: "15px",
        bgcolor: "var(--gr-color)",
        padding: "8px 18px",
        minWidth: '100px'
      }}
      onClick={btnOnPress}
    >
      <div className={styles.sectionCardIcon}>{icon}</div>
      <p className={styles.sectionCardTitle}>{title}</p>
    </Button>
  );
};

export default SectionCardActionBtn;
