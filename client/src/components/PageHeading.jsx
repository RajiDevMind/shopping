import { Link } from "react-router-dom";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">
          <Link to={"/shop"}>{btnText}</Link>
        </button>
      </div>
      <div className="--hr"></div>
    </>
  );
};
export default PageHeading;
