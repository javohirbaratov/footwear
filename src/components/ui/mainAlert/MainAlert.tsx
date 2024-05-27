import { Alert } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";

type TStatus = "warning" | "success" | "error" | "info" | null;
type TMyAlertProps = {
  status?: TStatus;
  title?: string;
  error: FetchBaseQueryError | SerializedError | undefined;
};

const MainAlert: React.FC<TMyAlertProps> = ({ status, title, error }) => {
  if (status && title) {
    return status && title ? (
      <Alert severity={status}>{title}</Alert>
    ) : null;
  }

  if (error && "status" in error) {
    if (error.status === "FETCH_ERROR") {
      return <Alert severity="warning">Ulanishda xatolik!</Alert>;
    } else if (error.data) { 
      const { message } = error.data as { message: string };
      return <Alert severity="error">{message}</Alert>;
    }
  }
  return <></>;

  // return severity ? <Alert severity={severity}>{title}</Alert> : null;
};

export default MainAlert;
