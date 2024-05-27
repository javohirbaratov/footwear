import { Drawer } from "@mui/material";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { MOBILE_SCREEN } from "../../../../constants/const";
import UpdateUserPasswod from "./UpdateUserPasswod";
import SectionTitle from "../../../common/sectionTitle/SectionTitle";

export type TUpdateUserPasswordDrawerMethods = {
  onOpen: () => void;
  onClose: () => void;
};

type TUpdateUserPasswordDrawerState = {
  open: boolean;
};

const UpdateUserPasswordDrawer = forwardRef<TUpdateUserPasswordDrawerMethods>(
  (props, ref) => {
    // State
    const [open, setOpen] = useState<TUpdateUserPasswordDrawerState>({
      open: false,
    });

    // Drawer
    const onOpen = () => setOpen({ open: true });
    const onClose = () => setOpen({ open: false });

    useImperativeHandle(ref, () => ({
      onOpen,
      onClose,
    }));

    return (
      <Drawer
        open={open.open}
        onClose={onClose}
        anchor={MOBILE_SCREEN > window.innerWidth ? "bottom" : "right"}
        PaperProps={{ sx: { p: "14px" } }}
      >
        <SectionTitle title="Parolni o'zgartirish" />
        <UpdateUserPasswod onClose={onClose} />
      </Drawer>
    );
  }
);

export default memo(UpdateUserPasswordDrawer);
