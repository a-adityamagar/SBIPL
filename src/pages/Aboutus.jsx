import React, { useState } from "react";
import Navbar from "../components/Navbar";
import stone from "../assets/stone.jpg";
import truck from "../assets/truck.jpg";
import doz from "../assets/doz.jpg";
import suramveer from "../assets/suramveer.png";
import surendra from "../assets/surendra.png";

const Aboutus = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  const togglePositions = () => {
    setIsSwapped(!isSwapped);
  };

  // Define board members data
  const boardMembers = [
    {
      name: "SURAMVEER",
      image: suramveer,
      quote: "I am honored to address SBIPL Ltd., a leader in the construction industry. Our journey has been one of growth, challenges, and success. With a dedicated team and a shared vision, we remain committed to innovation and excellence.",
    },
    {
      name: "SURENDRA PAL",
      image: surendra,
      quote: "At SBIPL, we believe in setting new industry standards through innovation and quality workmanship. Our team's dedication and strategic planning have enabled us to deliver exceptional results across all our projects.",
    }
  ];

  // Determine which member appears on left or right based on swap state
  const leftMember = isSwapped ? boardMembers[1] : boardMembers[0];
  const rightMember = isSwapped ? boardMembers[0] : boardMembers[1];

  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <div
        className="w-full h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${stone})`
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg mb-6 leading-relaxed tracking-widest">
            WELCOME TO SBIPL <br />
            PROJECT LTD.
          </h1>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-20 animate-bounce text-white text-4xl">
          ⌄
        </div>
      </div>
      
      {/* About Us Section - Images aligned to outer edges */}
      <section className="py-12 px-0 md:px-0 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Top section - Text on left, Image on right */}
          <div className="flex flex-col md:flex-row mb-12">
            <div className="md:w-3/5 px-4 md:px-12 py-6 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold mb-2">About Us</h2>
              <h3 className="text-4xl font-bold mb-5 text-red-600">
                We build for people
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed tracking-wide">
                Founded in 2008, SBIPL entered the thriving mining and stone-crushing industry
                with the goal of becoming a trusted and reputable name. Officially incorporated as
                SBIPL Projects Limited on August 28, 2012, we are a Non-Government Company registered
                in Delhi, committed to excellence in construction and infrastructure development.
              </p>
            </div>
            <div className="md:w-2/5 h-64 sm:h-80 md:h-96">
              <img
                src={doz}
                alt="SBIPL Heavy Equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Bottom section - Image on left, Text on right */}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 order-last md:order-first h-64 sm:h-80 md:h-96">
              <img
                src={truck}
                alt="SBIPL Equipment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 px-4 md:px-12 py-6 order-first md:order-last flex flex-col justify-center">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed tracking-wide">
                At SBIPL, we take pride in our clean and sound track record, with no disputes,
                litigation, or arbitration issues. Our commitment to transparency, professionalism,
                and continuous learning has driven our success and helped us contribute to the nation's
                infrastructure growth.
              </p>
              <p className="font-bold text-base md:text-lg mt-6">
                Building the future, one project at a time!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Board Members Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">BOARD MEMBERS</h2>
          
          <div className="flex flex-col md:flex-row">
            {/* Left side - Only the board member image */}
            <div className="md:w-1/2 px-4 mb-8 md:mb-0">
            
              <div className="bg-amber-400 rounded-lg overflow-hidden">
                <img 
                  src={leftMember.image} 
                  alt={leftMember.name} 
                  className="w-full h-80 object-cover object-center"
                />
              </div>
            </div>
            
            {/* Right side - Quote, name, and another picture with hover/click */}
            <div className="md:w-1/2 px-4 mt-8 md:mt-0">

            
            <h3 className="text-3xl font-bold text-red-600 text-center">{leftMember.name}</h3>
                <div className="h-1 bg-red-600 w-full mt-2 mb-4"></div>
              <div 
                className="cursor-pointer"
                onClick={togglePositions}
              >
                {/* Quote section from person on left */}
                <div className="bg-gradient-to-b from-red-600 to-red-700 rounded-lg overflow-hidden mb-4 transition-transform duration-300 hover:scale-105">
                  <div className="relative">
                    <img 
                      src={rightMember.image} 
                      alt={rightMember.name} 
                      className="w-full h-56 object-cover object-center opacity-30"
                    />
                    
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                      <p className="text-sm md:text-base text-center">
                        {leftMember.quote}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Name of person on left */}
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;