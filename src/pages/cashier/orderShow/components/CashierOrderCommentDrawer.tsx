import { LoadingButton } from "@mui/lab";
import { Box, Drawer, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { memo } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ICahierPatmentAddProductList, useAddCashierPaymentAddMutation } from "../../../../app/services/cashier/payment/payment";
import SectionTitle from "../../../../components/common/sectionTitle/SectionTitle";
import { MOBILE_SCREEN } from "../../../../constants/const";
import { IAlertOptions } from "../CashierOrderShow";


// Form
export type TCashierOrderCommentFormValues = {
  order_id: string | null,
  products_list: ICahierPatmentAddProductList[] | null,
  comment: string
}

// State
export type TSalesOrderAddCommentDawerState = {
  open: boolean;
  products_list: ICahierPatmentAddProductList[] | null,
  order_id: string | null,
};

// Props
type TCashierOrderProductDrawerProps = {
  onClose: () => void,
  open: TSalesOrderAddCommentDawerState,
  setShowAlert: (options: IAlertOptions) => void
}


const initialValues: TCashierOrderCommentFormValues = {
  order_id: null,
  products_list: null,
  comment: "",
};

// validation
const validationSchema = yup.object().shape({
  comment: yup
    .string()
    .min(6, "Izoh 6ta belgidan kam bo'lmasin")
    .required("Izoh talab qilinadi."),
});


const CashierOrderProductDawer: React.FC<TCashierOrderProductDrawerProps> = ({ open, onClose, setShowAlert }) => {

  // Api 
  const [addData, { isLoading }] = useAddCashierPaymentAddMutation()

  // Submit
  const handleSubmit = async (values: TCashierOrderCommentFormValues) => {

    if (!open.order_id || !open.products_list) throw new Error("`order_id and products_list` are required")

    try {
      const res = await addData({
        order_id: open.order_id,
        products_list: open.products_list,
        comment: values.comment
      }).unwrap();


      if (res.success) {
        toast.success(res.message);
        setShowAlert({ show: true, message: res.message })
      } else {
        toast.success(res.message);
      }

      formik.setStatus("success");
      formik.resetForm();

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
      <SectionTitle title="Izoh kiriting" />
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container mb={4}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              size="small"
              fullWidth
              id="comment"
              name="comment"
              label="Izoh kiriting"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.comment && Boolean(formik.errors.comment)}
              helperText={formik.touched.comment && formik.errors.comment}
              color={formik.status}
            // InputProps={{
            //   inputComponent: NumericFormatCustom as any,
            // }}
            // disabled={isLoading}
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
    </Drawer>
  );
}

export default memo(CashierOrderProductDawer);
