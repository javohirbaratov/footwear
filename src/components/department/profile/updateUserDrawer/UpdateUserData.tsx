import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import MuiPhoneNumber from "material-ui-phone-number-2";
import React from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  IUserUpdate,
  useUpdateUserMutation,
} from "../../../../app/services/user/user";

// types
type TUpdateUserDataProps = {
  onClose: Function;
  initialValues: IUserUpdate;
};

// validation
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z_ ]+$/, "Inputni to'g'ri to'ldiring.")
    .min(3, "3 ta belgidan kam bo'lmasin")
    .required("Ism & Familiya talan qilinadi."),
  phone: yup.string().required("Telefon raqam talab qilinadi."),
});

const UpdateUserData: React.FC<TUpdateUserDataProps> = ({
  onClose,
  initialValues,
}) => {
  // Api
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Submit
  const handleSubmit = async (values: IUserUpdate) => {
    try {
      const res = await updateUser({
        name: values.name,
        phone: values.phone.replace(/[+()\s-]/g, ""),
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
            id="name"
            name="name"
            label="Ism & Familiya"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            name="phone"
            fullWidth
            id="phone"
            label="Telefon"
            value={formik.values.phone}
            onChange={() => ""}
            onChangeCapture={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            disabled={formik.isSubmitting}
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

export default UpdateUserData;
