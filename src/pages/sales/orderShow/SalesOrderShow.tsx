import { Box, Grid } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ISalesOrder, useGetSalesOrderByIdQuery } from '../../../app/services/sales/order/order';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import MainListGrid from '../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../components/common/mainListGridItem/MainListGridItem';
import SectionTitle from '../../../components/common/sectionTitle/SectionTitle';
import { sales_routes } from '../../../constants/path';


const SalesOrderShow: React.FC = () => {
  // Navigate 
  const navigate = useNavigate();
  const btnOnPress = useCallback(() => {
    navigate(sales_routes.order);
  }, [navigate]);

  // Params
  const { id } = useParams<{ id: string }>();

  // Api 
  const orderByIdRes = useGetSalesOrderByIdQuery({
    orderId: id ? id : null
  });

  // Memo
  const data = useMemo<ISalesOrder | null>(() => {
    if (orderByIdRes.data?.success && orderByIdRes.data?.data) {
      return orderByIdRes.data?.data;
    }
    return null;
  }, [orderByIdRes]);


  return (
    <>
      {/* Header */}
      <MainHeader backTitle="Buyurtmalar" backOnPress={btnOnPress} />

      <MainLayoutContent>
        {/* Page title  */}

        <SectionTitle title={"Mahsulotlar"} caption={data ? data.customer.firstname + data.customer.lastname : ""} />

        {/* Product List  */}
        <Box>
          <MainListGrid>
            {
              data?.products.length && (
                data.products?.map((item, index) => (
                  <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <MainListGridItem
                      title={item.name}
                      isActive={false}
                      caption={"Block: " + item.sale_block + "ta"}
                    />
                  </Grid>
                ))
              )
            }
          </MainListGrid>
        </Box>
      </MainLayoutContent>


    </>
  );
};

export default SalesOrderShow;