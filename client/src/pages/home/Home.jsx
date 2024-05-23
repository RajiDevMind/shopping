import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import "./Home.scss";
import HomeInfoBox from "./HomeInfoBox";
import PageHeading from "../../components/PageHeading";
import { productData } from "../../components/carousel/data";
import CarouselItems from "../../components/carousel/Carousel-items";
import ProductCarousel from "../../components/carousel/Carousel";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/features/products/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Latest Product start here
  const latest = products
    ?.filter((product) => {
      return product.quantity > 0;
    })
    ?.filter((product, index) => index < 7); // return the last 6 products uploaded the shop

  const latestProducts = latest.map((item, index) => {
    return (
      <div key={index}>
        <CarouselItems
          name={item.name}
          url={item.image[0]}
          price={item.price}
          regularPrice={item.regularPrice}
          description={item.description}
          product={item}
        />
      </div>
    );
  });
  // Latest Product Ends

  // phones in category starts
  const phones = products
    ?.filter((product) => {
      return product.quantity > 0;
    })
    ?.filter((product) => {
      return product.category === "Phone";
    })
    ?.filter((product, index) => index < 7); // return the last 6 products uploaded the shop

  const phoneProducts = phones.map((item, index) => {
    return (
      <div key={index}>
        <CarouselItems
          name={item.name}
          url={item.image[0]}
          price={item.price}
          regularPrice={item.regularPrice}
          description={item.description}
          product={item}
        />
      </div>
    );
  });
  // phones in category starts

  // const productss = productData.map((item, index) => {
  //   return (
  //     <div key={index}>
  //       <CarouselItems
  //         name={item.name}
  //         url={item.imageurl}
  //         price={item.price}
  //         description={item.description}
  //       />
  //     </div>
  //   );
  // });
  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
          <ProductCarousel product={latestProducts} />
        </div>
      </section>
      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductCategory />
        </div>
      </section>
      <section>
        <div className="container">
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now >>>"} />
          <ProductCarousel product={phoneProducts} />
        </div>
      </section>
      <FooterLinks />
    </>
  );
};

export default Home;
