import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink";
import NavUsername from "../../pages/profile/NavUsername";
import { AdminOnlyLink } from "../hiddenLink/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalQuantity,
} from "../../redux/features/cart/cartSlice";
import { confirmAlert } from "react-confirm-alert";

export const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <img
        width={50}
        src="https://i.ibb.co/51gv68Y/Sellout-Logo.png"
        alt="Sellout Logo"
      />
    </Link>
  </div>
);

// destructuring active from react-router-dom V6
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

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

  // react-confirm-alert to delete review
  const confirmDelete = () => {
    confirmAlert({
      title: "Logging Out?",
      message: "Confirm to logout?",
      buttons: [
        {
          label: "Logout",
          onClick: () => logoutUser(),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const cart = (
    <span className={styles.cart}>
      <NavLink to={"/cart"}>
        Cart
        <FaShoppingCart size={22} />
        <p>{cartTotalQuantity}</p>
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
            <li>
              <AdminOnlyLink>
                <NavLink to="/admin/home" className={activeLink}>
                  | Admin
                </NavLink>
              </AdminOnlyLink>
            </li>
          </ul>

          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowOnLogin>
                <NavLink to={"/profile"} className={activeLink}>
                  <FaUserCircle size={18} color="#ff7722" />
                  <NavUsername />
                </NavLink>
              </ShowOnLogin>
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
                <Link to={"/"} onClick={confirmDelete}>
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
