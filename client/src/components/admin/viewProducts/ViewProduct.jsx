import React, { useEffect, useState } from "react";
import "./ViewProducts.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getAllProducts } from "../../../redux/features/products/ProductSlice";
import Search from "../../search/Search";
import { Spinner } from "../../loader/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

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
                {products.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
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
                          <BsTrash size={25} color={"red"} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewProduct;
