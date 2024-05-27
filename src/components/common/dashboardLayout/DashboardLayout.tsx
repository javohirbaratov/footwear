import React, { ReactNode } from "react";
import Sider from "../sider/Sider";
import styles from "./dashboardLayout.module.css";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import MainOutlet from "../mainOutlet/MainOutlet";

type TDashboardLayoutProps = {
  children: React.ReactNode;
  menu: ReactNode;
};

const siderWidth = 280;

const DashboardLayout: React.FC<TDashboardLayoutProps> = ({
  children,
  menu,
}) => {
  return (
    <div className={styles.layout}>
      {/* Body */}
      <div className={styles.content}>
        {/* Sider */}
        <Sider width={siderWidth} to="/" menu={menu} />

        <div
          style={{ width: `calc(100% - ${siderWidth}px)`, minHeight: "100vh" }}
        >
          {/* Header */}
          <DashboardHeader />
          <div className={styles.body}>
            <MainOutlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
