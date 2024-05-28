import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/features/cart/cartSlice";
import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { createOrder } from "../../redux/features/order/orderSlice";
import { toast } from "react-toastify";

const CheckoutPaystack = () => {
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
  };

  const componentProps = {
    email: user?.email,
    amount: cartTotalAmount * 100 * 1500,
    metadata: {
      name: user?.name,
      phone_number: user?.phone,
      description: "Payment for products ordered on Sellout Online stores",
    },
    publicKey: import.meta.env.VITE_APP_PAYSTACK_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: () => {
      navigate("/checkout-success");
      saveOrderDB();
    },
    onClose: () => toast.error("Payment Cancelled! Try again"),
  };
  return (
    <>
      <section>
        <div className={`container ${styles.checkout}`}>
          <h2>Checkout</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <Card cardClass={styles.card}>
                <CheckoutSummary />
              </Card>
            </div>
            <div>
              <Card cardClass={`${styles.card} ${styles.pay}`}>
                <h3>Paystack Checkout</h3>
                <div>
                  <PaystackButton
                    {...componentProps}
                    className={styles.button}
                  />
                </div>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutPaystack;
