import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  IProduct,
  useDeleteAdminProductMutation,
  useGetAdminProductQuery,
} from "../../../app/services/admin/product/product";
import MainDialog, {
  TMainDialogMethods,
} from "../../../components/common/mainDialog/MainDialog";
import {
  TDrawerAddDataMethods,
  TDrawerUpdateDataMethods,
} from "../../../types/api";
import AdminProductAdd from "./components/AdminProductAdd";
import AdminProductUpdate from "./components/AdminProductUpdate";

const AdminProduct = () => {
  // Ref
  const addDataDrawerRef = useRef<TDrawerAddDataMethods>(null);
  const updateDataDrawerRef = useRef<TDrawerUpdateDataMethods>(null);
  const dialogRef = useRef<TMainDialogMethods>(null);

  // Api
  const { data, isLoading } = useGetAdminProductQuery();
  const [deleteData, { isLoading: deleteIsLoading }] =
    useDeleteAdminProductMutation();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  // columns
  const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
    () => [
      {
        accessorKey: "id",
        header: "#",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Nomi",
        size: 150,
      },
      {
        accessorKey: "categories_list",
        accessorFn: ({ categories_list }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {categories_list.map((item) => (
              <Chip
                size="small"
                key={item.id}
                label={item.name}
                variant="filled"
              />
            ))}
          </Box>
        ),
        header: "Kategoriya",
        size: 300,
      },
      {
        accessorKey: "volume",
        header: "Volume",
        size: 150,
      },
      {
        accessorKey: "article",
        header: "Article",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Narxi",
        size: 150,
      },
      {
        accessorKey: "block",
        header: "Block",
        size: 150,
      },
      {
        accessorKey: "desc",
        accessorFn: ({ desc }) => (
          <Typography variant="caption">{desc}</Typography>
        ),
        header: "Izoh",
        size: 10,
      },
      {
        header: "Amal",
        accessorFn: ({ id, name }) => (
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              size="small"
              onClick={() => updateDataDrawerRef.current?.onOpen(id)}
            >
              <Edit fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => dialogRef.current?.onOpen(name, id)}
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </Box>
        ),
        size: 80,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: filterData,
    initialState: { density: "compact" },
    state: {
      isLoading,
    },
  });

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteData({ productId: id.toString() }).unwrap();

      toast.success(res.message);
      dialogRef.current?.onClose();
    } catch (err) {
      if (!err) return;

      if (err instanceof Error) {
        console.error("Error", err.message);
      } else {
        const { data } = err as { data: { message: string } };
        if (data.message) toast.error(data.message);
      }
    }
  };

  return (
    <>
      {/* Drawer */}
      <AdminProductAdd ref={addDataDrawerRef} />
      <AdminProductUpdate ref={updateDataDrawerRef} />

      {/* Dialog */}
      <MainDialog
        onDelete={handleDelete}
        ref={dialogRef}
        isLoading={deleteIsLoading}
      />

      <Box sx={{ display: "flex", justifyContent: "end", mb: 3 }}>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => addDataDrawerRef.current?.onOpen()}
        >
          Mahsulot qo'shish
        </Button>
      </Box>
      <MaterialReactTable table={table} />
    </>
  );
};

export default AdminProduct;
