import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Drawer,
  Grid,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  ICategoryAdd
} from "../../../../app/services/common/category/category";
import { useAddExpenseMutation, useGetExpenseQuery } from "../../../../app/services/common/expense/expense";

export type TAdminCategoryAddMethod = {
  onOpen: () => void;
  onClose: () => void;
};

const initialValues: ICategoryAdd = {
  name: "",
  parent_id: "",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "3 ta belgidan kam bo'lmasin")
    .required("Nomi talab qilinadi"),
  parent_id: yup.string(),
});

const AdminCategoryAdd = forwardRef<TAdminCategoryAddMethod>((props, ref) => {
  // State
  const [open, setOpen] = useState({ open: false });

  // Drawer
  const onOpen = () => setOpen({ open: true });
  const onClose = () => setOpen({ open: false });

  useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  // Api
  const categoryRes = useGetExpenseQuery();
  const [addData, { isLoading }] = useAddExpenseMutation();

  // Api

  // Memo
  const categoryOption = useMemo(() => {
    if (categoryRes.data?.success && categoryRes.data.data) {
      return categoryRes.data.data;
    }
    return [];
  }, [categoryRes]);

  // Submit
  const handleSubmit = async ({ name, parent_id }: ICategoryAdd) => {
    try {
      const res = await addData({ name, parent_id }).unwrap();

      formik.setStatus("success");
      formik.resetForm();
      toast.success(res.message);
      onClose();
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
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Drawer
      open={open.open}
      anchor="right"
      title="Yangi harajat turi qo'shish"
      onClose={onClose}
    >
      <Box
        component={"form"}
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ p: 4 }}
      >
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          my={3}
          sx={{ width: 400 }}
        >
          <Grid item xs={12}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="name"
              name="name"
              label="Nomi"
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
            {/* Category */}
            {categoryRes.isLoading ? (
              <Skeleton variant="rounded" height={40} />
            ) : (
              <TextField
                fullWidth
                size="small"
                id="parent_id"
                select
                label="Kategoriya"
                name="parent_id"
                value={formik.values.parent_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.parent_id && Boolean(formik.errors.parent_id)
                }
                helperText={formik.touched.parent_id && formik.errors.parent_id}
                sx={{ m: 0 }}
                disabled={isLoading}
              >
                <MenuItem value={""}>--Tanlash--</MenuItem>
                {categoryOption?.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loadingPosition="start"
              loading={isLoading}
              startIcon={<Add />}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Qo'shish
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
});

export default AdminCategoryAdd;
