import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCoupon,
  getAllCoupons,
} from "../../../redux/features/coupon/couponSlice";
import Card from "../../card/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../loader/Loader";

const CreateCoupon = ({ reloadCoupon }) => {
  const [coupName, setCoupName] = useState("");
  const [discount, setDiscount] = useState(50);
  const [expiresAt, setExpiresAt] = useState(new Date());

  const { isLoading } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const saveCoupon = async (e) => {
    e.preventDefault();
    if (coupName.length < 3) {
      return toast.error("Coupon name must be above 3 characters!");
    }

    const couponData = {
      name: coupName,
      discount,
      expiresAt,
    };
    await dispatch(createCoupon(couponData));
    setCoupName("");
    setDiscount(0);

    // display instantly when created
    dispatch(getAllCoupons());
    reloadCoupon();
  };

  return (
    <div className="--mb2">
      {isLoading && <Loader />}
      <h3>Create Coupon</h3>
      <p>
        Use this form to <b>create a coupon</b>
      </p>
      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveCoupon}>
          <label>Coupon Name:</label>
          <input
            type="text"
            name="coupName"
            placeholder="Coupon name"
            value={coupName}
            onChange={(e) => setCoupName(e.target.value)}
            required
          />
          <label>Coupon Discount:</label>
          <input
            type="number"
            name="discount"
            placeholder="Coupon discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <label>Expire Date:</label>
          <p>
            Recommended: (Future Date: 15 days ahead was added) feel free to
            change it
          </p>
          <DatePicker
            selected={expiresAt}
            value={expiresAt}
            onChange={(date) => setExpiresAt(date)}
            required
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Coupon
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCoupon;
