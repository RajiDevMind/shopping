import React, { useEffect } from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/cart/cartSlice";
import {
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";
import {
  createOrder,
  getSingleOrder,
} from "../../redux/features/order/OrderSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { toast } from "react-toastify";

const CheckoutWithFlutterwave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");
  const ref = urlParams.get("ref");

  const tx_REF = import.meta.env.VITE_APP_TX_REF;

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
    // navigate("/checkout-success");
  };

  useEffect(() => {
    if (payment === "successful" && ref === tx_REF && cartTotalAmount > 0) {
      toast.success("Payment successfully");
      saveOrderDB();
    }
    if (payment === "failed") {
      return toast.error("Payment Failed. Try again!");
    }

    setTimeout(() => {
      if (payment === "successful" && ref === tx_REF) {
        navigate("/checkout-success");
      }
    }, 5000);
  }, [payment, ref, cartTotalAmount, navigate]);

  // Function to make payment with flutterwave
  const makePayment = async (e) => {
    e.preventDefault();
    await FlutterwaveCheckout({
      public_key: import.meta.env.VITE_APP_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: tx_REF,
      amount: cartTotalAmount,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      redirect_url: `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/auth/order/response`,
      customer: {
        email: user.email,
        phone_number: user.phone,
        name: user.name,
      },
      customizations: {
        title: "Sellout Online Market",
        description: "Payment for product",
        logo: "https://ibb.co/0y5xgKb",
      },
      callback: function (data) {
        console.log("payment callback:", data);
      },
      onclose: function () {
        console.log("Payment cancelled!");
      },
    });
  };
  return (
    <>
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
                <h3>Flutterwave Checkout</h3>
                <button
                  type="button"
                  className={styles.button}
                  onClick={makePayment}
                >
                  Pay Now
                </button>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutWithFlutterwave;
