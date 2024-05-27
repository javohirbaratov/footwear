import { Grid } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { ISalesProduct, useGetSalesProductByCategoryIdQuery } from '../../../../app/services/sales/product/product';
import MainListGrid from '../../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../../components/common/mainListGridItem/MainListGridItem';
import NextButton from '../../../../components/common/nextButton/NextButton';
import SectionTitle from '../../../../components/common/sectionTitle/SectionTitle';
import { CheckIcon, PlusIcon } from '../../../../components/icons';
import SearchInput from '../../../../components/ui/searchInput/SearchInput';

export interface IActiveProducts extends ISalesProduct {
  isActive: boolean
}

interface ProductAddStepSecondProps {
  handleNext: () => void,
  selectedCategory: number | null;
  setSelectProducts: Function
}



const ProductAddStepSecond: React.FC<ProductAddStepSecondProps> = ({ handleNext, selectedCategory, setSelectProducts }) => {
  // State 
  const [search, setSearch] = useState("");
  const [productsList, setProductsList] = useState<IActiveProducts[]>([]);

  // validate category id
  if (!selectedCategory) throw new Error('`selectedCategory` is required');

  // Api
  const productsResByCategory = useGetSalesProductByCategoryIdQuery(selectedCategory.toString());
  // console.log('render')
  // useMemo
  const productsData = useMemo(() => {
    if (productsResByCategory.data && productsResByCategory.data.success) {
      const res = productsResByCategory.data.data
      setProductsList(() => res.map(item => ({
        ...item,
        isActive: false
      })));
      return res
    }
    return []
  }, [productsResByCategory])


  // Next Steps 
  const nextStep = useCallback(() => {
    setSelectProducts(productsList)
    handleNext();
  }, [handleNext, productsList, setSelectProducts])

  // handle select product
  const handleSelectProductItem = useCallback((productId: number | null) => {
    const findedProduct = productsList.find(item => item.id === productId);
    if (!findedProduct) throw new Error("`productId` is required")

    let newData: IActiveProducts[] = [...productsList];

    newData = newData.map(item => {
      if (item.id === findedProduct.id) {
        return ({
          ...item,
          isActive: !item.isActive
        })
      }

      return item;
    })

    setProductsList(newData)
  }, [productsList])

  return (
    <>
      {/* Page title  */}
      <SectionTitle title='Mahsulot tanlang' />

      {/* Search input */}
      <SearchInput value={search} onChange={setSearch} />
      {/* Product List  */}
      <MainListGrid>
        {
          productsResByCategory.isLoading ? (
            <>Loading...</>
          ) : !productsData?.length ? (
            <>Not found</>
          ) : (
            productsList.map(item => (
              <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MainListGridItem
                  id={item.id}
                  title={item.name}
                  isActive={item.isActive}
                  caption={`Mahsulot : ${item.volume} ta`}
                  endElem={item.isActive ? <CheckIcon /> : <PlusIcon />}
                  onPress={handleSelectProductItem}
                />
              </Grid>
            )))
        }
      </MainListGrid>
      <NextButton handleNext={nextStep} isDisabled={productsList.length ? false : true} />

    </>
  );
};

export default ProductAddStepSecond;