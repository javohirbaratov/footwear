import {
  Apps,
  AssignmentInd,
  Business,
  Category,
  Insights,
  Settings,
  ShoppingCart,
} from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListSubheader } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { blue } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { admin_routes } from "../../../constants/path";

type TListItem = {
  key: string | number;
  icon: React.ReactNode;
  label: string;
};

const listItems: TListItem[] = [
  {
    key: admin_routes.home,
    icon: <Insights />,
    label: "Dashboard",
  },
  {
    key: admin_routes.user,
    icon: <AssignmentInd />,
    label: "User",
  },
  {
    key: admin_routes.product,
    icon: <ShoppingCart />,
    label: "Mahsulotlar",
  },
  {
    key: admin_routes.category,
    icon: <Category />,
    label: "Kategoriya",
  },
  {
    key: admin_routes.expense,
    icon: <Category />,
    label: "Harajat turlari",
  },
];

const departItems: TListItem[] = [
  {
    key: 3,
    icon: <Apps />,
    label: "...",
  },
];

export default function AdminMenuList() {
  const [open, setOpen] = React.useState(true);

  // pathname
  const { pathname } = useLocation();

  // Navigation
  const navigate = useNavigate();

  // menu
  const handleClick = () => {
    setOpen(!open);
  };

  // Navigate
  const handleNavigate = (to: string | number) => {
    navigate(to.toString());
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {listItems.map((item) => (
        <ListItemButton
          key={item.key}
          selected={pathname === item.key}
          sx={{
            borderRadius: "10px",
            color: "#3E3D45",
            "&.Mui-selected": {
              backgroundColor: blue[50],
              color: blue[600],
            },
            "&.Mui-selected .MuiListItemIcon-root, &.Mui-selected .MuiListItemText-primary":
              { color: blue[600] },
          }}
          onClick={() => handleNavigate(item.key)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}

      {/* Department control */}
      <ListSubheader component="div" id="nested-list-subheader">
        Bo'limlar boshqaruvi
      </ListSubheader>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Business />
        </ListItemIcon>
        <ListItemText primary="Bo'limlar" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {departItems.map((item) => (
            <ListItemButton
              key={item.key}
              selected={pathname === item.key}
              sx={{
                pl: 4,
                borderRadius: "10px",
                "&.Mui-selected": { backgroundColor: blue[500], color: "#fff" },
                "&.Mui-selected .MuiListItemIcon-root, &.Mui-selected .MuiListItemText-primary":
                  { color: "#fff" },
                "&.Mui-hover": { backgroundColor: blue[500] },
              }}
              onClick={() => handleNavigate(item.key)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      {/* Settings */}
      <ListSubheader component="div" id="nested-list-subheader">
        Sozlamalar
      </ListSubheader>
      <List>
        <ListItemButton
          selected={pathname === admin_routes.profileSettings}
          sx={{ 
            borderRadius: "10px",
            "&.Mui-selected": { backgroundColor: blue[500], color: "#fff" },
            "&.Mui-selected .MuiListItemIcon-root, &.Mui-selected .MuiListItemText-primary":
              { color: "#fff" },
            "&.Mui-hover": { backgroundColor: blue[500] },
          }}
          onClick={() => handleNavigate(admin_routes.profileSettings)}
        >
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary={'Sozlamalar'} />
        </ListItemButton>
      </List>
    </List>
  );
}
