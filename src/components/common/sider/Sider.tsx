import { FC, ReactNode } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import LogoDark from "../../../assets/images/logo-dark.png";
import PersonImage from "../../../assets/images/person.png";
import styles from "./sider.module.css";
import { Box } from "@mui/material";

type TSiderProps = {
  width: number;
  to?: string;
  menu: ReactNode;
};

const Sider: FC<TSiderProps> = ({ width, to = "/", menu }) => {
  return (
    <div className={styles.sider} style={{ width: `${width}px` }}>
      <Link to={to}>
        <LazyLoadImage
          src={LogoDark}
          width={120}
          height={48}
          effect="blur"
          delayTime={300}
        />
      </Link>

      {/* Sider profile */}
      <div className={styles.siderProfile}>
        <div className={styles.siderProfileImage}>
          <LazyLoadImage src={PersonImage} effect="blur" delayTime={300} />
        </div>
        <h3 className={styles.siderProfileTitle}>Admin</h3>
      </div>

      {/* Menu */}
      <Box sx={{ paddingX: 1 }}>{menu}</Box>
    </div>
  );
};

export default Sider;
