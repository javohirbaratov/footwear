import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import { sales_routes } from '../../../constants/path';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import SearchInput from '../../../components/ui/searchInput/SearchInput';
import MainListGrid from '../../../components/common/mainListGrid/MainListGrid';
import { Grid } from '@mui/material';
import MainListGridItem from '../../../components/common/mainListGridItem/MainListGridItem';
import { ArrowRightIcon } from '../../../components/icons';
import SectionTitle from '../../../components/common/sectionTitle/SectionTitle';

const data = [
  {
    id: 1,
    name: "Category 1",
    parent: null,
    created_at: "10-05-2024 11:03:25",
    updated_at: "10-05-2024 11:03:25"
  },
  {
    id: 2,
    name: "Category 1",
    parent: null,
    created_at: "10-05-2024 11:03:25",
    updated_at: "10-05-2024 11:03:25"
  },
  {
    id: 3,
    name: "Category 1",
    parent: null,
    created_at: "10-05-2024 11:03:25",
    updated_at: "10-05-2024 11:03:25"
  },
  {
    id: 4,
    name: "Category 1",
    parent: null,
    created_at: "10-05-2024 11:03:25",
    updated_at: "10-05-2024 11:03:25"
  }
]

const SalesProductByCategory = () => {
  //Navigate
  const navigate = useNavigate();

  // State 
  const [search, setSearch] = useState("");

  const btnOnPress = useCallback(() => {
    navigate(sales_routes.productAdd);
  }, [navigate]);

  const onClick = (id: number) => {
    navigate(sales_routes.product.replace(":categoryId", id.toString()));
  }
  // Api 
  // const { data, isLoading, isFetching } = useGetAdminCategoryQuery();

  // const filterData = useMemo(() => {
  //   if (data?.success && data.data) {
  //     return data.data;
  //   }
  //   return [];
  // }, [data]);




  return (
    <>
      {/* Header */}
      <MainHeader
        title="Mahsulot"
        btnTitle="Qo'shish"

        btnOnPress={btnOnPress}
      />

      <MainLayoutContent>
        <SectionTitle caption={[<p key={1}>Kategoriyalar 100ta</p>, <p key={2}>Mahsulotlar 1.000 ta</p>]} />

        {/* Search input */}
        <SearchInput value={search} onChange={setSearch} />

        {/* User list */}
        <MainListGrid>
          {
            data.length ? (
              data.map((item) => (
                <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MainListGridItem
                    title={item.name}
                    isActive={false}
                    caption={"400 ta mahsulot bor"}
                    // status={item.status}
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
  )
}

export default SalesProductByCategory