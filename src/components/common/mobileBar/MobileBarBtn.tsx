import { Button } from "@mui/material";
import { motion } from "framer-motion";
import styles from "./mobileBar.module.css";

export interface IBottomBarBtn {
  label: string;
  icon: React.ReactElement;
  id: string;
  customRoute?: string;
  onClick?: Function;
}

export interface IBottomBarBtnProps extends IBottomBarBtn {
  isActive: boolean;
  onNavigate: (key: string) => void;
}

const MobileBarBtn: React.FC<IBottomBarBtnProps> = ({
  id,
  icon,
  label,
  onNavigate,
  isActive,
}) => {
  return (
    <div>
      <Button
        onClick={() => onNavigate(id)}
        variant={isActive ? "contained" : "text"}
        startIcon={icon}
        fullWidth
        sx={{
          borderRadius: 10,
          p: "15px 12px",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
          }}
        >
          {isActive ? (
            <span className={styles.mobileBarTitle}>{label}</span>
          ) : null}
        </motion.div>
      </Button>
    </div>
  );
};

export default MobileBarBtn;
