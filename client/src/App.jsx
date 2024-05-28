import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auths/Login";
import Register from "./pages/auths/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/Admin/Admin";
import AdminOnlyRoute from "./components/hiddenLink/AdminOnlyRoute";
import NotFound from "./pages/notfound/NotFound";
import Product from "./pages/shop/Product";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./components/order/OrderHistory";
import Orderdetails from "./components/order/Orderdetails";
import CheckoutWithFlutterwave from "./pages/checkout/CheckoutWithFlutterwave";
import CheckoutPayPal from "./pages/checkout/CheckoutPayPal";

// asset to make API calls with axios
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);
  // retain loggedin status when page reload
  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <div>
      <>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Product />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details/:id" element={<Orderdetails />} />

            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/checkout-stripe" element={<Checkout />} />
            <Route
              path="/checkout-flutterwave"
              element={<CheckoutWithFlutterwave />}
            />
            <Route path="/checkout-paypal" element={<CheckoutPayPal />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />

            <Route
              path="/admin/*"
              element={
                <AdminOnlyRoute>
                  <Admin />
                </AdminOnlyRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    </div>
  );
};

export default App;
