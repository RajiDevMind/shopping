import "./OrderHistory.scss";
import { useNavigate } from "react-router-dom";
import ListOfOrders from "./ListOfOrders.jsx";

const OrderHistory = () => {
  const navigate = useNavigate();

  const orderdetails = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <section>
      <div className="container order">
        <h2>Your Order History!</h2>
        <p>
          Open an order to <b>Review</b> the product
        </p>
        <br />
        <ListOfOrders orderdetails={orderdetails} />
      </div>
    </section>
  );
};

export default OrderHistory;
