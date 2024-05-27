import { Drawer } from "@mui/material";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import SectionTitle from "../../../../../components/common/sectionTitle/SectionTitle";
import { MOBILE_SCREEN } from "../../../../../constants/const";
import SalesCustomerAddData from "./SalesCustomerEditData";

export type TEditCustomerDrawerMethods = {
  onOpen: (customerId: number) => void;
  onClose: () => void;
};

type TEditUserDrawerState = {
  open: boolean;
  customerId: number | null;
};

const SalesCustomerAddBottomDrawer = forwardRef<TEditCustomerDrawerMethods>((props, ref) => {
  // State
  const [open, setOpen] = useState<TEditUserDrawerState>({
    open: false,
    customerId: null,
  });

  const onOpen = (customerId: number) =>
    setOpen({ open: true, customerId });
  const onClose = () => setOpen({ open: false, customerId: null });

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
      {open.customerId ? (
        <SalesCustomerAddData onClose={onClose} customerId={open.customerId.toString()} />
      ) : null}

    </Drawer>
  );
});

export default memo(SalesCustomerAddBottomDrawer);
