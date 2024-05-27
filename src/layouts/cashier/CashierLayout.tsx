import { useMemo } from "react";
import AppMenu from "../../components/common/appMenu/AppMenu";
import { IAppMenuListItem } from "../../components/common/appMenu/AppMenuItem";
import {
  HistoryColorIcon,
  UserColorIcon,
} from "../../components/common/colorIcon";
import CubeColorIcon from "../../components/common/colorIcon/CubeColorIcon";
import MainLayout from "../../components/common/mainLayout/MainLayout";

import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { WalletColorIcon } from '../../components/common/colorIcon/index';
import MainOutlet from "../../components/common/mainOutlet/MainOutlet";
import MobileBar from "../../components/common/mobileBar/MobileBar";
import { IBottomBarBtn } from "../../components/common/mobileBar/MobileBarBtn";
import {
  CartIcon,
  HomeIcon,
  PharmacyIcon,
  SettingsIcon
} from "../../components/icons";
import { cashier_routes, sales_routes } from "../../constants/path";

const data: IBottomBarBtn[] = [
  {
    id: cashier_routes.home,
    label: "Asosiy",
    icon: <HomeIcon />,
  },
  {
    id: cashier_routes.order,
    label: "Sotuv",
    icon: <CartIcon />,
  },
  {
    id: cashier_routes.deedDebt,
    label: "Amallar",
    icon: <PharmacyIcon />,
  },
  {
    id: cashier_routes.profile,
    label: "Profil",
    icon: <SettingsIcon />,
  },
];

const appMenuData: IAppMenuListItem[] = [
  {
    id: "0",
    label: "Sotuv tarixi",
    icon: <HistoryColorIcon />,
    route: cashier_routes.salesHistory
  },
  {
    id: "1",
    label: "Mijozlar Balansi",
    icon: <UserColorIcon />,
    route:cashier_routes.customerBalance,
  },
  {
    id: "2",
    label: "Balans",
    icon: <WalletColorIcon />,
    route: cashier_routes.balance
  },
  {
    id: "3",
    label: "Hisobot",
    icon: <CubeColorIcon />,
    route:cashier_routes.report
  }
];

const CashierLayout = () => {

  // pathname
  const { pathname } = useLocation();

  // Memo
  const isShowBar = useMemo(() => {
    if(
      pathname.endsWith('/show') || 
      pathname.endsWith("/productByCategory") || 
      pathname.endsWith("/history")
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

export default CashierLayout;
