import { useState } from "react";
import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import MyTabs, { TMyTabs } from "../../../components/common/myTabs/MyTabs";
import CashierNewOrders from "./components/CashierNewOrders";
import CashierCompletedOrders from "./components/CashierCompletedOrders";

const tabs: TMyTabs[] = [
  {
    value: 0,
    text: "Yangi",
    route: "s"
  },
  {
    value: 1,
    text: "Bajarildi",
    route: "s"
  },
]

const CashierHome = () => {
  // State 
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {/* Header */}
      <MainHeader title="Sotuv" />

      <MainLayoutContent>
        <MyTabs tabs={tabs} value={value} handleChange={handleChange} label={"Jarayonda Topshirildi"} />
        {
          value === 0 ? (
            <>
              <CashierNewOrders />
            </>
          ) : (
            <>
              <CashierCompletedOrders />
            </>
          )
        }
      </MainLayoutContent>
    </>
  );
};

export default CashierHome;