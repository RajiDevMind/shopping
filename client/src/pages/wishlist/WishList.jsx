import React, { useEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import styles from "../../components/product/productList/ProductList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWishList,
  removeWishList,
} from "../../redux/features/auth/authSlice";
import ProductItem from "../../components/product/productItem/ProductItem";
import Loader from "../../components/loader/Loader";

const WishList = () => {
  const [grid, setGrid] = useState(true);

  const dispatch = useDispatch();

  const { wishList, isLoading } = useSelector((state) => state.auth);

  const removeWish = async (product) => {
    const productId = product._id;
    await dispatch(removeWishList(productId));
    await dispatch(getAllWishList());
  };

  useEffect(() => {
    dispatch(getAllWishList());
  }, [dispatch]);

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>My WishList</h2>
          <div className="--underline"></div>
          <div className={grid ? `${styles.grid}` : `${styles.list}`}>
            {wishList?.length === 0 ? (
              <p>No Product found in your wish List</p>
            ) : (
              <>
                {wishList?.map((product, index) => {
                  return (
                    <div key={product._id}>
                      <ProductItem {...product} grid={grid} product={product} />
                      <button
                        className="--btn --btn-danger --btn-block"
                        onClick={() => removeWish(product)}
                      >
                        Remove from WishList
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WishList;
