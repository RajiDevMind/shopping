import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink";

export const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Sell<span>Out</span>.
      </h2>
    </Link>
  </div>
);

// destructuring active from react-router-dom V6
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  // state to fix navbar
  const [scrollPage, setScrollPage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fixNavbar = () => {
    window.scrollY > 400 ? setScrollPage(true) : setScrollPage(false);
  };
  // event triggered
  window.addEventListener("scroll", fixNavbar);

  // toggling to show menu while in responsive
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  const cart = (
    <span className={styles.cart}>
      <NavLink to={"/cart"}>
        Cart
        <FaShoppingCart size={22} />
        <p>0</p>
      </NavLink>
    </span>
  );
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/shop" className={activeLink}>
                Shop
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to={"/login"} className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogout>
                <NavLink to={"/register"} className={activeLink}>
                  Register
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to={"/order-history"} className={activeLink}>
                  My Order
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <Link to={"/"} onClick={logoutUser}>
                  logout
                </Link>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
