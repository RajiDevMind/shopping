import React, { useEffect } from "react";
import "./OrderHistory.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/features/order/orderSlice";
import Loader from "../loader/Loader.jsx";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, msg, orders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <section>
      <div className="container order">
        <h2>Your Order History!</h2>
        <p>
          Open an order to <b>Review</b> the product
        </p>
        <>
          {isLoading && <Loader />}
          <div className="table">
            {orders.length === 0 ? (
              <p>No Order Found!</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S/No</th>
                    <th>Date</th>
                    <th>Oder ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      _id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{_id}</td>
                        <td>${orderAmount}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? "pending"
                                : "delivered"
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
