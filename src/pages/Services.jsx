import React, { useState } from "react";
import Navbar from "../components/Navbar";
import stone from "../assets/stone.jpg";
import Client from "../components/Client";
import roller from "../assets/roller.jpg";
import loader from "../assets/loader.jpg";
import heavy from "../assets/heavy.jpg";
import power from "../assets/power.jpg";
import site from "../assets/site.svg";
import preconstruction from "../assets/preconstruction.svg";
import special from "../assets/special.svg";
import infra from "../assets/infra.svg";
import worker from "../assets/worker.jpg";
import { EnquiryFormModal } from "../components/Navbar"; // Import the EnquiryFormModal from Navbar

const Services = () => {
  const [featuredImage, setFeaturedImage] = useState(roller);
  const equipmentImages = [roller, loader, heavy, power];
  const smallImages = equipmentImages.filter((img) => img !== featuredImage);
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control contact form visibility

  const handleImageSwap = (clickedImage) => {
    setFeaturedImage(clickedImage);
  };

  // Function to open the contact form
  const openContactForm = () => {
    setIsFormOpen(true);
  };

  // Function to close the contact form
  const closeContactForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Enquiry Form Modal */}
      <EnquiryFormModal isOpen={isFormOpen} onClose={closeContactForm} />

      {/* Hero Section with Background Image */}
      <div
        className="w-full h-[80vh] sm:h-[90vh] md:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${stone})`,
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg mb-4 sm:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            Solution To Bring Your <br />
            Vision Live
          </h1>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 sm:bottom-20 animate-bounce text-white text-2xl sm:text-4xl">
          ⌄
        </div>
      </div>

      {/* Service Offerings Section (based on the image) */}
      <div className="w-full bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto flex flex-col md:flex-row">
          {/* Left side - Large equipment image */}
          <div className="w-full md:w-1/2 p-4 md:p-6">
            <div className="h-64 sm:h-80 md:h-96 lg:h-[28rem]">
              <img
                src={featuredImage}
                alt="Heavy Construction Equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Text and smaller images */}
          <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Get Ready Our Comprehensive Service Offerings
              </h2>
              {/* Increased letter spacing and line height in this paragraph */}
              <p className="mb-6 sm:mb-8 text-gray-700 tracking-wider leading-loose text-base sm:text-lg">
                Elevate Construction Standards: Providing Comprehensive
                Solutions Tailored To Your Unique Projects Needs. Ensuring
                Quality, Efficiency, And Client Satisfaction Every Step Of The
                Way
              </p>
            </div>

            {/* Three smaller equipment images with equal height and width */}
            <div className="flex flex-wrap">
              {smallImages.map((image, index) => (
                <div key={index} className="w-1/3 p-1 sm:p-2">
                  <div
                    className="aspect-square cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden"
                    onClick={() => handleImageSwap(image)}
                  >
                    <img
                      src={image}
                      alt={`Construction Equipment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section - Based on the new image */}
      <div className="w-full py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Aligned headings with the content below */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 md:pl-0">
              Our Services
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 md:pl-0 leading-relaxed">
              Building excellence, Delivering trust
            </h3>
          </div>

          {/* Site Management Section */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center mb-16 sm:mb-20">
            <div className="w-full md:w-2/3 pr-0 md:pr-12">
              <h4 className="text-xl sm:text-2xl font-semibold mb-4 border-b-2 border-red-600 pb-2 inline-block">
                Site Management
              </h4>
              <p className="text-gray-700 text-base sm:text-lg leading-loose tracking-wide">
                We ensure seamless project execution with efficient planning,
                resource management, and on-site supervision for optimal
                results. Our dedicated team monitors progress, addresses challenges
                proactively, and implements best practices to maintain quality
                standards throughout the construction process.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
              <div className="text-red-600 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <img
                  src={site}
                  alt="Site Management Icon"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Pre-Construction Section */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center mb-16 sm:mb-20">
            <div className="w-full md:w-2/3 pl-0 md:pl-12">
              <h4 className="text-xl sm:text-2xl font-semibold mb-4 border-b-2 border-red-600 pb-2 inline-block">
                Pre-Construction
              </h4>
              <p className="text-gray-700 text-base sm:text-lg leading-loose tracking-wide">
                Our expert team provides strategic planning, feasibility
                analysis, and risk assessment to lay a strong foundation for
                successful project execution. We collaborate closely with stakeholders
                to develop comprehensive project plans, establish realistic timelines,
                and identify potential challenges before construction begins.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
              <div className="text-red-600 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <img
                  src={preconstruction}
                  alt="Pre-Construction Icon"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Special Projects */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center mb-16 sm:mb-20">
            <div className="w-full md:w-2/3 pr-0 md:pr-12">
              <h4 className="text-xl sm:text-2xl font-semibold mb-4 border-b-2 border-red-600 pb-2 inline-block">
                Special Projects
              </h4>
              <p className="text-gray-700 text-base sm:text-lg leading-loose tracking-wide">
                We handle unique and complex projects with tailored solutions,
                innovative approaches, and a commitment to excellence. Our specialized
                team has the expertise to manage challenging construction requirements,
                implement cutting-edge techniques, and deliver exceptional results for
                projects that demand extraordinary attention to detail.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
              <div className="text-red-600 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <img
                  src={special}
                  alt="Special Projects Icon"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Infrastructure Construction */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center">
            <div className="w-full md:w-2/3 pl-0 md:pl-12">
              <h4 className="text-xl sm:text-2xl font-semibold mb-4 border-b-2 border-red-600 pb-2 inline-block">
                Infrastructure Constructions
              </h4>
              <p className="text-gray-700 text-base sm:text-lg leading-loose tracking-wide">
                From roads to large-scale developments, we deliver high-quality
                infrastructure projects that meet industry standards and client
                expectations. Our infrastructure expertise encompasses transportation
                networks, utility systems, and public facilities, all built with
                durability, functionality, and community impact in mind.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
              <div className="text-red-600 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <img
                  src={infra}
                  alt="Infrastructure Construction Icon"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* World Class Service Section - Based on the image you attached */}
      <div className="w-full py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="w-full md:w-1/2 pr-0 md:pr-10 flex flex-col h-full justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4 tracking-wide leading-tight">
                We Provide World Class Service
              </h2>
              <p className="text-gray-800 mb-8 text-base sm:text-lg leading-relaxed tracking-wide">
                End-to-end services, from site management and pre-construction planning to special projects and infrastructure construction.
              </p>
              <div>
                {/* Button to trigger the contact form popup */}
                <button
                  onClick={openContactForm}
                  className="bg-[#d20000] text-white font-medium py-3 px-8 uppercase tracking-wider text-sm hover:bg-red-700 transition duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
           
            {/* Right side image */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="h-64 sm:h-72 md:h-80 lg:h-96">
                <img
                  src={worker}
                  alt="Construction professionals reviewing plans"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Client />
    </div>
  );
};

export default Services;
