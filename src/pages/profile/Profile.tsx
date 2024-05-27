import { Edit } from "@mui/icons-material";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { useGetUserQuery } from "../../app/services/user/user";
import LogoutBtn from "../../components/common/logoutBtn/LogoutBtn";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainLayoutContent from "../../components/common/mainLayoutContent/MainLayoutContent";
import SectionCard from "../../components/common/sectionCard/SectionCard";
import UpdateUserDrawer, {
  TUpdateUserDrawerMethods,
} from "../../components/department/profile/updateUserDrawer/UpdateUserDrawer";
import UpdateUserPasswordDrawer, {
  TUpdateUserPasswordDrawerMethods,
} from "../../components/department/profile/updateUserPasswordDrawer/UpdateUserPasswordDrawer";

const Profile = () => {
  // Ref
  const updateUserDrawerRef = useRef<TUpdateUserDrawerMethods>(null);
  const updateUserPasswordDrawerRef =
    useRef<TUpdateUserPasswordDrawerMethods>(null);

  // Api
  const userDataRes = useGetUserQuery();

  const userData = useMemo(() => {
    if (userDataRes.data && userDataRes.data.data) {
      return userDataRes.data.data;
    }
    return null;
  }, [userDataRes]);

  // Drawer
  const handleOpenDrawer = () => {
    if (userData) updateUserDrawerRef.current?.onOpen(userData);
    else toast.warning("User ma'lumotlari mavjud emas.");
  };

  return (
    <>
      {/* User update */}
      <UpdateUserDrawer ref={updateUserDrawerRef} />

      {/* User update password */}
      <UpdateUserPasswordDrawer ref={updateUserPasswordDrawerRef} />

      {/* Header */}
      <MainHeader title="Profile" />
      
      <MainLayoutContent>
        <SectionCard
          isLoading={userDataRes.isLoading || userDataRes.isFetching}
          title={userData?.name || ""}
          caption={
            <MuiPhoneNumber
              defaultCountry={"uz"}
              masks={{
                uz: "+...(..)... .. ..",
              }}
              countryCodeEditable={false}
              variant="standard"
              disableDropdown={true}
              size="small"
              name="phone"
              fullWidth
              id="phone"
              onChange={() => ""}
              value={userData?.phone || ""}
              disabled={true}
            />
          }
          icon={<Edit />}
          onPressOfIcon={handleOpenDrawer}
        />
        <SectionCard
          title="Parolni o'zgartirish"
          caption="⁎⁎⁎⁎⁎⁎⁎⁎"
          icon={<Edit />}
          onPressOfIcon={() => updateUserPasswordDrawerRef.current?.onOpen()}
        />
        <LogoutBtn />
      </MainLayoutContent>
    </>
  );
};

export default Profile;
