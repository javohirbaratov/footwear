import { Box, Grid } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import MainListGrid from '../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../components/common/mainListGridItem/MainListGridItem';
import SectionTitle from '../../../components/common/sectionTitle/SectionTitle';
import SearchInput from '../../../components/ui/searchInput/SearchInput';
import { sales_routes } from '../../../constants/path';

const data = [
  {
    id: 1,
    products: [
      {
        name: "Quisquam sed veritatis ea dolores et.",
        block: 23,
        quantity_received: 26,
        created_at: "10-05-2024 06:06:41",
        updated_at: "10-05-2024 06:06:41"
      }
    ],
    created_at: "10-05-2024 06:06:41",
    updated_at: "10-05-2024 06:06:41"
  },
  {
    id: 2,
    products: [
      {
        name: "Quisquam sed veritatis ea dolores et.",
        block: 23,
        quantity_received: 26,
        created_at: "10-05-2024 06:06:41",
        updated_at: "10-05-2024 06:06:41"
      }
    ],
    created_at: "10-05-2024 06:06:41",
    updated_at: "10-05-2024 06:06:41"
  },
  {
    id: 3,
    products: [
      {
        name: "Quisquam sed veritatis ea dolores et.",
        block: 23,
        quantity_received: 26,
        created_at: "10-05-2024 06:06:41",
        updated_at: "10-05-2024 06:06:41"
      }
    ],
    created_at: "10-05-2024 06:06:41",
    updated_at: "10-05-2024 06:06:41"
  },
]

const SalesProduct = () => {
  // State 
  const [search, setSearch] = useState("");

  // Navigate 
  const navigate = useNavigate();
  const btnOnPress = useCallback(() => {
    navigate(sales_routes.productByCategory);
  }, [navigate]);

  // Params
  // const { categoryId } = useParams<{ categoryId: string }>();

  // Api 
  // const {data, isLoading} = useGetSalesProductCategoryByIdQuery({
  //   categoryId: categoryId ? categoryId : null
  // })

  // Memo
  // const filterData = useMemo<ISalesProductByCategoryId[] | null>(() => {
    
  //   return null;
  // }, [data]);

  return (
    <>
      {/* Header */}
      <MainHeader backTitle="Kategoriyalar" backOnPress={btnOnPress} />

      <MainLayoutContent>
        {/* Page title  */}
        <SectionTitle title='Mahsulotlar' caption={[<p key={1}>Kategoriyalar 100ta</p>, <p key={2}>Mahsulotlar 1.000 ta</p>]} />

        {/* Search input */}
        <SearchInput value={search} onChange={setSearch} />
        {/* Product List  */}
        <Box>
          <MainListGrid>
            {
              data?.length && (
                data?.map((item, index) => (
                  <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <MainListGridItem
                      title={item.products[0].name}
                      isActive={false}
                      caption={item.products[0].quantity_received.toString()}
                    />
                  </Grid>
                ))
              )
            }
          </MainListGrid>
        </Box>
      </MainLayoutContent>


    </>
  )
}

export default SalesProduct