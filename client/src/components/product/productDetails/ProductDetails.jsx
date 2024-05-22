import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../../redux/features/products/ProductSlice";
import { Spinner } from "../../loader/Loader";
import ProductRating from "../productRating/ProductRating";
import { calculateAverageRatings } from "../../../utils";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import Card from "../../card/Card";
import { ADD_TO_CART } from "../../../redux/features/cart/cart";

const ProductDetails = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  // slider.
  const slideLength = product?.image?.length;
  const nextSlide = () => {
    setImgIndex(imgIndex === slideLength - 1 ? 0 : imgIndex + 1);
  };
  //flipping product image every 3 secs
  let slideInterval;
  useEffect(() => {
    if (product?.image?.length > 1) {
      const autoScroll = () => {
        slideInterval = setInterval(nextSlide, 3000);
      };
      autoScroll();
    }
    return () => clearInterval(slideInterval);
  }, [imgIndex, product, slideInterval]);
  // slider, flipper ends here

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  const averageRating = calculateAverageRatings(product?.ratings);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to={"/shop"}>&larr; Back To Products Page</Link>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img
                  src={product?.image[imgIndex]}
                  alt={product?.name}
                  className={styles.pImg}
                />
                <div className={styles.smallImg}>
                  {product?.image.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        alt="product image"
                        onClick={() => setImgIndex(index)}
                        className={imgIndex === index ? `activeImg` : ""}
                      />
                    );
                  })}
                </div>
              </div>

              <div className={styles.content}>
                <h3>{product?.name}</h3>
                <ProductRating
                  averageRating={averageRating}
                  noOfRatings={product?.ratings?.length}
                />
                <div className="--underline"></div>
                <div className={styles.property}>
                  <p>
                    <b>Price:</b>
                  </p>
                  <p className={styles.price}>{`$${product?.price}`}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>SKU:</b>
                  </p>
                  <p>{product?.sku}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Category:</b>
                  </p>
                  <p>{product?.category}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Brand:</b>
                  </p>
                  <p>{product?.brand}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Color:</b>
                  </p>
                  <p>{product?.color}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Quauntity in stock:</b>
                  </p>
                  <p>{product?.quantity}</p>
                </div>
                <div className={styles.property}>
                  <p>
                    <b>Sold:</b>
                  </p>
                  <p>{product?.sold}</p>
                </div>
                <div className="--flex-start">
                  {product?.quantity > 0 ? (
                    <button
                      className="--btn --btn-primary"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button
                      className="--btn --btn-red"
                      onClick={() => toast.error("Sorry, Product out of stock")}
                    >
                      OUT OF STOCK
                    </button>
                  )}
                  <button className="--btn --btn-danger">
                    ADD TO WISHLIST
                  </button>
                </div>
                <div className="--underline"></div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.description),
                  }}
                ></div>
              </div>
            </div>
          </>
        )}
        {/* Review section */}
        <Card cardClass={styles.card}>
          <h3>Product Reviews?</h3>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
