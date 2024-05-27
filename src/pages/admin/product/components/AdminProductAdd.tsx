import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Chip,
  Drawer,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useGetCategoryQuery } from "../../../../app/services/common/category/category";
import {
  IProductAdd,
  useAddAdminProductMutation,
} from "../../../../app/services/admin/product/product";
import NumericFormatCustom from "../../../../components/common/numericFormatCustom/NumericFormatCustom";
import { TDrawerAddDataMethods } from "../../../../types/api";

// MUI
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Initial values
const initialValues: IProductAdd = {
  name: "",
  volume: "",
  article: "",
  price: "",
  block: "",
  desc: "",
  categories_list: [],
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(6, "3 ta belgidan kam bo'lmasin")
    .required("Nomi talab qilinadi"),
  categories_list: yup.array().of(yup.number().required()),
  volume: yup
    .number()
    .min(0, "0 dan kam bo'lmasin")
    .required("Miqdor talab qilinadi"),
  price: yup
    .number()
    .min(0, "0 dan kam bo'lmasin")
    .required("Narx talab qilinadi"),
  article: yup
    .string()
    .matches(
      /(^[A-Za-z0-9-]+$)+/,
      "A-z, 0-9, `-` belgilardan foydalanishingiz mumkin."
    )
    .min(3, "3 ta belgidan kam bo'lmasin")
    .required("Article talab qilinadi"),
  block: yup
    .number()
    .min(0, "0 dan kam bo'lmasin")
    .required("Block talab qilinadi"),
  desc: yup
    .string()
    .min(3, "3 ta belgidan kam bo'lmasin")
    .required("Izoh talab qilinadi"),
});

const AdminProductAdd = forwardRef<TDrawerAddDataMethods>((props, ref) => {
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
  const categoryRes = useGetCategoryQuery();
  const [addData, { isLoading }] = useAddAdminProductMutation();

  // Api

  // Memo
  const categoryOption = useMemo(() => {
    if (categoryRes.data?.success && categoryRes.data.data) {
      return categoryRes.data.data;
    }
    return [];
  }, [categoryRes]);

  // Submit
  const handleSubmit = async (values: IProductAdd) => {
    try {
      const res = await addData(values).unwrap();

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

  // Handle multiple select category
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue("categories_list", value);
    console.log(value);
  };

  return (
    <Drawer
      open={open.open}
      anchor="right"
      title="Yangi kategoriya qo'shish"
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
          {categoryRes.isLoading ? (
            <Grid item xs={12}>
              <Skeleton variant="rounded" height={48} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <InputLabel id="categories_list">Kategoriya</InputLabel>
              <Select
                fullWidth
                labelId="categories_list"
                multiple
                value={formik.values.categories_list}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          categoryOption.find((item) => item.id === value)?.name
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categoryOption.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    // style={getStyles(item, personName, theme)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="block"
              name="block"
              label="Block"
              value={formik.values.block}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.block && Boolean(formik.errors.block)}
              helperText={formik.touched.block && formik.errors.block}
              color={formik.status}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="volume"
              id="volume"
              size="small"
              label="Miqdorni kiriting"
              value={formik.values.volume}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.volume && Boolean(formik.errors.volume)}
              helperText={formik.touched.volume && formik.errors.volume}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="price"
              id="price"
              size="small"
              label="Narxini kiriting"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="article"
              name="article"
              label="Article"
              value={formik.values.article}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.article && Boolean(formik.errors.article)}
              helperText={formik.touched.article && formik.errors.article}
              color={formik.status}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="desc"
              name="desc"
              label="Izoh"
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.desc && Boolean(formik.errors.desc)}
              helperText={formik.touched.desc && formik.errors.desc}
              color={formik.status}
              disabled={isLoading}
            />
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

export default AdminProductAdd;
