import React from "react";
import ReactSlider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: "slides",
  autoplay: true,
  autoplaySpeed: 5000,
};

export default function Slider({ children, ...props }) {
  return (
    <ReactSlider {...settings} {...props}>
      {children}
    </ReactSlider>
  );
}
