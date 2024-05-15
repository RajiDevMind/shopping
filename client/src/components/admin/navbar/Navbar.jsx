import React from "react";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(selectUser);
  const username = user?.name;

  // destructuring active from react-router-dom V6
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/admin/home"} className={activeLink}>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
