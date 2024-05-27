import { Grid } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from 'react';
import { useGetCustomerQuery } from "../../../app/services/customer/customer";
import MainHeader from "../../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../../components/common/mainLayoutContent/MainLayoutContent";
import MainListGrid from "../../../components/common/mainListGrid/MainListGrid";
import MainListGridItem from "../../../components/common/mainListGridItem/MainListGridItem";
import SearchInput from "../../../components/ui/searchInput/SearchInput";
import SalesCustomerAddBottomDrawer, { TAddCustomerDrawerMethods } from "./components/salesCustomerAdd/SalesCustomerAddBottomDrawer";
import SalesCustomerEditBottomDrawer, { TEditCustomerDrawerMethods } from "./components/salesCustomerEdit/SalesCustomerEditBottomDrawer";

const SalesCustomer = () => {
  // State 
  const [search, setSearch] = useState("");

  // Ref
  const AddCustomerDrawerRef = useRef<TAddCustomerDrawerMethods>(null);
  const EditCustomerDrawerRef = useRef<TEditCustomerDrawerMethods>(null);

  // Api 
  const { data, isLoading } = useGetCustomerQuery();
  // const [deleteData, { isLoading: deleteIsLoading }] = useDeleteCustomerMutation();
  // Memo
  const filterData = useMemo(() => {
    if (data?.success && data.data) {
      return data.data;
    }
    return [];
  }, [data]);

  // Edit Drawer
  const handleOpenEditDrawer = useCallback((id: number | null) => {
    if (!id) throw new Error("`customerId` is required")

    EditCustomerDrawerRef.current?.onOpen(id);
  }, []);

  // Handle delete
  // const handleDelete = useCallback(async (id: number | null) => {
  //   if (!id) throw new Error("`customerId` is required")
  //   try {
  //     const res = await deleteData({ customerId: id.toString() }).unwrap();

  //     toast.success(res.message);
  //   } catch (err) {
  //     if (!err) return;

  //     if (err instanceof Error) {
  //       console.error("Error", err.message);
  //     } else {
  //       const { data } = err as { data: { message: string } };
  //       if (data.message) toast.error(data.message);
  //     }
  //   }
  // }, [deleteData]);

  return (
    <>
      {/* Customer add */}
      <SalesCustomerEditBottomDrawer ref={EditCustomerDrawerRef} />
      {/* Customer update */}
      <SalesCustomerAddBottomDrawer ref={AddCustomerDrawerRef} />

      {/* Header */}
      <MainHeader title="Mijozlar" btnTitle="Qo'shish" btnOnPress={() => AddCustomerDrawerRef.current?.onOpen()} />

      <MainLayoutContent>

        {/* Search input */}
        <SearchInput value={search} onChange={setSearch} />

        {/* User List  */}
        <MainListGrid>
          {isLoading ? (
            <>Loading...</>
          ) : !filterData.length ? (
            <>Not found</>
          ) : filterData.length ? (
            filterData.map((item) => (
              <Grid key={item.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                <MainListGridItem
                  id={item.id}
                  title={item.firstname + " " + item.lastname}
                  isActive={false}
                  caption={" " + item.phone_number}
                  isMenu={true}
                  editData={handleOpenEditDrawer}
                />
              </Grid>
            ))
          ) : (
            <></>
          )
          }
        </MainListGrid>
      </MainLayoutContent>
    </>
  );
};

export default SalesCustomer;
