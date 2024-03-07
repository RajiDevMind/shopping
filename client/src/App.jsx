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
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/auth/authSlice";

// asset to make API calls with axios
axios.defaults.baseURL = "http://localhost:2000";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

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
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    </div>
  );
};

export default App;
