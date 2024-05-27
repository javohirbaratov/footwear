import { Box, Drawer, List, Skeleton } from "@mui/material";
import { forwardRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectedAppMenuIsOpen,
  toggleMenu,
} from "../../../app/services/appMenu/appMenuSlice";
import { useTypedSelector } from "../../../app/store";
import ElementLoading from "../elementLoading/ElementLoading";
import PageTitle from "../pageTitle/PageTitle";
import AppMenuItem, { IAppMenuListItem } from "./AppMenuItem";

export type TAppMenuMethods = {
  onOpen: () => void;
  onClose: () => void;
};

type TAppMenuProps = {
  data: IAppMenuListItem[];
};

const AppMenu = forwardRef<TAppMenuMethods, TAppMenuProps>(({ data }, ref) => {
  // location
  const { pathname } = useLocation();

  // Dispatch
  const dispatch = useDispatch();

  // Navigate
  const navigate = useNavigate();

  // App menu
  const isOpen = useTypedSelector(selectedAppMenuIsOpen);

  // Drawer
  const handleToggleDrawer = useCallback(
    () => dispatch(toggleMenu()),
    [dispatch]
  );

  const handleNavigate = useCallback(
    (to: string) => {
      handleToggleDrawer();
      navigate(to);
    },
    [handleToggleDrawer, navigate]
  );

  return (
    <Drawer
      open={isOpen}
      onClose={handleToggleDrawer}
      PaperProps={{
        sx: {
          borderRadius: 0,
          width: "70%",
          maxWidth: "300px",
          pl: "12px",
          pr: "7px",
          py: "10px",
        },
      }}
    >
      <Box mb={"18px"}>
        <PageTitle title="Menular" />
      </Box>
      <ElementLoading
        skeletonElement={
          <>
            <List sx={{ p: 0 }}>
              {data.map((item) => (
                <Skeleton height={36} key={item.id} />
              ))}
            </List>
          </>
        }
      >
        <List sx={{ p: 0 }}>
          {data.map((item) => (
            <AppMenuItem
              {...item}
              key={item.id}
              isActive={item.route === pathname}
              onPress={() => handleNavigate(item.route)}
            />
          ))}
        </List>
      </ElementLoading>
    </Drawer>
  );
});

export default AppMenu;
