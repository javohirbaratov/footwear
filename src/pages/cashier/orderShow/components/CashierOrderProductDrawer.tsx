import { Box, Drawer, Grid, TextField } from "@mui/material";
import { memo } from "react";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import NumericFormatCustom from "../../../../components/common/numericFormatCustom/NumericFormatCustom";
import SectionTitle from "../../../../components/common/sectionTitle/SectionTitle";
import { MOBILE_SCREEN } from "../../../../constants/const";


// Form
export type TCashierOrderProductFormValues = {
  productId: number | null,
  price: number | '',
}

// State
export type TSalesOrderAddProductDawerState = {
  open: boolean;
  productId: number | null;
  pruductPrice: number | null
};

// Props
type TCashierOrderProductDrawerProps = {
  onConfirm: ({ price }: TCashierOrderProductFormValues) => void
  onClose: () => void,
  open: TSalesOrderAddProductDawerState
}


const initialValues: TCashierOrderProductFormValues = {
  price: "",
  productId: null
};

// validation
const validationSchema = yup.object().shape({
  price: yup
    .number()
    .required("Narx talab qilinadi."),
});


const CashierOrderProductDawer: React.FC<TCashierOrderProductDrawerProps> = ({ onConfirm, open, onClose}) => { 

  // Submit
  const handleSubmit = async (values: TCashierOrderProductFormValues) => {
    console.log("pp");
    
    onConfirm({
      ...values,
      productId: open.productId
    })
    onClose()
    formik.resetForm();
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });



  return (
    <Drawer
      open={open.open}
      onClose={() => onClose()}
      anchor={MOBILE_SCREEN > window.innerWidth ? "bottom" : "right"}
      PaperProps={{ sx: { p: "14px" } }}
      title="Example"
    >
      <SectionTitle title="Mahsulot miqdorini kiriting " />
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container mb={4}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="price"
              name="price"
              label="Narxnini kiriting"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              color={formik.status}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
            // disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="default"
              name="default"
              label="Mahsulot umumiy narxi"
              disabled
              value={open.pruductPrice || ""}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
            // disabled={isLoading}
            />
          </Grid>
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
    </Drawer>
  );
}

export default memo(CashierOrderProductDawer);
