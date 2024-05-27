import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import { IUserUpdate } from "../../../../app/services/user/user";
import { Drawer } from "@mui/material";
import UpdateUserData from "./UpdateUserData";
import { MOBILE_SCREEN } from "../../../../constants/const";
import SectionTitle from "../../../common/sectionTitle/SectionTitle";

export type TUpdateUserDrawerMethods = {
  onOpen: (data: IUserUpdate) => void;
  onClose: () => void;
};

type TUpdateUserDrawerState = {
  open: boolean;
  updateableData: IUserUpdate | null;
};

const UpdateUserDrawer = forwardRef<TUpdateUserDrawerMethods>((props, ref) => {
  // State
  const [open, setOpen] = useState<TUpdateUserDrawerState>({
    open: false,
    updateableData: null,
  });

  // Drawer
  const onOpen = (updateableData: IUserUpdate) =>
    setOpen({ open: true, updateableData });
  const onClose = () => setOpen({ open: false, updateableData: null });

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
      title="Example"
    >
      <SectionTitle title="Tahrirlash" />
      {open.updateableData ? (
        <UpdateUserData onClose={onClose} initialValues={open.updateableData} />
      ) : null}
    </Drawer>
  );
});

export default memo(UpdateUserDrawer);
