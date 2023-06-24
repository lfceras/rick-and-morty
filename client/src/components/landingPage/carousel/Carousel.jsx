import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import rick1 from "../../../assets/rick1.jpg";
import rick2 from "../../../assets/rick2.jpg";
import rick3 from "../../../assets/rick3.jpg";
import rick4 from "../../../assets/rick4.jpg";
import rick5 from "../../../assets/rick5.jpg";
import "./carousel.css";
import { Link } from "react-router-dom";

const Carousel = () => {
  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img
      src={rick1}
      onDragStart={handleDragStart}
      role="presentation"
      className="image"
    />,
    <img
      src={rick2}
      onDragStart={handleDragStart}
      role="presentation"
      className="image"
    />,
    <img
      src={rick3}
      onDragStart={handleDragStart}
      role="presentation"
      className="image"
    />,
    <img
      src={rick4}
      onDragStart={handleDragStart}
      role="presentation"
      className="image"
    />,
    <img
      src={rick5}
      onDragStart={handleDragStart}
      role="presentation"
      className="image"
    />,
  ];

  return (
    <div>
      <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls={true}
        autoPlayInterval={2000}
        autoPlay={true}
        infinite={true}
        disableDotsControls={true}
      />
      <Link to={"/home"}>
        <button className="btn2">Ingresar</button>
      </Link>
    </div>
  );
};

export default Carousel;
