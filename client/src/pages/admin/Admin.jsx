import React from "react";
import AdminHome from "../../components/admin/adminHome/AdminHome";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Category from "../../components/admin/category/Category";
import Brand from "../../components/admin/brand/Brand";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import ViewProduct from "../../components/admin/viewProducts/ViewProduct";
import EditProduct from "../../components/admin/editProduct/EditProduct";

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

          <Route path="add-product" element={<AddProduct />} />
          <Route path="all-products" element={<ViewProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
