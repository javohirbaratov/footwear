import { Grid } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISalesOrder, useGetSalesOrderByIdQuery } from "../../../app/services/sales/order/order";
import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import MainListGrid from "../../../components/common/mainListGrid/MainListGrid";
import MainListGridItem from "../../../components/common/mainListGridItem/MainListGridItem";
import SectionTitle from "../../../components/common/sectionTitle/SectionTitle";
import SearchInput from "../../../components/ui/searchInput/SearchInput";
import { sales_routes } from "../../../constants/path";

const SalesHistoryShow: React.FC = () => {
  // State 
  const [search, setSearch] = useState("");
  // Navigate 
  const navigate = useNavigate();
  const btnOnPress = useCallback(() => {
    navigate(sales_routes.salesHistory);
  }, [navigate]);

  // Params
  const { customerId } = useParams<{ customerId: string }>();

  // Api 
  const orderByIdRes = useGetSalesOrderByIdQuery({
    orderId: customerId ? customerId : null
  });

  // Memo
  const filterData = useMemo<ISalesOrder | null>(() => {
    if (orderByIdRes.data?.success && orderByIdRes.data?.data) {
      return orderByIdRes.data?.data;
    }
    return null;
  }, [orderByIdRes]);



  return (
    <>
      {/* Header */}
      <MainHeader backTitle="Sotuv tarixi" backOnPress={btnOnPress} />

      <MainLayoutContent>
        <SectionTitle caption={"Mijoz tanlang"} />
        {/* Search input */}
        <SearchInput value={search} onChange={setSearch} />

        {/* User list */}
        <MainListGrid>
          {
            !filterData?.products.length ? (
              <>Not found</>
            ) : (
              filterData.products.map((item, index) => (
                <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MainListGridItem
                    id={index}
                    title={item.name}
                    isActive={false}
                    caption={"400 ta mahsulot bor"}
                  // status={item.status}
                  // endElem={<ArrowRightIcon />}
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

export default SalesHistoryShow;