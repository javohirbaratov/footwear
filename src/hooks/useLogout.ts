import { useLogoutUserMutation } from "../app/services/user/user";

export default function useLogout() {
  // Api
  const [logoutUser] = useLogoutUserMutation();

  const onLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (err) {
      if (!err) return;

      if (err instanceof Error) {
        console.error("Error", err.message);
      }
    }
  };

  return [onLogout];
}
