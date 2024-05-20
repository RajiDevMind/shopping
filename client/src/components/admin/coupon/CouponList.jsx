import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
} from "../../../redux/features/coupon/couponSlice";
import { FaTrashAlt } from "react-icons/fa";
import "./Coupon.scss";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CouponList = () => {
  const { isLoading, coupon, coupons } = useSelector((state) => state.coupon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons());
    // dispatch(getSingleCoupon("DGDGS2344WE")); // get coupon by its name
  }, [dispatch]);

  // react-confirm-alert to delete category
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Coupon",
      message: "Are you sure to delete this Coupon?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteCoup(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const deleteCoup = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getAllCoupons());
  };
  return (
    <div className="--mb2">
      <h3>All coupons</h3>

      <div className="table">
        {coupons.length < 0 ? (
          <p>No Coupon found!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Name</th>
                <th>Discount (%)</th>
                <th>Date Created</th>
                <th>Expires At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => {
                const { _id, name, discount, createdAt, expiresAt } = coupon;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{discount} %</td>
                    <td>{createdAt.substring(0, 10)} </td>
                    <td>{expiresAt.substring(0, 10)}</td>
                    <td>
                      <FaTrashAlt
                        size={20}
                        color="red"
                        onClick={() => confirmDelete(_id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CouponList;
