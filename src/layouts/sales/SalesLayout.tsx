import { useMemo } from "react";
import AppMenu from "../../components/common/appMenu/AppMenu";
import { IAppMenuListItem } from "../../components/common/appMenu/AppMenuItem";
import {
  HistoryColorIcon,
  UserColorIcon,
} from "../../components/common/colorIcon";
import CubeColorIcon from "../../components/common/colorIcon/CubeColorIcon";
import MainLayout from "../../components/common/mainLayout/MainLayout";

import MainOutlet from "../../components/common/mainOutlet/MainOutlet";
import MobileBar from "../../components/common/mobileBar/MobileBar";
import { IBottomBarBtn } from "../../components/common/mobileBar/MobileBarBtn";
import {
  CartIcon,
  CubeIcon,
  HomeIcon,
  SettingsIcon,
} from "../../components/icons";
import { sales_routes } from "../../constants/path";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const data: IBottomBarBtn[] = [
  {
    id: sales_routes.home,
    label: "Asosiy",
    icon: <HomeIcon />,
  },
  {
    id: sales_routes.order,
    label: "Buyurtma",
    icon: <CartIcon />,
  },
  {
    id: sales_routes.productByCategory,
    label: "Mahsulot",
    icon: <CubeIcon />,
  },
  {
    id: sales_routes.profile,
    label: "Profil",
    icon: <SettingsIcon />,
  },
];

const appMenuData: IAppMenuListItem[] = [
  {
    id: "0",
    label: "Mijozlar",
    icon: <UserColorIcon />,
    route: sales_routes.customer,
  },
  {
    id: "1",
    label: "Sotuv tarixi",
    icon: <HistoryColorIcon />,
    route: sales_routes.salesHistory
  },
  {
    id: "2",
    label: "Zahira",
    icon: <CubeColorIcon />,
    route: sales_routes.spare
  },
];

const SalesLayout = () => {

  // pathname
  const { pathname } = useLocation();

  // Memo
  const isShowBar = useMemo(() => {
    if(
      pathname.endsWith('/show') || 
      pathname.endsWith("/productByCategory")
    ) return false

    switch (pathname) {
      case sales_routes.orderAdd: return false
      case sales_routes.productAdd: return false
      default: return true;
    }
  }, [pathname]);

  return (
    <MainLayout appMenuData={appMenuData}>
      <MainOutlet />

      <AppMenu data={appMenuData} />

      {/* Bar */}
      {isShowBar ? (
        <Box sx={{height:'90px'}}>
          <MobileBar data={data} />
        </Box>
      ) : null}
    </MainLayout>
  );
};

export default SalesLayout;
