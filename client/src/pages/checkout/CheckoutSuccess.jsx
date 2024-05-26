import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "../../redux/features/cart/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CLEAR_CART());
  }, [dispatch]);

  return (
    <>
      <Confetti />
      <section>
        <div className="container">
          <h2>Checkout Successful</h2>
          <p>Thank you for your purchase as your order is processing!</p>
          <br />
          <button className="--btn --btn-primary">
            <Link to="/order-history">View Order Status</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default CheckoutSuccess;
