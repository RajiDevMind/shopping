import React, { useEffect, useState } from "react";
import "./ViewProducts.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
  deleteProduct,
  getAllProducts,
} from "../../../redux/features/products/ProductSlice";
import Search from "../../search/Search";
import { Spinner } from "../../loader/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { shortenText } from "../../../utils";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ViewProduct = () => {
  const [search, setSearch] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProducts());
    }
  }, [isLoggedIn, dispatch]);

  // react-confirm-alert to delete product
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure to delete this product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };
  //delete product
  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProducts());
  };

  // Pagination Start Here
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  // Pagination End!

  return (
    <section>
      <div className="container product-list">
        <div className="table">
          <div className="--flex-between .--flex-dir-column">
            <span>
              <h3>All Products</h3>
              <p>
                ~ <b>{products.length}</b> products found
              </p>
            </span>
            <span>
              <Search
                value={search}
                onChange={() => setSearch(e.target.value)}
              />
            </span>
          </div>
        </div>

        {isLoading && <Spinner />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No Product found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>S/n</td>
                  <td>Name</td>
                  <td>Category</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Value</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {/* {products.map((product, index) => { */}
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>${price}</td>
                      <td>{quantity}</td>
                      <td>${price * quantity}</td>
                      <td className="icons">
                        <span>
                          <Link to={"/"}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={"/"}>
                            <FaEdit size={25} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <BsTrash
                            size={25}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
    </section>
  );
};

export default ViewProduct;
