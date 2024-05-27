import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  ICategory
} from "../../../app/services/common/category/category";
import { useDeleteExpenseMutation, useGetExpenseQuery } from "../../../app/services/common/expense/expense";
import MainDialog, {
  TMainDialogMethods,
} from "../../../components/common/mainDialog/MainDialog";
import AdminCategoryAdd, {
  TAdminCategoryAddMethod,
} from "./components/AdminExpenseAdd";
import AdminCategoryUpdate, {
  TAdminCategoryUpdateMethod,
} from "./components/AdminExpenseUpdate";

const AdminExpense = () => {
  // Ref
  const addDataDrawerRef = useRef<TAdminCategoryAddMethod>(null);
  const updateDataDrawerRef = useRef<TAdminCategoryUpdateMethod>(null);
  const dialogRef = useRef<TMainDialogMethods>(null);

  // Api
  const { data, isLoading, isFetching } = useGetExpenseQuery();
  const [deleteData, { isLoading: deleteIsLoading }] =
    useDeleteExpenseMutation();

  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  // columns
  const columns = useMemo<MRT_ColumnDef<ICategory>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nomi",
        size: 150,
      },
      {
        accessorKey: "parent",
        accessorFn: (item) => item.parent?.name || "",
        header: "Parent",
        size: 150,
      },
      {
        accessorKey: "created_at",
        header: "Yaratilgan",
        size: 150,
      },
      {
        accessorKey: "updated_at",
        header: "O'zgartirilgan",
        size: 150,
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
      isLoading: isLoading || isFetching,
    },
  });

  // Handle delete
  const handleDelete = async (id: number) => {
    console.log("delte", id);
    try {
      const res = await deleteData({ expenseId: id.toString() }).unwrap();

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
      <AdminCategoryAdd ref={addDataDrawerRef} />
      <AdminCategoryUpdate ref={updateDataDrawerRef} />

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
          Kategoriya qo'shish
        </Button>
      </Box>
      <MaterialReactTable table={table} />
    </>
  );
};

export default AdminExpense;
