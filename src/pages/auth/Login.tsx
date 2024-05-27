import { LoginRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { IAuthLogin, useLoginMutation } from "../../app/services/auth/auth";
import { role_list } from "../../constants/const";
import { admin_routes, cashier_routes, sales_routes } from "../../constants/path";

import MainAlert from "../../components/ui/mainAlert/MainAlert";

const initialValues: IAuthLogin = {
  login: "",
  password: "",
};

const validationSchema = yup.object({
  login: yup.string().required("Login talab qilinadi"),
  password: yup
    .string()
    .min(6, "6 ta belgidan kam bo'lmasin")
    .required("Parol talab qilinadi"),
});

function Login() {
  // Navigate
  const navigate = useNavigate();

  // Api
  const [sendAuthLogin, { isLoading, data, error }] = useLoginMutation();

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Handle navigate
  const onTo = useCallback(
    (to: string) => {
      setTimeout(() => {
        navigate(to);
      }, 1000);
    },
    [navigate]
  );

  const checkRoleAndNavigate = (role: string) => {
    switch (role) {
      case role_list.admin:
        onTo(admin_routes.home);
        return;
      case role_list.sales:
        onTo(sales_routes.home);
        return;
      case role_list.cashier:
        onTo(cashier_routes.home);
        return
    }
  };

  // useMemo
  const alertStatus = useMemo(() => {
    if (data?.success) return "success";
    else return "error";
  }, [data]);

  // Submit
  const handleSubmit = async ({ login, password }: IAuthLogin) => {
    try {
      const res = await sendAuthLogin({ login, password }).unwrap();

      if (res.data.user_data.roles.length) {
        checkRoleAndNavigate(res.data.user_data.roles[0]);
      }

      formik.setStatus("success");
    } catch (err) {
      if (!err) return;

      if (err instanceof Error) {
        console.error("Error", err.message);
      }

      formik.setStatus("error");
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <TextField
        autoFocus={true}
        margin="normal"
        size="small"
        fullWidth
        id="login"
        name="login"
        label="Login"
        value={formik.values.login}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
        color={formik.status}
      />
      <TextField
        margin="normal"
        size="small"
        fullWidth
        id="password"
        name="password"
        label="Parol"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        color={formik.status}
      />

      <MainAlert title={data?.message} status={alertStatus} error={error} />

      <LoadingButton
        loadingPosition="start"
        loading={isLoading}
        startIcon={<LoginRounded />}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Kirish
      </LoadingButton>
    </Box>
  );
}

export default Login;
