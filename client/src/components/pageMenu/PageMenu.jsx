import "./PageMenu.scss";
import { NavLink } from "react-router-dom";

const PageMenu = () => {
  return (
    <div>
      <section className="--bg-primary --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to={"/profile"}>Profile</NavLink>
          </li>
          <li>
            <NavLink to={"/wallet"}>My Wallet</NavLink>
          </li>
          <li>
            <NavLink to={"/wishlists"}>Wish Lists</NavLink>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PageMenu;
