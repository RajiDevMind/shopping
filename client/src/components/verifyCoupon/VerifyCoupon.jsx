import React, { useEffect, useState } from "react";
import "./VerifyCoupon.scss";
import {
  RESET_COUPON,
  getSingleCoupon,
} from "../../redux/features/coupon/couponSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Card from "../card/Card";

export const CartDiscount = () => {
  const { coupon } = useSelector((state) => state.coupon);
  const { initialCartTotalAmount } = useSelector((state) => state.cart);
  return (
    <>
      {coupon !== null && (
        <Card cardClass={"coupon-msg"}>
          <p className="--center-all">
            Initial total: ${initialCartTotalAmount} | Coupon: {coupon?.name} |
            Discount: {coupon?.discount}%
          </p>
        </Card>
      )}
    </>
  );
};

const VerifyCoupon = () => {
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { coupon } = useSelector((state) => state.coupon);
  const { cartTotalAmount, initialCartTotalAmount } = useSelector(
    (state) => state.cart
  );

  const verifyCoupon = (e) => {
    e.preventDefault();
    dispatch(getSingleCoupon(couponName));
  };

  const removeCoupon = () => {
    dispatch(RESET_COUPON());
  };

  return (
    <>
      <CartDiscount />
      <div className="--flex-between">
        <p>Have a coupon?</p>
        {coupon === null ? (
          <p
            className="--cursor --color-primary"
            onClick={() => setShowForm(true)}
          >
            <b>Add Coupon</b>
          </p>
        ) : (
          <p className="--cursor --color-primary" onClick={removeCoupon}>
            <b>Remove Coupon</b>
          </p>
        )}
      </div>

      {showForm && (
        <form onSubmit={verifyCoupon} className="coupon-form --form-control">
          <input
            type="text"
            name="name"
            placeholder="Coupon name"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value.toUpperCase())}
            required
          />
          <button type="submit" className="--btn --btn-primary">
            Verify
          </button>
        </form>
      )}
    </>
  );
};

export default VerifyCoupon;
