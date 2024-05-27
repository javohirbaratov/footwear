import React, { useCallback, useMemo, useState } from 'react';
import SearchInput from '../../../../components/ui/searchInput/SearchInput';
import MainListGrid from '../../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../../components/common/mainListGridItem/MainListGridItem';
import { Grid } from '@mui/material';
import { ArrowRightIcon } from '../../../../components/icons';
import SectionTitle from '../../../../components/common/sectionTitle/SectionTitle';
import { useGetCategoryQuery } from '../../../../app/services/common/category/category';

interface ProductAddStepFristProps {
  handleNext: (categoryId: number) => void
}


const ProductAddStepFrist: React.FC<ProductAddStepFristProps> = ({ handleNext }) => {
  // State 
  const [search, setSearch] = useState("");
 
  // Api
  const { data, isLoading } = useGetCategoryQuery();
 
  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  // handle next step
  const handleNextStep = useCallback((categoryId:number|null)=> {
    if(!categoryId) throw new Error('`categoryId` is required');

    handleNext(categoryId)
  },[handleNext])


  return (
    <>
      <SectionTitle title='Kategoriyalar' />

      {/* Search input */}
      <SearchInput value={search} onChange={setSearch} />

      {/* User list */}
      <MainListGrid>
        {
          isLoading?(
            <>Loading...</>
          ): !filterData.length ?(
            <>Not found</>
          ) :(
            filterData.map((item) => (
              <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MainListGridItem
                  id={item.id}
                  title={item.name}
                  isActive={false}
                  caption={"400 ta mahsulot bor"}
                  // status={item.status}
                  endElem={<ArrowRightIcon />}
                  onPress={handleNextStep}
                />
              </Grid>
            ))
          )  
        }
      </MainListGrid>
    </>
  );
};

export default React.memo(ProductAddStepFrist);