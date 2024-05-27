import { Grid } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSalesOrderQuery } from "../../../app/services/sales/order/order";
import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import MainListGrid from "../../../components/common/mainListGrid/MainListGrid";
import MainListGridItem from "../../../components/common/mainListGridItem/MainListGridItem";
import { ArrowRightIcon } from '../../../components/icons/index';
import SearchInput from "../../../components/ui/searchInput/SearchInput";
import { sales_routes } from "../../../constants/path";

const SalesOrder = () => {
  // State
  const [search, setSearch] = useState("");

  // Navigate 
  const navigate = useNavigate();

  const btnOnPress = useCallback(() => {
    navigate(sales_routes.orderAdd);
  }, [navigate]);

  // Api 
  const { data, isLoading } = useGetSalesOrderQuery();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  const onClick = (id: number) => {
    navigate(sales_routes.orderShow.replace(":id", id.toString()));
  }

  return (
    <>
      {/* Header */}
      <MainHeader
        title="Buyurtmalar"
        btnTitle="Qo'shish"
        btnOnPress={btnOnPress}
      />

      <MainLayoutContent>
        {/* Search input */}
        <SearchInput value={search} onChange={setSearch} />

        {/* User list */}
        <MainListGrid>
          {
            isLoading ? (
              <>Loading...</>
            ) : filterData.length ? (
              filterData.map((item) => (
                <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MainListGridItem
                    id={item.id}
                    title={item.customer.firstname + " " + item.customer.lastname}
                    isActive={false}
                    caption={"Miqdor " + item.products.length}
                    status={item.status}
                    endElem={<ArrowRightIcon />}
                    onPress={() => onClick(item.id)}
                  />
                </Grid>
              ))
            ) : (
              <>Buyurtma mavjud emas</>
            )
          }

        </MainListGrid>
      </MainLayoutContent>
    </>
  );
};

export default SalesOrder;
