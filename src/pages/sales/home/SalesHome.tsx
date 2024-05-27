import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import ReportsCard from "../../../components/common/reportsCard/ReportsCard";
import SalesAnalyticsCard from "../../../components/department/sales/analyticsCard/SalesAnalyticsCard";
import { CubeIcon, PulseIcon } from "../../../components/icons";
 

const SalesHome = () => {
  return (
    <>
      {/* Header */}
      <MainHeader title="Asosiy" />

      <MainLayoutContent>
        {/* Sales analytics */}
        <SalesAnalyticsCard
          title="Sotuv & Pul Analitika"
          caption="Hisobotlar"
          icon={<PulseIcon />}
          // toOfIcon="/example"
        />

        <ReportsCard
          title="Sotuv & Pul Analitika"
          caption="Hisobotlar"
          startIcon={<CubeIcon />}
        />
      </MainLayoutContent>
    </>
  );
};

export default SalesHome;
