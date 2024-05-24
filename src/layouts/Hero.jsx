import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import slider4 from "../assets/slider4.png";

function Hero() {
  const slides = [
    {
      image: slider1,
      title: "We Care About",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!",
    },
    {
      image: slider2,
      title: "We Care About",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!",
    },
    {
      image: slider3,
      title: "We Care About",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!",
    },
    {
        image: slider4,
        title: "We Care About",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!",
      },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full">
            <section className="bg-cover bg-center bg-no-repeat w-full" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:flex lg:w-screen lg:h-[75vh] lg:items-center lg:px-8">
                <div className="flex flex-col gap-5">
                  <div className="flex self-start px-4 py-2 font-extrabold bg-white rounded-3xl text-neutral-500">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c0bcdf3061b839c1660daa6c3466a0ef1152ae090b51aafa1919bcd8bee7b49?apiKey=cceb8282e0e64aaeb0533b2dfea39e76&" alt="Live Your Life" className="shrink-0 self-start w-10 aspect-square"/>
                    <div className="flex-auto my-auto">LIVE YOUR LIFE</div>
                  </div>
                  <div className="max-w-creen-xl ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-4xl font-extrabold">
                      {slide.title}{" "}
                      <strong className="block font-extrabold text-cyan-500">
                        Your Health
                      </strong>
                    </h1>
                    <p className="text-base py-6 max-w-lg">
                      {slide.description}
                    </p>
                    <Button variant="contained">
                      <Link to="/contact">CONTACT US</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Hero;
