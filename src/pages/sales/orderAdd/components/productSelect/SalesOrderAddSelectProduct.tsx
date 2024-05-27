import { Grid } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useGetSalesProductQuery } from '../../../../../app/services/sales/product/product';
import MainListGrid from '../../../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../../../components/common/mainListGridItem/MainListGridItem';
import NextButton from '../../../../../components/common/nextButton/NextButton';
import PageTitle from '../../../../../components/common/pageTitle/PageTitle';
import { CheckIcon, PlusIcon } from '../../../../../components/icons';
import SearchInput from '../../../../../components/ui/searchInput/SearchInput';
import SalesOrderAddProductDrawer, { TSalesOrderAddProductDawerState, TSalesOrderAddProductFormValues } from './components/SalesOrderAddProductDrawer';

export type TActiveCard = {
    product_name: string,
    product_id: number,
    block: number,
    volume: number,
}

interface SalesOrderAddSelectProductProps {
    handleNext: () => void
    setSelectProducts: Function
}

const SalesOrderAddSelectProduct: React.FC<SalesOrderAddSelectProductProps> = ({ handleNext, setSelectProducts }) => {
    // Drawer state
    const [open, setOpen] = useState<TSalesOrderAddProductDawerState>({
        open: false,
        productId: null,
        productName: "",
    });
    // State 
    const [activeCards, setActiveCards] = useState<TActiveCard[]>([]);
    const [search, setSearch] = useState("");

    // Api 
    const { data, isLoading } = useGetSalesProductQuery();

    // Memo
    const filterData = useMemo(() => {
        if (data?.success && data.data) {
            return data.data;
        }
        return [];
    }, [data]);

    // Memo
    const selectProductDrawerOpen = useMemo(() => {
        return open
    }, [open])


    // Drawer
    const handleOpenDrawer = (productId: number, productName: string) => {
        if (checkIsActive(productId)) {
            removeItem(productId);
        } else {
            setOpen({ open: true, productId, productName })
        }
    };

    const handleCloseDrawer = useCallback(() => {
        setOpen({ open: false, productId: null, productName: ""})
    }, []);

    const saveProductData = useCallback(({ block, volume, productId, name }: TSalesOrderAddProductFormValues) => {
        // validate
        if (!block || !volume || !productId || !name) return;

        setActiveCards(prev => [
            ...prev,
            {
                product_name: name,
                product_id: productId,
                block: block,
                volume: volume,
            }
        ])

    }, [])

    const nextStep = useCallback(() => {
        setSelectProducts(activeCards)
        handleNext();
    }, [activeCards, handleNext, setSelectProducts])

    // Check active
    const checkIsActive = (productId: number) => activeCards.findIndex(item => item.product_id === productId) !== -1

    // Remove data
    const removeItem = (productId: number) => {
        const updatedData = activeCards.filter(item => item.product_id !== productId);
        setActiveCards(updatedData);
    };

    return (
        <>

            {/* Product value drawer */}
            <SalesOrderAddProductDrawer onClose={handleCloseDrawer} onConfirm={saveProductData} open={selectProductDrawerOpen} />

            {/* Page Title  */}
            <PageTitle title="Mahsulotni tanlang" />
            {/* Search input */}
            <SearchInput value={search} onChange={setSearch} />

            {/* Product List  */}
            <MainListGrid>
                {
                    isLoading ? (
                        <>Loading...</>
                    ) : filterData.length ? (
                        filterData.map(item => {
                            const isActive = checkIsActive(item.id)
                            return (
                                <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <MainListGridItem
                                        id={item.id}
                                        title={item.name}
                                        isActive={isActive}
                                        caption={"Miqdor " + item.volume}
                                        onPress={() => handleOpenDrawer(item.id, item.name)}
                                        endElem={isActive ? <CheckIcon /> : <PlusIcon />}
                                    />
                                </Grid>
                            )
                        })
                    ) : (
                        <> Mahsulot yo'q </>
                    )


                }
            </MainListGrid>
            <NextButton handleNext={nextStep} isDisabled={activeCards.length ? false : true} />
        </>
    );
};

export default SalesOrderAddSelectProduct;