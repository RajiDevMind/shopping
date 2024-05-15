import React from "react";
import AdminHome from "../../components/admin/adminHome/AdminHome";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <AdminHome />
      </div>
    </div>
  );
};

export default Admin;
