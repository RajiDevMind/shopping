import React, { useEffect, useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectBillingAddress,
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const paymentMethod = useSelector(selectPaymentMethod);
  const shipAddress = useSelector(selectShippingAddress);
  const billAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // populate form data from localstorage via redux
  useEffect(() => {
    if (Object.keys(shipAddress).length > 0) {
      setShippingAddress({ ...shipAddress });
    }
    if (Object.keys(billAddress).length > 0) {
      setBillingAddress({ ...billAddress });
    }
  }, [dispatch, shipAddress, billAddress]);

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));

    if (paymentMethod === "") {
      toast.error("Select a payment method");
      navigate("/cart");
    }
    if (paymentMethod === "stripe") {
      navigate("/checkout-stripe");
    }
    if (paymentMethod === "flutterwave") {
      navigate("/checkout-flutter");
    }
    if (paymentMethod === "paypal") {
      navigate("/checkout-paypal");
    }
    if (paymentMethod === "wallet") {
      navigate("/checkout-wallet");
    }
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label>Recipient name:</label>
              <input
                type="text"
                name="name"
                placeholder="Recipient name"
                value={shippingAddress?.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 1:</label>
              <input
                type="text"
                name="line1"
                placeholder="Address line1"
                value={shippingAddress?.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 2:</label>
              <input
                type="text"
                name="line2"
                placeholder="Address line2"
                value={shippingAddress?.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>City:</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress?.city}
                onChange={(e) => handleShipping(e)}
              />

              <label>State:</label>
              <input
                type="text"
                name="state"
                placeholder="state"
                value={shippingAddress?.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>Postal code:</label>
              <input
                type="text"
                name="postal_code"
                placeholder="postal code"
                value={shippingAddress?.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              <label>Country:</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress?.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={shippingAddress?.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>

            {/* Billing address */}
            <Card cardClass={styles.card}>
              <h3>Billing Address</h3>
              <label>Recipient name:</label>
              <input
                type="text"
                name="name"
                placeholder="Recipient name"
                value={billingAddress?.name}
                onChange={(e) => handleBilling(e)}
              />
              <label>Address line 1:</label>
              <input
                type="text"
                name="line1"
                placeholder="Address line1"
                value={billingAddress?.line1}
                onChange={(e) => handleBilling(e)}
              />
              <label>Address line 2:</label>
              <input
                type="text"
                name="line2"
                placeholder="Address line2"
                value={billingAddress?.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label>City:</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={billingAddress?.city}
                onChange={(e) => handleBilling(e)}
              />

              <label>State:</label>
              <input
                type="text"
                name="state"
                placeholder="state"
                value={billingAddress?.state}
                onChange={(e) => handleBilling(e)}
              />
              <label>Postal code:</label>
              <input
                type="text"
                name="postal_code"
                placeholder="postal code"
                value={billingAddress?.postal_code}
                onChange={(e) => handleBilling(e)}
              />
              <label>Country:</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress?.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={billingAddress?.phone}
                onChange={(e) => handleBilling(e)}
              />
              <button className="--btn --btn-primary" type="submit">
                Proceed to Checkout
              </button>
            </Card>
          </div>
          {/* Checkout Summary */}
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
