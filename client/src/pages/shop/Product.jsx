import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/features/products/ProductSlice";
import ProductFilter from "../../components/product/productFilter/ProductFilter";
import ProductList from "../../components/product/productList/ProductList";
import { Spinner } from "../../components/loader/Loader";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const [showFilter, setShowFilter] = useState(false);

  const { isLoading, products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // toggling on and off
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? <Spinner /> : <ProductList products={products} />}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color={"orangered"} />
            <b>{showFilter ? "Hide filter" : "Show filter"}</b>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
