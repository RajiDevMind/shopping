import React, { useEffect } from "react";
import styles from "./CheckoutSummary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL } from "../../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { CartDiscount } from "../../verifyCoupon/VerifyCoupon";
import Card from "../../card/Card";

const CheckoutSummary = () => {
  const dispatch = useDispatch();

  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    // dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
  }, [dispatch, cartItems, coupon]);

  return (
    <div>
      <h3>Checkout Summary</h3>
      {cartItems.length === 0 ? (
        <>
          <p>No item in your cart</p>
          <button className="--btn">
            <Link to={"/"}>&larr; Back to shop!</Link>
          </button>
        </>
      ) : (
        <div>
          <p>
            <b>{`Cart Item(s) ${cartTotalQuantity}`} </b>
          </p>
          <div className={styles.text}>
            <h4>Sub Total:</h4>
            <h3>${cartTotalAmount.toFixed(2)}</h3>
          </div>
          <div>
            {" "}
            <CartDiscount />
          </div>
          {cartItems?.map((item, index) => {
            const { _id, name, price, cartQuantity } = item;
            return (
              <Card key={_id} cardClass={styles.card}>
                <h4>Product: {name}</h4>
                <p>Quantity: {cartQuantity}</p>
                <p>Unit Price: ${price}</p>
                <p>Set Price: ${price * cartQuantity}</p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
