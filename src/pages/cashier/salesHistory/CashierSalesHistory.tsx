import { Grid } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCashierPaymentQuery } from '../../../app/services/cashier/payment/payment';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import MainListGrid from '../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../components/common/mainListGridItem/MainListGridItem';
import SearchInput from '../../../components/ui/searchInput/SearchInput';
import { cashier_routes } from '../../../constants/path';

const CashierSalesHistory: React.FC = () => {
  // state 
  const [search, setSearch] = useState("");

  // Navigate 
  const navigate = useNavigate();

  // Api 
  const { data, isLoading } = useGetCashierPaymentQuery();


  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  const toNavigate = useCallback((id: number | null) => {
    if (!id) throw new Error("`productId` is required")

    navigate(cashier_routes.orderShow.replace(":id", id.toString()));
  }, [navigate]);

  return (
    <>
      {/* Header */}
      <MainHeader title="Sotuv tarixi" />

      <MainLayoutContent>
        {/* Search input */}
        <SearchInput value={search} onChange={setSearch} />
        <MainListGrid>
          {
            isLoading ? (
              <>
                Loading...
              </>
            ) : !filterData?.length ? (
              <>Buyurtma mavjud emas</>
            ) : (
              filterData.map((item) => (
                <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MainListGridItem
                    id={item.id}
                    title={item.comment||"Comment"}
                    isActive={false}
                    caption={"Miqdor " + item.id}
                    // status={item.status.name}
                    // endElem={<ArrowRightIcon />}
                    // onPress={toNavigate}
                  />
                </Grid>
              ))
            )
          }
        </MainListGrid>
      </MainLayoutContent>
    </>
  );
};

export default CashierSalesHistory;