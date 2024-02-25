import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import LoginIMG from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { register, RESET_AUTH } from "../../redux/auth/authSlice.jsx";
import Loader from "../../components/loader/Loader.jsx";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;

  // useSelector to select an item from redux
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // matching name and value
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      return toast.error("All fields are required!!!");
    }
    if (password.length < 6) {
      return toast.error("Password must 6 characters beyond!!!");
    }
    if (!validateEmail(email)) {
      return toast.error("Kindly enter a valid Email!!!");
    }
    if (password !== cPassword) {
      return toast.error("Passwords do not match!!!");
    }

    const userData = {
      name,
      email,
      password,
    };
    // dispatch func from redux to send data to d server
    await dispatch(register(userData));
  };

  // to monitor logged in & loading state & navigate to home page
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    // dispatch func from redux to reset data to default states after loggedIn
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="full name"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="cPassword"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? </p>
              <Link to={"/login"}> Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={LoginIMG} alt="Login" width={400} />
        </div>
      </section>
    </>
  );
};

export default Register;
