import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectedFiltered,
  SORT_PRODUCT,
} from "../../../redux/features/products/filterSlice";
import ReactPaginate from "react-paginate";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const filteredProducts = useSelector(selectedFiltered);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(SORT_PRODUCT({ products, sort }));
  }, [dispatch, products, sort]);

  // Pagination Start Here
  const itemsPerPage = 14;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  // Pagination End!

  return (
    <div className={styles["product-list"]}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaList size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            {/* <b>{products.length}</b> */}
            <b>{currentItems.length}</b> Products found
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Sort By:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found</p>
        ) : (
          <>
            {/* {products.map((product) => { */}
            {/* {filteredProducts.map((product) => { */}
            {currentItems.map((product) => {
              return (
                <div key={product._id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default ProductList;
