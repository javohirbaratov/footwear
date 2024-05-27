import React, { useCallback } from 'react';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import CashierCustomerDeptHistory from './components/CashierCustomerDeptHistory';
import { useNavigate } from 'react-router-dom';

const CashierDebetHistory: React.FC = () => {

  //navigate
  const navigate = useNavigate();

  const backNavigate = useCallback(() => {
    navigate(-1)
  } , [navigate])

  return (
    <>
      <MainHeader backTitle='Amallar' backOnPress={backNavigate} />

      <MainLayoutContent>
        <CashierCustomerDeptHistory />
      </MainLayoutContent>
    </>

  );
};

export default CashierDebetHistory;