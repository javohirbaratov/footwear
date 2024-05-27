import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";

export type TMainDialogMethods = {
  onOpen: (deletableName: string, deleteableId: number) => void;
  onClose: Function;
};

type TMainDialogProps = {
  onDelete: (deleteableId: number) => void;
  isLoading: boolean;
};

type TDialogState = {
  open: boolean;
  deletableName: string;
  deleteableId: number | null;
};

const MainDialog = forwardRef<TMainDialogMethods, TMainDialogProps>(
  (props, ref) => {
    const { onDelete, isLoading } = props;
    // State
    const [open, setOpen] = useState<TDialogState>({
      open: false,
      deletableName: "",
      deleteableId: null,
    });

    // Dialog
    const onOpen = (deletableName: string, deleteableId: number) => {
      setOpen({ open: true, deletableName, deleteableId });
    };
    const onClose = () => {
      setOpen({ open: false, deletableName: "", deleteableId: null });
    };

    useImperativeHandle(ref, () => ({
      onOpen,
      onClose,
    }));

    // handle confirm
    const handleConfirm = (id: number | null) => (id ? onDelete(id) : null);

    return (
      <Dialog open={open.open} onClose={onClose}>
        <DialogTitle>
          <b>{open.deletableName}</b><small>ni o'chirmoqchimisiz?</small>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Agar buni o'chiradigan bo'lsangiz buni qayta tiklab bo'lmaydi!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Bekor qilish
          </Button>
          <LoadingButton
            onClick={() => handleConfirm(open.deleteableId)}
            autoFocus
            color="error"
            loading={isLoading}
          >
            O'chirish
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }
);

export default MainDialog;
