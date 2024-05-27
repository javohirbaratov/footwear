import { Box, Button, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../../app/services/appMenu/appMenuSlice";
import { ArrowLeftIcon, MenuIcon } from "../../icons";
import PageTitle from "../pageTitle/PageTitle";

type TMainHeaderProps = {
  title?: string;
  btnTitle?: string;
  btnOnPress?: () => void;
  backTitle?: string;
  backOnPress?: () => void;
};

const MainHeader: React.FC<TMainHeaderProps> = ({
  title,
  btnTitle,
  btnOnPress = () => {},
  backTitle,
  backOnPress = () => {},
}) => {
  // Dispatch
  const dispatch = useDispatch();

  // Trigger
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 2,
  });

  // Drawer
  const handleToggle = () => dispatch(toggleMenu());

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          boxShadow: !trigger ? "none" : "default",
          bgcolor: !trigger ? "transparent" : "#ffff",
        }}
      >
        <Toolbar>
          {backTitle ? (
            <Button
              sx={{ p: 0, ml: -1 }}
              color="info"
              size="small"
              variant="text"
              onClick={() => backOnPress()}
            >
              <ArrowLeftIcon />
              {backTitle}
            </Button>
          ) : (
            <IconButton
              size="medium"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => handleToggle()}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box flexGrow={1} textAlign={"center"}>
            <PageTitle title={title ? title : ""} />
          </Box>
          {btnTitle ? (
            <Button
              color="info"
              size="small"
              variant="text"
              onClick={() => (btnOnPress ? btnOnPress() : null)}
            >
              {btnTitle}
            </Button>
          ) : (
            <Box width={54}></Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </React.Fragment>
  );
};

export default React.memo(MainHeader);
