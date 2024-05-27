import { Grid } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCashierOrderByStatusQuery } from '../../../../app/services/cashier/order/order';
import MainListGrid from '../../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../../components/common/mainListGridItem/MainListGridItem';
import { ArrowRightIcon } from '../../../../components/icons';
import SearchInput from '../../../../components/ui/searchInput/SearchInput';
import { cashier_routes } from '../../../../constants/path';

interface CashierNewOrdersProps {

}

const CashierNewOrders: React.FC<CashierNewOrdersProps> = () => {
  // state 
  const [search, setSearch] = useState("");

  // Navigate 
  const navigate = useNavigate();

  // Api 
  const { data, isLoading } = useGetCashierOrderByStatusQuery({
    status : "inProgress"
  });
  // Memo
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
                  title={item.customer.firstname + " " + item.customer.lastname}
                  isActive={false}
                  caption={"Miqdor " + item.products.length}
                  status={item.status.name}
                  endElem={<ArrowRightIcon />}
                  onPress={toNavigate}
                />
              </Grid>
            ))
          )
        }
      </MainListGrid>
    </>
  );
};

export default memo(CashierNewOrders);