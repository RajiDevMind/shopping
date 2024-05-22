import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import "./Radio.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  saveCartDB,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/features/cart/cartSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // react-confirm-alert to delete category
  const confirmDelete = (carts) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure to delete this product from your cart?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeCart(carts),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const confirmToClear = () => {
    confirmAlert({
      title: "Clear All Products",
      message: "Are you sure to clear all product in your cart?",
      buttons: [
        {
          label: "Clear",
          onClick: () => clearCarts(),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const addToCart = (carts) => {
    dispatch(ADD_TO_CART(carts));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const decreaseCart = (carts) => {
    dispatch(DECREASE_CART(carts));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const removeCart = (carts) => {
    dispatch(REMOVE_FROM_CART(carts));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const clearCarts = () => {
    dispatch(CLEAR_CART());
    dispatch(saveCartDB({ cartItems: [] }));
    navigate("/shop");
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_SUBTOTAL());
  }, [dispatch, cartItems]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cartalogue</h2>
        {cartItems.length === 0 ? (
          <>
            <p>You cart is empty</p>
            <Link to={"/shop"}> &larr; Continue Shopping</Link>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((carts, index) => {
                  const { _id, name, price, image, cartQuantity } = carts;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={image[0]}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>${price}</td>
                      <td>
                        {/* btns */}
                        <div className={styles.count}>
                          <>
                            <button
                              className="--btn"
                              onClick={() => decreaseCart(carts)}
                            >
                              -
                            </button>
                            <p>
                              <b>{cartQuantity}</b>
                            </p>
                            <button
                              className="--btn"
                              onClick={() => addToCart(carts)}
                            >
                              +
                            </button>
                          </>
                        </div>
                      </td>
                      <td>${price * cartQuantity}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={() => confirmDelete(carts)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button
                className="--btn --btn-danger"
                onClick={() => confirmToClear()}
              >
                Clear Cart{" "}
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to={"/shop"}>&larr; Continue Shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b>{`Cart Item(s) ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount?.toFixed(2)}`}</h3>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
