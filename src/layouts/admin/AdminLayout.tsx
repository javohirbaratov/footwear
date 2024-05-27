import AdminMenuList from "../../components/common/adminMenuList/AdminMenuList";
import DashboardLayout from "../../components/common/dashboardLayout/DashboardLayout";
import MainOutlet from "../../components/common/mainOutlet/MainOutlet";

const AdminLayout = () => {
  return (
    <DashboardLayout menu={<AdminMenuList />}>
      <MainOutlet />
    </DashboardLayout>
  );
};

export default AdminLayout;
