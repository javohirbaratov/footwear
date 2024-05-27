import React, { memo } from "react";
import styles from "./pageTitle.module.css";

type TPageTitleProps = {
  title: string;
};

const PageTitle: React.FC<TPageTitleProps> = ({ title }) => {
  return <h3 className={styles.pageTitle}>{title}</h3>;
};

export default memo(PageTitle);
