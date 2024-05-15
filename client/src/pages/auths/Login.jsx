import { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import LoginIMG from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../utils";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, isSuccess, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required!!!");
    }

    if (!validateEmail(email)) {
      return toast.error("Kindly enter a valid Email!!!");
    }

    const userData = {
      email,
      password,
    };
    // dispatch func from redux to send data to d server
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");

      dispatch(RESET_AUTH());
    }
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={LoginIMG} alt="Login" width={400} />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>
            <span className={styles.register}>
              <p>Don`t have an account? </p>
              <Link to={"/register"}> Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
