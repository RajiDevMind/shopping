import React from "react";
import OrderDetailsComp from "../../order/OrderDetailsComp";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetailed = () => {
  return (
    <>
      <OrderDetailsComp orderPageLink={"/admin/orders"} />
      <ChangeOrderStatus />
    </>
  );
};

export default OrderDetailed;
