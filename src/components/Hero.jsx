import React from "react";
import hero from "../assets/hero.mp4";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={hero}
      />

      {/* Overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div> */}

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-relaxed tracking-wider">
          LEADING MINING AND <br /> CONSTRUCTION EXPERTS
        </h1>

        {/* Scroll Down Indicator - Moved up */}
        <div className="absolute bottom-50 animate-bounce text-white text-5xl">
          ⌄
        </div>
      </div>
    </div>
  );
};

export default Hero;
