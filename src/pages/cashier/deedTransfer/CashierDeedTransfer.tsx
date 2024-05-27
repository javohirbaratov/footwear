import { LoadingButton } from '@mui/lab';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { IRecoverDebetAdd, useAddRecoverDebetMutation } from '../../../app/services/cashier/recoverDebet/recoverDebet';
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

const CashierDeedTransfer: React.FC = () => {
  // Api
  const [addData, { isLoading }] = useAddRecoverDebetMutation();

  //Navigate
  const navigate = useNavigate();

  const backs = useCallback(() => {
    navigate(-1);
  }, [navigate])

  // Submit
  const handleSubmit = async (values: IRecoverDebetAdd) => {

    try {
      const res = await addData({
        ...values,
        customer_id: "1",
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

      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container mb={4}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
              // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='filled'
              margin="normal"
              size="small"
              fullWidth
              id="usd"
              name="usd"
              label="Summa"
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
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
              // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='filled'
              margin="normal"
              size="small"
              fullWidth
              id="bank"
              name="bank"
              label="Summa"
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
    </>
  );
};

export default CashierDeedTransfer;