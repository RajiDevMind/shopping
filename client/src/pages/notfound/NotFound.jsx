import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section style={{ height: "80vh" }}>
      <div className="--center-all">
        <h2>Page Not Found!</h2>
        <p>Looks like the page you`re looking for could not be found!</p>
        <br />
        <Link to={"/"}>
          <button className="--btn">Back to Home</button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
