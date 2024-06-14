import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../../redux/features/order/OrderSlice";

import OrderDetailsComp from "./OrderDetailsComp";

const Orderdetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  return (
    <section>
      <OrderDetailsComp orderPageLink={"/order-history"} />
    </section>
  );
};

export default Orderdetails;
