import { Box, Drawer, Grid, TextField } from "@mui/material";
import { memo } from "react";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import NumericFormatCustom from "../../../../../../components/common/numericFormatCustom/NumericFormatCustom";
import SectionTitle from "../../../../../../components/common/sectionTitle/SectionTitle";
import { MOBILE_SCREEN } from "../../../../../../constants/const";


// Form
export type TSalesOrderAddProductFormValues = {
  block: number | '',
  volume: number | '',
  name: string,
  productId: number | null,
}

// State
export type TSalesOrderAddProductDawerState = {
  open: boolean;
  productId: number | null;
  productName: string;
};

// Props
type TSalesOrderProductDrawerProps = {
  onConfirm: ({ block, volume }: TSalesOrderAddProductFormValues) => void
  onClose: () => void,
  open: TSalesOrderAddProductDawerState
}


const initialValues: TSalesOrderAddProductFormValues = {
  block: "",
  volume: "",
  name: "",
  productId: null
};

// validation
const validationSchema = yup.object().shape({
  block: yup
    .number()
    .required("Block talab qilinadi."),
  volume: yup.number().required("Miqdorni talab qilinadi."),
});


const SalesOrderAddProductDawer: React.FC<TSalesOrderProductDrawerProps> = ({ onConfirm, open, onClose}) => { 

  // Submit
  const handleSubmit = async (values: TSalesOrderAddProductFormValues) => {
    onConfirm({
      ...values,
      name: open.productName,
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
              id="block"
              name="block"
              label="Blockni kiriting"
              value={formik.values.block}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.block && Boolean(formik.errors.block)}
              helperText={formik.touched.block && formik.errors.block}
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
              id="volume"
              name="volume"
              label="Miqdorni kiriting"
              value={formik.values.volume}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.volume && Boolean(formik.errors.volume)}
              helperText={formik.touched.volume && formik.errors.volume}
              color={formik.status}
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

export default memo(SalesOrderAddProductDawer);
