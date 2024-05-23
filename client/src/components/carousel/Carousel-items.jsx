import React from "react";
import "./Carousel.scss";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils";
import { ADD_TO_CART, saveCartDB } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

function removeHTMLtags(input) {
  const regex = /<[^>]+>/g;
  return input.replace(regex, "");
}
const CarouselItems = ({
  url,
  name,
  price,
  regularPrice,
  description,
  product,
}) => {
  const desc = removeHTMLtags(description);
  const dispatch = useDispatch();

  const addToCart = (carts) => {
    dispatch(ADD_TO_CART(carts));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  return (
    <div className="carouselItem">
      <Link to={`/product-details/${product?._id}`}>
        <img src={url} alt={description} className="product--image" />

        <p className="price">
          <span>{regularPrice > 0 && <del>{regularPrice}</del>}</span>
          {` $${price}`}
        </p>

        <h4>{shortenText(name, 13)}</h4>
        <p className="--mb">{shortenText(desc, 26)}</p>
      </Link>
      <button
        className="--btn --btn-primary --btn-block"
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default CarouselItems;
