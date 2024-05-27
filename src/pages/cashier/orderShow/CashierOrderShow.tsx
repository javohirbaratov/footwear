import { Box, Grid } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICashierOrder, useGetCashierOrderByIdQuery } from '../../../app/services/cashier/order/order';
import { ICahierPatmentAddProductList } from '../../../app/services/cashier/payment/payment';
import AlertFinish from '../../../components/common/alertFinish/AlertFinish';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import MainListGrid from '../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../components/common/mainListGridItem/MainListGridItem';
import NextButton from '../../../components/common/nextButton/NextButton';
import SectionTitle from '../../../components/common/sectionTitle/SectionTitle';
import { CheckIcon, PlusIcon } from '../../../components/icons';
import { cashier_routes } from '../../../constants/path';
import CashierOrderCommentDrawer, { TSalesOrderAddCommentDawerState } from './components/CashierOrderCommentDrawer';
import CashierOrderProductDrawer, { TCashierOrderProductFormValues, TSalesOrderAddProductDawerState } from './components/CashierOrderProductDrawer';

export interface IAlertOptions {
  show: boolean;
  message: string;
}

const SalesOrderShow: React.FC = () => {

  // Drawer product state
  const [open, setOpen] = useState<TSalesOrderAddProductDawerState>({
    open: false,
    productId: null,
    pruductPrice: null
  });

  // Drawer comment state
  const [openComment, setOpenComment] = useState<TSalesOrderAddCommentDawerState>({
    open: false,
    products_list: null,
    order_id: null,
  });

  // State 
  const [activeCards, setActiveCards] = useState<ICahierPatmentAddProductList[]>([]);
  const [alert, setAlert] = useState<IAlertOptions>({ show: false, message: "" });
  // Navigate 
  const navigate = useNavigate();
  const backNavigate = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Params
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("`id` is required")

  // Api 
  const orderByIdRes = useGetCashierOrderByIdQuery({
    orderId: id ? id : null
  });

  // Memo
  const data = useMemo<ICashierOrder | null>(() => {
    if (orderByIdRes.data?.success && orderByIdRes.data?.data) {
      return orderByIdRes.data?.data;
    }
    return null;
  }, [orderByIdRes]);

  // Memo
  const selectProductDrawerOpen = useMemo(() => {
    return open
  }, [open])

  const selectCommentDrawerOpen = useMemo(() => {
    return openComment
  }, [openComment])

  // Drawer Product
  const handleOpenProductDrawer = (productId: number | null) => {

    const newData = data?.products.find(item => item.id === productId);
    if (!newData || !productId) return

    if (checkIsActive(productId)) {
      removeItem(productId);
    } else {
      setOpen({ open: true, productId, pruductPrice: newData?.sale_price })
    }
  };

  const handleCloseProductDrawer = useCallback(() => {
    setOpen({ open: false, productId: null, pruductPrice: null })
  }, []);

  // Drawer Comment
  const handleOpenCommentDrawer = () => {
    setOpenComment({ open: true, order_id: id, products_list: activeCards })
  };

  const handleCloseCommentDrawer = useCallback(() => {
    setOpenComment({ open: false, order_id: null, products_list: null })
  }, []);

  const changeActiveProducts = useCallback(({ productId, price }: TCashierOrderProductFormValues) => {
    // validate
    if (!productId || !price) return;

    setActiveCards(prev => [
      ...prev,
      {
        product_id: productId,
        sale_price: price,
      }
    ])

  }, []);

  // Check active
  const checkIsActive = (productId: number) => {
    if(data?.status.name === "Topshirildi") {
      return true
    } else {
      return activeCards.findIndex(item => item.product_id === productId) !== -1
    }
  }

  // Remove data
  const removeItem = (productId: number) => {
    const updatedData = activeCards.filter(item => item.product_id !== productId);
    setActiveCards(updatedData);
  };

  // showAlertFinish 
  const setShowAlert = useCallback((options: IAlertOptions) => {
    setAlert(options);
  }, []);

  return (
    <>
      {
        alert.show ? (
          <AlertFinish toNavigate={cashier_routes.order} btnTxt={"Orqaga"} caption={alert.message} />
        ) : (
          <>
            <CashierOrderProductDrawer onClose={handleCloseProductDrawer} onConfirm={changeActiveProducts} open={selectProductDrawerOpen} />
            {/* Comment value draver  */}
            <CashierOrderCommentDrawer onClose={handleCloseCommentDrawer} open={selectCommentDrawerOpen} setShowAlert={setShowAlert}/>

            {/* Header */}
            <MainHeader backTitle="Buyurtmalar" backOnPress={backNavigate} />

            <MainLayoutContent>

              {/* Page title  */}
              <SectionTitle title={"Mahsulotlar"} caption={data ? data.customer.firstname + data.customer.lastname : ""} />

              {/* Product List  */}
              <Box>
                <MainListGrid>
                  {
                    !data?.products.length ? (
                      <>No data</>
                    ) : (
                      data.products?.map(item => {
                        const isActive = checkIsActive(item.id)
                        return (
                          < Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3} >
                            <MainListGridItem
                              id={item.id}
                              title={item.name}
                              isActive={isActive}
                              caption={"Block: " + item.sale_block + " ta"}
                              onPress={handleOpenProductDrawer}
                              endElem={isActive ? <CheckIcon /> : <PlusIcon />}
                            />
                          </Grid>
                        )
                      })
                    )
                  }
                </MainListGrid>
                {
                  data?.status.name === "Topshirildi" ? (
                    null
                  ) : (
                    <NextButton handleNext={handleOpenCommentDrawer} isDisabled={activeCards.length === data?.products.length ? false : true} />
                  )
                }

              </Box>
            </MainLayoutContent >
          </>
        )
      }

    </>
  );
};

export default SalesOrderShow;