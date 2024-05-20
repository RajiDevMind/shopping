import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons } from "../../../redux/features/coupon/couponSlice";
import { FaTrashAlt } from "react-icons/fa";
import "./Coupon.scss";

const CouponList = () => {
  const { isLoading, coupons } = useSelector((state) => state.coupon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

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
                        // onClick={() => confirmDelete(slug)}
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
