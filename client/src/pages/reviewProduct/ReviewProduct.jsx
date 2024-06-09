import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReview,
  getSingleProduct,
  reviewProduct,
  updateReview,
} from "../../redux/features/products/ProductSlice";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import StarRating from "react-star-ratings";
import { Spinner } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { confirmAlert } from "react-confirm-alert";

const ReviewProduct = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [userReview, setUserReview] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, isLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const changeStarRating = (newRating, name) => {
    setRating(newRating);
    console.table(newRating, name);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();

    if (rating === 0 || review === "") {
      return toast.error("Invalid input! Enter star and review.");
    }

    const reviewData = { star: rating, review, reviewDate: date };

    await dispatch(reviewProduct({ id, reviewData }));
    navigate(-1);
  };

  // react-confirm-alert to delete review
  const confirmDelete = () => {
    confirmAlert({
      title: "Delete Review?",
      message: "Are you sure to delete your review?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delReview(),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const delReview = async (e) => {
    const reviewData = {
      userID: user?._id,
    };
    await dispatch(deleteReview({ id, reviewData }));
    navigate(-1);
  };

  // filter and compare product.rating userID and user?._id
  useEffect(() => {
    const reviewed = product?.ratings.filter((rev) => {
      return rev.userID === user?._id;
    });
    setUserReview(reviewed);
  }, [product, user]);

  //  populate the previous reviews in the form field
  const startEdit = async (e) => {
    setIsEditing(true);

    setRating(userReview[0].star);
    setReview(userReview[0].review);
  };

  const editReview = async (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    if (rating === 0 || review === "") {
      return toast.error("Invalid input! Enter star and review.");
    }

    const reviewData = {
      star: rating,
      review,
      reviewDate: date,
      userID: userReview[0].userID,
    };

    await dispatch(updateReview({ id, reviewData }));
    navigate(-1);
  };

  return (
    <section>
      <div className="container review">
        <h2>Review Products</h2>
        {isLoading && product === null ? (
          <Spinner />
        ) : (
          <>
            <p>
              {" "}
              <b>Product</b> {product?.name}
            </p>
            <img src={product?.image[0]} alt={product?.name} width={100} />
          </>
        )}
        {userReview?.length > 0 && !isEditing ? (
          <Card cardClass={"card"}>
            <h3>Product Reviews</h3>
            <div>
              {userReview.map((reviewData, index) => {
                const { name, review, reviewDate, star, userID } = reviewData;
                return (
                  <div key={index} className="review --flex-between --p">
                    <div>
                      <StarRating
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="#F6B01E"
                        // starHoverColor="#F6B01E"
                        rating={star}
                        changeRating={changeStarRating}
                        editing={false}
                        isSelectable={true}
                      />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>By: {name}</b>
                      </span>
                    </div>
                    <div>
                      <FaEdit
                        color="green"
                        className="--btn"
                        size={40}
                        onClick={() => startEdit()}
                      />
                      <BsTrash
                        className="--btn"
                        color="red"
                        size={40}
                        onClick={confirmDelete}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card cardClass={"card --width-500px --p"}>
            <form>
              <label>Star Rating</label>
              <StarRating
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#F6B01E"
                starHoverColor="#F6B01E"
                rating={rating}
                changeRating={changeStarRating}
                editing={true}
                isSelectable={true}
              />
              <label>Review</label>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
              {!isEditing ? (
                <button
                  className="--btn --btn-primary"
                  onClick={(e) => submitReview(e)}
                >
                  Submit Review
                </button>
              ) : (
                <div className="--flex-start">
                  <button
                    className="--btn --btn-primary"
                    onClick={(e) => editReview(e)}
                  >
                    Update Review
                  </button>
                  <button className="--btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </Card>
        )}
      </div>
    </section>
  );
};
export default ReviewProduct;
