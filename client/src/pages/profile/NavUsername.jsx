import React from "react";
import { useSelector } from "react-redux";
import { shortenText } from "../../utils";

const NavUsername = () => {
  const { user } = useSelector((state) => state.auth);

  const username = user?.name || "...";

  return (
    <span style={{ color: "#ff7722" }}>Hi, {shortenText(username, 6)} | </span>
  );
};

export default NavUsername;
