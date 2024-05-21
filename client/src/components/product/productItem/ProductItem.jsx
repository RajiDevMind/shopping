import React from "react";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";
import { Link } from "react-router-dom";
import { calculateAverageRatings, shortenText } from "../../../utils";
import { toast } from "react-toastify";
import DOMpurify from "dompurify";
import ProductRating from "../productRating/ProductRating";

const ProductItem = ({
  product,
  name,
  grid,
  _id,
  price,
  image,
  description,
  regularPrice,
  quantity,
}) => {
  const averageRating = calculateAverageRatings(product?.ratings);

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${_id}`}>
        <div className={styles.img}>
          <img src={image[0]} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>
            <span>{regularPrice > 0 && <del>${regularPrice}</del>}</span>{" "}
            {`$${price}`}
          </p>
          <ProductRating
            averageRating={averageRating}
            noOfRatings={product?.ratings?.length}
          />
          <h4>{shortenText(name, 18)}</h4>

          {!grid && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMpurify.sanitize(shortenText(description, 120)),
              }}
            ></div>
          )}
          {quantity > 0 ? (
            <button className="--btn --btn-primary">Add to cart</button>
          ) : (
            <button
              className="--btn --btn-danger"
              onClick={() => toast.error("Sorry, Product is out of stock")}
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
