import React from "react";
import { Link } from "react-router-dom";
import OrderDetailsComp from "../../order/OrderDetailsComp";

const OrderDetails = ({ orderPageLink }) => {
  return (
    <div className="container">
      {/* <h2>Order Details</h2>
      <div>
        <Link to={"/admin/orders"}>&larr; Back to orders</Link>
      </div> */}
      <OrderDetailsComp orderPageLink={"/admin/orders"} />
      <br />
    </div>
  );
};

export default OrderDetails;
