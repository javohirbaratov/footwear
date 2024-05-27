import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { ISalesReceivingProductAddListItem, useAddReceivingSalesProductMutation } from '../../../../app/services/sales/receivingProduct/receivingProduct';
import NextButton from '../../../../components/common/nextButton/NextButton';
import NumericFormatCustom from '../../../../components/common/numericFormatCustom/NumericFormatCustom';
import SectionTitle from '../../../../components/common/sectionTitle/SectionTitle';
import { toast } from 'react-toastify';
import { IActiveProducts } from './ProductAddStepSecond';
import formatCommaNum from '../../../../util/formatCommaNum';

interface ISalesReceivingProductListItem extends ISalesReceivingProductAddListItem {
  product_name: string;
  block: number
}

interface ProductAddStepThridProps {
  selectProducts: IActiveProducts[];
  handleNext: () => void
}

const ProductAddStepThrid: React.FC<ProductAddStepThridProps> = ({ selectProducts, handleNext }) => {
  // State 
  const [products, setProducts] = useState<ISalesReceivingProductListItem[]>(
    selectProducts.map(product => ({
      product_id: product.id,
      product_name: product.name,
      block: product.block,
      quantity: 0
    }))
  );

  // Api 
  const [addData, { isLoading }] = useAddReceivingSalesProductMutation();

  // Submit
  const handleSubmit = useCallback(async () => {
    try {
      const res = await addData({
        products_list: products
      }).unwrap();
      if (res.success) {
        handleNext()
      } else {
        toast.error(res.message)
      }

    } catch (err) {
      if (!err) return;

      if (err instanceof Error) {
        console.error("Error", err.message);
      } else {
        const { data } = err as { data: { message: string } };
        if (data.message) toast.error(data.message);
      }
    }
  }, [addData, handleNext, products]);

  // Handle change 
  const handleChangeProductTable = (e: ChangeEvent<HTMLInputElement>) => {
    const parseItem = e.target.name.split(".");
    const value = e.target.value;

    const data = products.map((item) => {
      if (item.product_id.toString() === parseItem[0]) {
        return {
          ...item,
          [parseItem[1]]: value
        }
      }
      return item;
    });
    setProducts(data);
  };

  return (
    <>
      <SectionTitle title='Miqdor' />

      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 0.5, fontSize: 12 }} align="left">
                Mahsulot
              </TableCell>
              <TableCell sx={{ px: 0.5, fontSize: 12 }}>Blok</TableCell>
              <TableCell sx={{ px: 0.5, fontSize: 12 }}>Miqdor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.product_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  sx={{ px: 0.5, color: "#747C85", fontSize: 12 }}
                  scope="row"
                  align="left"
                >
                  {row.product_name}
                </TableCell>
                <TableCell component="th" sx={{ px: 2}} scope="row">
                  {formatCommaNum.formatNumber(
                    (row.block || 0) * (row.quantity || 0)
                  )}
                  {/* <TextField
                    name={`${row.id}.block`}
                    id={`${row.id}.block`}
                    size="small"
                    label="Blok"
                    variant="standard"
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    required={true}
                    fullWidth
                    disabled
                    value={row.block || ""}
                  /> */}
                </TableCell>
                <TableCell component="th" sx={{ px: 0.5 }} scope="row">
                  <TextField
                    name={`${row.product_id}.quantity`}
                    id={`${row.product_id}.quantity`}
                    size="small"
                    label="Miqdor"
                    variant="standard"
                    InputProps={{
                      inputComponent: NumericFormatCustom as any,
                    }}
                    fullWidth
                    // value={row.quantity || ""}
                    onChange={handleChangeProductTable}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <NextButton isDisabled={false} isLoading={isLoading} handleNext={handleSubmit} />
      </TableContainer>
    </>
  );
};

export default React.memo(ProductAddStepThrid);