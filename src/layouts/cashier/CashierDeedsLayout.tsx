import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MainHeader from '../../components/common/mainHeader/MainHeader'
import MainLayoutContent from '../../components/common/mainLayoutContent/MainLayoutContent'
import MainOutlet from '../../components/common/mainOutlet/MainOutlet'
import MyTabs, { TMyTabs } from '../../components/common/myTabs/MyTabs'
import { cashier_routes } from '../../constants/path'

const tabs: TMyTabs[] = [
  {
    value: 0,
    text: "Qarz",
    route: cashier_routes.deedDebt,
  },
  {
    value: 1,
    text: "Harajat",
    route: cashier_routes.deedExpense,
  },
  {
    value: 2,
    text: "O'tkazma",
    route: cashier_routes.deedTransfer,
  }
]

const CashierDeedsLayout = () => {  
  // pathname
  const {pathname} = useLocation(); 

  // Navigate
  const navigate = useNavigate()

  // Handle select tab
  const handleSelectTab = useCallback((event: React.SyntheticEvent, value: number) => {
    const route = tabs.find(item => item.value === value)
    if(route) navigate(route.route); 
  },[navigate]);

  // Handle navigate history
  const handleNavigateHistory = useCallback(() =>{
    navigate(`${pathname}/history`);
  }, [navigate, pathname])

  return (
    <>
      {/* Header */}
      <MainHeader title="Amallar" btnTitle="Tarix" btnOnPress={handleNavigateHistory} />

      <MainLayoutContent>
        <MyTabs tabs={tabs} value={tabs.findIndex(item => item.route === pathname)} handleChange={handleSelectTab} label={"Jarayonda Topshirildi"} />

        <MainOutlet />
      </MainLayoutContent>
    </>
  )
}

export default CashierDeedsLayout