import { Outlet, useLocation } from "react-router-dom";
import styles from "./authLayout.module.css";
import LogoDark from "../../assets/images/logo-dark.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { auth_routes } from "../../constants/path";

const AuthLayout = () => {
  // pathname
  const { pathname } = useLocation();

  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayoutContent}>
        <div className={styles.formLogo}>
          <LazyLoadImage
            src={LogoDark}
            alt={"My system"}
            height={48}
            width={120}
            effect="blur"
          />
        </div>
        {pathname === auth_routes.login ? (
          <h2 className={styles.formTitle}>Kirish</h2>
        ) : (
          ""
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
