import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      &copy; {date} All Right Reserved --<span>RajiDevmind</span>
    </div>
  );
};

export default Footer;
