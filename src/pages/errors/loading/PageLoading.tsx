import { CircularProgress } from "@mui/material";
import styles from "./PageLoading.module.css";

const PageLoading: React.FC = () => {
  return (
    <div className={styles.pageLoading}>
      <CircularProgress />
    </div>
  );
};

export default PageLoading;
