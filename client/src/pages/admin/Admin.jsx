import React from "react";
import AdminHome from "../../components/admin/adminHome/AdminHome";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Category from "../../components/admin/category/Category";
import Brand from "../../components/admin/brand/Brand";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<AdminHome />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
