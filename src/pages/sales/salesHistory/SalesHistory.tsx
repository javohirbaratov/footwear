import { Grid } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSalesOrderQuery } from "../../../app/services/sales/order/order";
import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import MainListGrid from "../../../components/common/mainListGrid/MainListGrid";
import MainListGridItem from "../../../components/common/mainListGridItem/MainListGridItem";
import SectionTitle from "../../../components/common/sectionTitle/SectionTitle";
import { ArrowRightIcon } from "../../../components/icons";
import SearchInput from "../../../components/ui/searchInput/SearchInput";
import { sales_routes } from "../../../constants/path";

const SalesHistory = () => {
  // State 
  const [search, setSearch] = useState("");

  //Navigate
  const navigate = useNavigate();

  // Api 
  const { data, isLoading } = useGetSalesOrderQuery();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  //Navigate page
  const NavigatePage = useCallback((orderId: number | null) => {
    if (!orderId) throw new Error('`orderId` is required');

    navigate(sales_routes.salesHistoryShow.replace(":customerId", orderId.toString()));
  }, [navigate])

  return (
    <>
      {/* Header */}
      <MainHeader title="Sotuv Tarixi" />

      <MainLayoutContent>
        <SectionTitle caption={"Mijoz tanlang"} />
        {/* Search input */}
        <SearchInput value={search} onChange={setSearch} />

        {/* User list */}
        <MainListGrid>
          {
            isLoading ? (
              <>Loading...</>
            ) : !filterData.length ? (
              <>Not found</>
            ) : (
              filterData.map((item) => (
                <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MainListGridItem
                    id={item.id}
                    title={`${item.customer.firstname} ${item.customer.lastname}`}
                    isActive={false}
                    caption={"400 ta mahsulot bor"}
                    // status={item.status}
                    endElem={<ArrowRightIcon />}
                    onPress={NavigatePage}
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

export default SalesHistory;
