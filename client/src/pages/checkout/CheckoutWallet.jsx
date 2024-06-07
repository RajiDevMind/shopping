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
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import Card from "../../components/card/Card";

import { toast } from "react-toastify";
import mastercard from "../../assets/mc_symbol.png";
import { Spinner } from "../../components/loader/Loader";
import { extractIdAndCartQuantity } from "../../utils";
import axios from "axios";

const CheckoutWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  const { isLoading } = useSelector((state) => state.order);

  const productIDs = extractIdAndCartQuantity(cartItems);

  const makePayment = async (e) => {
    if (cartTotalAmount < 1) {
      return toast.error("Cart amount is zero");
    }

    const resp = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/auth/order/payWithWallet`,
      {
        items: productIDs,
        cartItems,
        shippingAddress,
        coupon: coupon !== null ? coupon : { name: "nil" },
      }
    );
    console.log(resp.data);
    toast.success(resp.data.msg);
    window.location.href = resp.data.url;
  };

  const navigateToWallet = (e) => {
    navigate("/wallet");
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
                <h3>Sellout Wallet Checkout</h3>
                <div className="wallet-info --card --mr">
                  <span className="--flex-between">
                    <p>Account Balance</p>
                    <img src={mastercard} alt="mastercard" width={30} />
                  </span>
                  <h4>${user?.balance?.toFixed(2)}</h4>
                </div>
                <br />
                {cartTotalAmount < user?.balance ? (
                  <>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => makePayment()}
                      >
                        Pay Now
                      </button>
                    )}
                  </>
                ) : (
                  <div className="--center-all">
                    <h4>Insufficient balance!!!</h4>
                    <button
                      className="--btn --btn-danger --btn-block"
                      onClick={navigateToWallet}
                    >
                      Top Up Wallet
                    </button>
                  </div>
                )}
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutWallet;
