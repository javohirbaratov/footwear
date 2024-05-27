import { Grid } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainListGrid from '../../../components/common/mainListGrid/MainListGrid'
import MainListGridItem from '../../../components/common/mainListGridItem/MainListGridItem'
import SearchInput from '../../../components/ui/searchInput/SearchInput'
import { useGetCustomerQuery } from '../../../app/services/customer/customer'
import { cashier_routes } from '../../../constants/path'
import { ArrowRightIcon } from '../../../components/icons'

const CashierDeeds = () => {
  // State 
  const [search, setSearch] = useState("");
  //Navigate
  const navigate = useNavigate();
  // Api 
  const { data, isLoading } = useGetCustomerQuery();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  const onClick = useCallback((id: number | null) => {
    if (!id) throw new Error("customerId is required")
    navigate(cashier_routes.recoverDebet.replace(":customerId", id.toString()));
  }, [navigate])
  return (
    <>
      {/* Search input */}
      <SearchInput value={search} onChange={setSearch} />

      {/* User List  */}
      <MainListGrid>
        {isLoading ? (
          <>Loading...</>
        ) : !filterData.length ? (
          <>
            No data
          </>
        ) : filterData.length ? (
          filterData.map((item) => (
            <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <MainListGridItem
                id={item.id}
                title={item.firstname + " " + item.lastname}
                isActive={false}
                caption={" " + item.phone_number}
                endElem={<ArrowRightIcon />}
                onPress={onClick}
              />
            </Grid>
          ))
        ) : (
          <></>
        )
        }
      </MainListGrid>
    </>
  )
}

export default CashierDeeds