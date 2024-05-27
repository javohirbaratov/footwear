import { Grid } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useGetCustomerQuery } from '../../../../../app/services/customer/customer';
import MainListGrid from '../../../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../../../components/common/mainListGridItem/MainListGridItem';
import PageTitle from '../../../../../components/common/pageTitle/PageTitle';
import SearchInput from '../../../../../components/ui/searchInput/SearchInput';

interface SalesUserListProps {
  handleNext: () => void
  setSelectUser: Function
}

const SalesUserList: React.FC<SalesUserListProps> = ({
  handleNext,
  setSelectUser
}) => {
  // State 
  const [search, setSearch] = useState("");

  // Api 
  const { data, isLoading } = useGetCustomerQuery();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  const nextStep = (userId: number) => {
    setSelectUser(userId)
    handleNext()
  }

  return (
    <>
      {/* Page Title  */}
      <PageTitle title="Mijozni tanlang" />

      {/* Search input */}
      <SearchInput value={search} onChange={setSearch} />

      {/* User List  */}
      <MainListGrid>
        {
          isLoading? (
            <>
              Loading..
            </>
          ) : filterData.length ? (
            filterData.map((item) => (
              <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MainListGridItem
                  title={item.firstname + " " + item.lastname}
                  isActive={false}
                  caption={" " + item.phone_number}
                  onPress={() => nextStep(item.id)}
                />
              </Grid>
            ))
          ) : (
            <></>
          )
        }
      </MainListGrid>
    </>
  );
};

export default React.memo(SalesUserList);