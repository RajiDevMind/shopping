import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout/checkoutForm/CheckoutForm";
import { extractIdAndCartQuantity } from "../../utils";
import { useSelector } from "react-redux";
import { selectShippingAddress } from "../../redux/features/checkout/checkoutSlice";
import { selectUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const user = useSelector(selectUser);
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);

  const shippingAddress = useSelector(selectShippingAddress);
  const productIDs = extractIdAndCartQuantity(cartItems);
  const description = `Successfull payment by ${user?.email}, Amount ${cartTotalAmount}`;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/order/create-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: productIDs,
        shipping: shippingAddress,
        description,
        coupon,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout!");
        toast.error(error.message);
        console.log(error);
      });
  }, [productIDs, shippingAddress, description, coupon]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
