import React from "react";
import CreateCoupon from "./CreateCoupon";
import CouponList from "./CouponList";
import "./Coupon.scss";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../redux/features/cat&brands/CatsAndBrandsSlice";
const Coupon = () => {
  const dispatch = useDispatch();

  const reloadCoupon = () => {
    dispatch(getCategories());
  };

  return (
    <section>
      <div className="container coupon">
        <CreateCoupon reloadCoupon={reloadCoupon} />
        <CouponList />
      </div>
    </section>
  );
};

export default Coupon;
