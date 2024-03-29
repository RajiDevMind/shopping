import React from "react";
import Slider from "../../components/slider/Slider";
import "./Home.scss";
import HomeInfoBox from "./HomeInfoBox";
import PageHeading from "../../components/PageHeading";
import { productData } from "../../components/carousel/data";
import CarouselItems from "../../components/carousel/Carousel-items";
import ProductCarousel from "../../components/carousel/Carousel";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../components/footer/FooterLinks";

const Home = () => {
  const products = productData.map((item, index) => {
    return (
      <div key={index}>
        <CarouselItems
          name={item.name}
          url={item.imageurl}
          price={item.price}
          description={item.description}
        />
      </div>
    );
  });
  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
          <ProductCarousel product={products} />
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
          <ProductCarousel product={products} />
        </div>
      </section>
      <FooterLinks />
    </>
  );
};

export default Home;
