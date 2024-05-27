import { Button, CssBaseline, SxProps, Theme } from "@mui/material";
import styles from "./sectionCardBtn.module.css";

import React from "react";

export interface ISectionCardBtnProps {
  sx?: SxProps<Theme> | undefined;
  icon: React.ReactElement;
  title: string;
  caption: string;
}

const SectionCardBtn: React.FC<ISectionCardBtnProps> = ({
  sx,
  icon,
  title,
  caption,
}) => {
  return (
    <Button
      sx={{
        ...(sx ? sx : {}),
        borderRadius: "100px",
        bgcolor: "var(--gr-color)",
        display: "flex",
        gap: 1,
        justifyContent: "start",
      }}
    >
      <CssBaseline />
      <div className={styles.sectionCardIcon}>{icon}</div>
      <div className={styles.sectionCardBody}>
        <p className={styles.sectionCardTitle}>{title}</p>
        <small className={styles.sectionCardCaption}>{caption}</small>
      </div>
    </Button>
  );
};

export default SectionCardBtn;
