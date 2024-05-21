import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/features/products/filterSlice";
import { GET_PRICE_RANGE } from "../../../redux/features/products/ProductSlice"; // from rpoductSlice to have access to state.minPrice and state.maxPrice
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState([50, 9500]);

  const allCategories = [
    "All",
    // Set is used to get duplicate of the category in the products instead filter
    ...new Set(products?.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    // Set is used to get duplicate of the brand in the products instead filter
    ...new Set(products?.map((product) => product.brand)),
  ];

  const filterProductByCategory = async (eachCat) => {
    setCategory(eachCat);
    dispatch(FILTER_BY_CATEGORY({ products, category: eachCat }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);
  // console.log(minPrice, maxPrice);

  const clearFilter = () => {
    setCategory("All");
    setBrand("All");
    setPrice([minPrice, maxPrice]); // from productSlice not filterSlice
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

      <h4>Brands</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>

      <h4>Price</h4>
      <div className={styles.price}>
        <Slider
          range
          marks={{
            1: `${price[0]}`,
            5000: `${price[1]}`,
          }}
          min={minPrice}
          max={maxPrice}
          defaultValue={[minPrice, maxPrice]}
          tipFomatter={(value) => `$${value}`}
          tipProps={{
            placement: "top",
            visible: true,
          }}
          value={price}
          onChange={(price) => setPrice(price)}
        />
      </div>
      <br />
      <br />
      <button className="--btn --btn-danger" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
