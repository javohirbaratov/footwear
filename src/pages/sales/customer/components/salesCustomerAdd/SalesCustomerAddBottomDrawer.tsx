import { Drawer } from "@mui/material";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import SectionTitle from "../../../../../components/common/sectionTitle/SectionTitle";
import { MOBILE_SCREEN } from "../../../../../constants/const";
import SalesCustomerAddData from "./SalesCustomerAddData";

export type TAddCustomerDrawerMethods = {
  onOpen: () => void;
  onClose: () => void;
};

type TUpdateUserDrawerState = {
  open: boolean;
};

const SalesCustomerAddBottomDrawer = forwardRef<TAddCustomerDrawerMethods>((props, ref) => {
  // State
  const [open, setOpen] = useState<TUpdateUserDrawerState>({
    open: false,
  });

  // Drawer
  const onOpen = () =>
    setOpen({ open: true });
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
      title="Example"
    >
      <SectionTitle title="Mijoz qo'shish" />
        <SalesCustomerAddData onClose={onClose} />
    </Drawer>
  );
});

export default memo(SalesCustomerAddBottomDrawer);
