import React from "react";
import ListOfOrders from "../../order/ListOfOrders";
import { useNavigate } from "react-router-dom";

const Order = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getAllOrders());
  // }, [dispatch]);

  const orderdetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div className="container order">
      <h2>All Orders</h2>
      <p>
        Open an order to <b>Change order status</b>
      </p>
      <br />
      <ListOfOrders orderdetails={orderdetails} />
    </div>
  );
};

export default Order;
