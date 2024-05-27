import { useMemo } from "react";
import { useGetCashierBalanceQuery } from "../../../app/services/cashier/balance/balance";
import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import CashierAnalyticsCard from "../../../components/department/cashier/analyticsCard/CashierAnalyticsCard";
import { PulseIcon } from "../../../components/icons";


const CashierBalance = () => {

  // Api 
  const { data, isLoading } = useGetCashierBalanceQuery();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return null;
  }, [data]);

  return (
    <>
      {/* Header */}
      <MainHeader title="Balans" />

      <MainLayoutContent>
        {/* Sales analytics */}
        <CashierAnalyticsCard
          title="Balans"
          caption="Jami kassa summasi"
          icon={<PulseIcon />}
          data={filterData}
          isLoading={isLoading}
        // toOfIcon="/example"
        />
      </MainLayoutContent>
    </>
  );
};

export default CashierBalance;
