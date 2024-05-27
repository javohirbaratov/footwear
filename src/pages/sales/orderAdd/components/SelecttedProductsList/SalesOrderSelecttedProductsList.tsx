import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useAddSalesOrderAddMutation } from '../../../../../app/services/sales/order/order';
import MainListGrid from '../../../../../components/common/mainListGrid/MainListGrid';
import MainListGridItem from '../../../../../components/common/mainListGridItem/MainListGridItem';
import PageTitle from '../../../../../components/common/pageTitle/PageTitle';
import PluesIcon from '../../../../../components/icons/PlusIcon';
import { TActiveCard } from '../productSelect/SalesOrderAddSelectProduct';

interface SalesOrderSelecttedProductsListProps {
  handleNext: () => void
  products: TActiveCard[] | null
  userId: number | null
}

type TSalesSendComment = {
  comment: string
}

const initialValues: TSalesSendComment = {
  comment: "",
};

// validation
const validationSchema = yup.object().shape({
  comment: yup
    .string()
    .min(6)
    .required("Izoh talab qilinadi."),
});

const SalesOrderSelecttedProductsList: React.FC<SalesOrderSelecttedProductsListProps> = ({ handleNext, products, userId }) => {

  // State 
  const [showProducts, setShowProducts] = useState(false);

  // Api 
  // const userRes = useGetCustomerByIdQuery({
  //   customerId: userId
  // })
  const [addData, { isLoading }] = useAddSalesOrderAddMutation();

  // Memo
  // const userInfo = useMemo(() => {
  //   if (userRes.data?.success && userRes.data.data) {
  //     return userRes.data.data;
  //   }
  //   return [];
  // }, [userRes]);

  // Submit
  const handleSubmit = async (values: TSalesSendComment) => {
    
    try {
      if (!userId || !products?.length || products == null) return

      const res = await addData({
        customer_id: userId,
        comment: values.comment,
        products: products
      }).unwrap();

      formik.setStatus("success");
      formik.resetForm();
      handleNext();

    } catch (err) {
      if (!err) return;

      if (err instanceof Error) {
        console.error("Error", err.message);
      } else {
        const { data } = err as { data: { message: string } };
        if (data.message) toast.error(data.message);
      }

      formik.setStatus("error");
    }

    formik.resetForm();
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {/* Page title  */}
      <PageTitle title="Ko'rish" />

      {/* User Card  */}
      <Box sx={{ pt: "14px", pb: "11px" }}>
        <MainListGridItem
          title={"Mijoz bir"}
          isActive={true}
          caption={"telefon "}
          status={products?.length + " ta"}
        />
      </Box>

      {/* Product List  */}
      <Box sx={{ py: "11px" }}>
        <MainListGrid>
          <Grid key={"sa"} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <MainListGridItem
              id={0}
              title={showProducts ? "Mahsulotlarni yopish" : "Mahsulotlarni ko'rish"}
              isActive={false}
              caption={"Jami: " + products?.length + " ta"}
              onPress={() => setShowProducts(!showProducts)}
              endElem={showProducts ? null : <PluesIcon /> }
            />
          </Grid>
          {
            products?.length && showProducts && (
              products?.map((item) => (
                <Grid key={item.product_id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <MainListGridItem
                    id={item.product_id}
                    title={item.product_name}
                    isActive={false}
                    caption={"Block: " + item.block + " ta"}
                  />
                </Grid>
              ))
            )
          }
        </MainListGrid>
      </Box>

      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container mb={4}>
          <Grid item xs={12}>
          <TextField
              variant='filled'
              margin="normal"
              size="small"
              fullWidth
              id="comment"
              name="comment"
              label="Izoh"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.comment && Boolean(formik.errors.comment)}
              helperText={formik.touched.comment && formik.errors.comment}
              color={formik.status}
              disabled={isLoading}
            />
          </Grid>
          {/* <NextButton /> */}
          <Grid item xs={12} pt={4}>
            <LoadingButton
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
            // loading={isLoading}
            >
              Saqlash
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default React.memo(SalesOrderSelecttedProductsList);