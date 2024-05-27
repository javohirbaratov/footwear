import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import MuiPhoneNumber from "material-ui-phone-number-2";
import React from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ICustomerAdd, useAddCustomerMutation } from "../../../../../app/services/customer/customer";

// types
type TUpdateUserDataProps = {
  onClose: Function;
};

// Initial values
const initialValues: ICustomerAdd = {
  firstname: "",
  lastname: "",
  phone_number: "",
  telegram_id: ""
};

// validation
const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(/^[A-Za-z_ ]+$/, "Inputni to'g'ri to'ldiring.")
    .min(3, "3 ta belgidan kam bo'lmasin")
    .required("Ism talab qilinadi."),
  lastname: yup
    .string()
    .matches(/^[A-Za-z_ ]+$/, "Inputni to'g'ri to'ldiring.")
    .min(3, "3 ta belgidan kam bo'lmasin")
    .required("Familiya talab qilinadi."),
  phone_number: yup.string().required("Telefon raqam talab qilinadi."),
  telegram_id: yup
    .string()
    .min(5, "5 ta belgidan kam bo'lmasin")
    .required("Telegram talab qilinadi."),
});

const SalesCustomerAddData: React.FC<TUpdateUserDataProps> = ({
  onClose,
}) => {
  // Api
  const [addCustomer, { isLoading }] = useAddCustomerMutation();


  // Submit
  const handleSubmit = async (values: ICustomerAdd) => {
    
    try {
      const res = await addCustomer({
        firstname: values.firstname,
        lastname: values.lastname,
        phone_number: values.phone_number.replace(/[+()\s-]/g, ""),
        telegram_id: values.telegram_id,
      }).unwrap();

      formik.setStatus("success");
      toast.success(res.message);
      onClose();
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
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container mb={4}>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            size="small"
            fullWidth
            id="firstname"
            name="firstname"
            label="Ism"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            color={formik.status}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            size="small"
            fullWidth
            id="lastname"
            name="lastname"
            label="Familiya"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            color={formik.status}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPhoneNumber
            margin="normal"
            defaultCountry={"uz"}
            masks={{
              uz: "+...(..)... .. ..",
            }}
            countryCodeEditable={false}
            variant="outlined"
            disableDropdown={true}
            size="small"
            name="phone_number"
            fullWidth
            id="phone_number"
            label="Telefon"
            value={formik.values.phone_number}
            onChange={() => ""}
            onChangeCapture={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
            helperText={formik.touched.phone_number && formik.errors.phone_number}
            disabled={formik.isSubmitting}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            size="small"
            fullWidth
            id="telegram_id"
            name="telegram_id"
            label="Telegram id"
            value={formik.values.telegram_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telegram_id && Boolean(formik.errors.telegram_id)}
            helperText={formik.touched.telegram_id && formik.errors.telegram_id}
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
  );
};

export default SalesCustomerAddData;
