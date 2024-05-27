import { Logout } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../../app/services/user/user";

const LogoutBtn = () => {
  // Api
  const [logout, {isLoading}] = useLogoutUserMutation();

  // Logout
  const handleLogout = async () => {
    try {
      await logout().unwrap();
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
    <LoadingButton
      sx={{
        fontWeight: "bold",
        fontSize: 20,
        bgcolor: "#ffffff",
        textAlign: "left",
        justifyContent: "start",
        p: "13px 16px",
        borderRadius: "15px",
        mt: 3,
      }}
      color="error"
      startIcon={<Logout style={{ fontSize: 26 }} />}
      onClick={() => handleLogout()}
      loading={isLoading}
    >
      Chiqish
    </LoadingButton>
  );
};

export default LogoutBtn;
