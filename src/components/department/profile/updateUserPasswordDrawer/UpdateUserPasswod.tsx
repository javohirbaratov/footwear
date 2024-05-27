import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  IUserUpdatePassword,
  useUpdateUserPasswordMutation,
} from "../../../../app/services/user/user";
import { useDispatch } from "react-redux";
import { logout } from "../../../../app/services/auth/authSlice";

// types
type TUpdateUserPasswordProps = {
  onClose: Function;
};

// initialValues
const initialValues: IUserUpdatePassword = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

// validation
const validationSchema = yup.object().shape({
  current_password: yup
    .string()
    .min(6, "6 ta belgidan kam bo'lmasin.")
    .required("Eski parol talab qilinadi."),
  new_password: yup
    .string()
    .matches(/[0-9]/g, "Parolni qiyinroq yarating.")
    .matches(/[a-zA-Z]/g, "Parolni qiyinroq yarating.")
    .min(6, "6 ta belgidan kam bo'lmasin.")
    .required("Yangi parol talab qilinadi."),
  confirm_password: yup
    .string()
    .matches(/[0-9]/g, "Parolni qiyinroq yarating.")
    .matches(/[a-zA-Z]/g, "Parolni qiyinroq yarating.")
    .min(6, "6 ta belgidan kam bo'lmasin.")
    .required("Yangi parolni tasdiqlash talab qilinadi.")
    .oneOf([yup.ref("new_password")], "Yagi parol bilan bir xil kiriting."),
});

const UpdateUserPasswod: React.FC<TUpdateUserPasswordProps> = ({ onClose }) => {
  // Dispatch
  const dispatch = useDispatch();

  // Api
  const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();

  // Submit
  const handleSubmit = async (values: IUserUpdatePassword) => {
    try {
      const res = await updateUserPassword(values).unwrap();

      formik.setStatus("success");
      toast.success(res.message);
      onClose();
      dispatch(logout());
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
            id="current_password"
            name="current_password"
            label="Eski parolni kiriting"
            type="current_password"
            value={formik.values.current_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.current_password &&
              Boolean(formik.errors.current_password)
            }
            helperText={
              formik.touched.current_password && formik.errors.current_password
            }
            color={formik.status}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            size="small"
            fullWidth
            id="new_password"
            name="new_password"
            label="Yangi parol"
            type="new_password"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.new_password && Boolean(formik.errors.new_password)
            }
            helperText={
              formik.touched.new_password && formik.errors.new_password
            }
            color={formik.status}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            size="small"
            fullWidth
            id="confirm_password"
            name="confirm_password"
            label="Yangi parolni qayta kiriting"
            type="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
            color={formik.status}
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

export default UpdateUserPasswod;
