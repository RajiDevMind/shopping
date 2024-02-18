import React from "react";
import styles from "./Loader.module.scss";

import ReactDOM from "react-dom";
import loaderIMG from "../../assets/loader.gif";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderIMG} alt="loading" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="--center-all">
      <img src={loaderIMG} alt="loading" width={35} />
    </div>
  );
};

export default Loader;
