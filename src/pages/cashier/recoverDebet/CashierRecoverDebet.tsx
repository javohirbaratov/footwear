import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { IRecoverDebetAdd, useAddRecoverDebetMutation } from '../../../app/services/cashier/recoverDebet/recoverDebet';
import MainHeader from '../../../components/common/mainHeader/MainHeader';
import MainLayoutContent from '../../../components/common/mainLayoutContent/MainLayoutContent';
import NumericFormatCustom from '../../../components/common/numericFormatCustom/NumericFormatCustom';

// Initial values
const initialValues: IRecoverDebetAdd = {
  customer_id: null,
  naqd: 0,
  usd: 0,
  currency: 0,
  bank: 0,
  card: 0,
  comment: ""
};

// validation
const validationSchema = yup.object().shape({
  comment: yup
    .string()
    .min(6, "6 ta belgidan kam bo'lmasin")
    .required("Izoh talab qilinadi."),
});

const CashierRecoverDebet: React.FC = () => {
  // Api
  const [addData, { isLoading }] = useAddRecoverDebetMutation();

  //Navigate
  const navigate = useNavigate();

  const backs = useCallback(() => {
    navigate(-1);
  }, [navigate])
  // Params
  const { customerId } = useParams<{ customerId: string }>();
  if (!customerId) throw new Error("`customerId` is required")
  // Submit
  const handleSubmit = async (values: IRecoverDebetAdd) => {

    try {
      const res = await addData({
        ...values,
        customer_id: customerId,
      }).unwrap();

      formik.setStatus("success");
      toast.success(res.message);
      backs()

    } catch (err) {
      if (err instanceof Error) {
        console.error("Error", err.message);
      } else {
        const { data } = err as { data: { message: string } };
        if (data.message) toast.error(data.message);
      }

      formik.setStatus("error");
    }
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      {/* Header */}
      <MainHeader backTitle='Mijozlar' backOnPress={backs} />

      <MainLayoutContent>
        <Box component={"form"} onSubmit={formik.handleSubmit}>
          <Grid container mb={4}>
            <Grid item xs={12}>
              <TextField
                variant='filled'
                margin="normal"
                size="small"
                fullWidth
                id="naqd"
                name="naqd"
                label="Naqd"
                value={formik.values.naqd}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.naqd && Boolean(formik.errors.naqd)}
                helperText={formik.touched.naqd && formik.errors.naqd}
                color={formik.status}
                disabled={isLoading}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='filled'
                margin="normal"
                size="small"
                fullWidth
                id="usd"
                name="usd"
                label="Usd"
                value={formik.values.usd}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.usd && Boolean(formik.errors.usd)}
                helperText={formik.touched.usd && formik.errors.usd}
                color={formik.status}
                disabled={isLoading}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='filled'
                margin="normal"
                size="small"
                fullWidth
                id="currency"
                name="currency"
                label="Currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.currency && Boolean(formik.errors.currency)}
                helperText={formik.touched.currency && formik.errors.currency}
                color={formik.status}
                disabled={isLoading}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='filled'
                margin="normal"
                size="small"
                fullWidth
                id="bank"
                name="bank"
                label="Bank"
                value={formik.values.bank}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bank && Boolean(formik.errors.bank)}
                helperText={formik.touched.bank && formik.errors.bank}
                color={formik.status}
                disabled={isLoading}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='filled'
                margin="normal"
                size="small"
                fullWidth
                id="card"
                name="card"
                label="Card"
                value={formik.values.card}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.card && Boolean(formik.errors.card)}
                helperText={formik.touched.card && formik.errors.card}
                color={formik.status}
                disabled={isLoading}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
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
            <Grid item xs={12} pt={4}>
              <LoadingButton
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
                loading={isLoading}
              >
                Saqlash
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </MainLayoutContent>
    </>
  );
};

export default CashierRecoverDebet;