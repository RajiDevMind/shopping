import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import { FILTER_BY_CATEGORY } from "../../../redux/features/products/filterSlice";

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");

  const allCategories = [
    "All",
    // Set is used to get duplicate of the category in the products instead filter
    ...new Set(products?.map((product) => product.category)),
  ];

  const filterProductByCategory = async (eachCat) => {
    setCategory(eachCat);
    dispatch(FILTER_BY_CATEGORY({ products, category: eachCat }));
    console.log(eachCat);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((eachCat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === eachCat ? `${styles.active}` : null}
              onClick={() => filterProductByCategory(eachCat)}
            >
              &#8250; {eachCat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;
