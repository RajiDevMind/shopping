import React, { useState } from "react";
import "./Radio.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SAVE_PAYMENT_METHOD } from "../../redux/features/checkout/checkoutSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setPayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "") {
      return toast.error("Kindly select a payment to proceed checkout");
    }
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));

    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      navigate("/login?redirect=cart");
    }
  };

  return (
    <div>
      <p>Please choose a payment method</p>
      <form className="--form-control" onSubmit={setPayment}>
        <label htmlFor="stripe" className="radio-label">
          <input
            type="radio"
            name="paymentMethod"
            id="stripe"
            value={"stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="radio-input"
          />
          <span className="custom-radio"></span> Stripe
        </label>
        <label htmlFor="flutterwave" className="radio-label">
          <input
            type="radio"
            name="paymentMethod"
            id="flutterwave"
            value={"flutterwave"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="radio-input"
          />
          <span className="custom-radio"></span> Flutterwave
        </label>
        <label htmlFor="paypal" className="radio-label">
          <input
            type="radio"
            name="paymentMethod"
            id="paypal"
            value={"paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="radio-input"
          />
          <span className="custom-radio"></span> Paypal
        </label>
        <label htmlFor="wallet" className="radio-label">
          <input
            type="radio"
            name="paymentMethod"
            id="wallet"
            value={"wallet"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="radio-input"
          />
          <span className="custom-radio"></span> Wallet
        </label>
        <button className="--btn --btn-primary --btn-block" type="submit">
          CheckOut
        </button>
      </form>
    </div>
  );
};

export default PaymentOptions;
