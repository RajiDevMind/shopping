import React from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/cart/cartSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { createOrder } from "../../redux/features/order/OrderSlice";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import Card from "../../components/card/Card";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const CheckoutPayPal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  const saveOrderDB = () => {
    const today = new Date();
    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order placed...",
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon: coupon !== null ? coupon : { name: "nil" },
    };
    dispatch(createOrder(formData));
    navigate("/checkout-success");
  };

  const paypalInitialOptions = {
    "client-id": import.meta.env.VITE_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };
  return (
    <>
      <PayPalScriptProvider options={paypalInitialOptions}>
        <section>
          <div className={`container ${styles.checkout}`}>
            <h2>Checkout</h2>
            <form>
              <div>
                <Card cardClass={styles.card}>
                  <CheckoutSummary />
                </Card>
              </div>
              <div>
                <Card cardClass={`${styles.card} ${styles.pay}`}>
                  <h3>PayPal Checkout</h3>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: cartTotalAmount,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        const status = details.status;
                        console.log(status);
                        if (status === "COMPLETED") {
                          toast.success("Payment Succeddful");
                          saveOrderDB();
                        }
                      });
                    }}
                  />
                </Card>
              </div>
            </form>
          </div>
        </section>
      </PayPalScriptProvider>
    </>
  );
};

export default CheckoutPayPal;
