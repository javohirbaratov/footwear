import { Skeleton } from "@mui/material";
import { memo, ReactNode } from "react";
import styles from "./sectionTitle.module.css";

type TSectionTitleProps = {
  title?: string;
  caption?: string | ReactNode;
  isLoading?: boolean;
};

const SectionTitle: React.FC<TSectionTitleProps> = ({
  title,
  caption,
  isLoading = false,
}) => {
  return isLoading ? (
    <>
      <Skeleton height={30} sx={{ width: "100%", maxWidth: "120px" }} />
      <Skeleton height={20} sx={{ width: "100%", maxWidth: "160px" }} />
    </>
  ) : (
    <div>
      {title ? <div className={styles.sectionTitle}>{title}</div> : null}
      {typeof caption === "string" ? (
        <p className={styles.caption}>{caption}</p>
      ) : caption ? (
        caption
      ) : null}
    </div>
  );
};

export default memo(SectionTitle);
