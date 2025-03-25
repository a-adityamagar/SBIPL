import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Client from '../components/Client';
import project from "../assets/project.jpg";

function Projects() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section  */}
      <div
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${project})`,
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            Our Projects <br />
            Building Excellence, Delivering Results
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
            Discover our portfolio of successful projects that showcase our commitment to quality, 
            innovation, and client satisfaction across various industries.
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-20 animate-bounce text-white text-xl sm:text-2xl md:text-4xl">
          ⌄
        </div>
      </div>

      {/* Client Section */}
      <Client />
    </div>
  );
}

export default Projects;
