import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import stone from "../assets/stone.jpg";
import truck from "../assets/truck.jpg";
import doz from "../assets/doz.jpg";
import suramveer from "../assets/suramveer.png";
import surendra from "../assets/surendra.png";
import building from "../assets/building.jpg";
import Client from "../components/Client";

const Aboutus = () => {
  const [isSwapped, setIsSwapped] = useState(false);
  const [rightSideHeight, setRightSideHeight] = useState(0);
  const rightSideRef = useRef(null);
  const [missionContentHeight, setMissionContentHeight] = useState(0);
  const missionContentRef = useRef(null);

  const togglePositions = () => {
    setIsSwapped(!isSwapped);
  };

  // Measure the height of the right side content in board members section
  useEffect(() => {
    const updateHeight = () => {
      if (rightSideRef.current) {
        const height = rightSideRef.current.offsetHeight;
        setRightSideHeight(height);
      }
     
      if (missionContentRef.current) {
        const height = missionContentRef.current.offsetHeight;
        setMissionContentHeight(height);
      }
    };
   
    // Initial measurement after a short delay to ensure rendering is complete
    const timer = setTimeout(() => {
      updateHeight();
    }, 100);
   
    // Update on window resize
    window.addEventListener('resize', updateHeight);
   
    // Update when swap state changes
    updateHeight();
   
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeight);
    };
  }, [isSwapped]); // Re-run when isSwapped changes

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

  // Determine which board member to display on the left and right
  const leftMember = isSwapped ? boardMembers[1] : boardMembers[0];
  const rightMember = isSwapped ? boardMembers[0] : boardMembers[1];

  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar Component */}
      <Navbar />
     
      {/* Hero Section */}
      <div
        className="w-full h-[80vh] sm:h-[90vh] md:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${stone})`
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold drop-shadow-lg mb-4 sm:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            WELCOME TO SBIPL <br />
            PROJECT LTD.
          </h1>
        </div>
       
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 sm:bottom-20 animate-bounce text-white text-2xl sm:text-4xl">
          ⌄
        </div>
      </div>
     
      {/* About Us */}
      <section className="py-8 sm:py-12 px-4 sm:px-0 md:px-0 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row mb-8 sm:mb-12">
            <div className="md:w-3/5 px-2 sm:px-4 md:px-12 py-4 sm:py-6 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-1 sm:mb-2">About Us</h2>
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-5 text-red-600">
                We build for people
              </h3>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
                Founded in 2008, SBIPL entered the thriving mining and stone-crushing industry
                with the goal of becoming a trusted and reputable name. Officially incorporated as
                SBIPL Projects Limited on August 28, 2012, we are a Non-Government Company registered
                in Delhi, committed to excellence in construction and infrastructure development.
              </p>
            </div>
            <div className="md:w-2/5 h-48 sm:h-64 md:h-80 lg:h-96 mt-4 md:mt-0">
              <img
                src={doz}
                alt="SBIPL Heavy Equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 order-last md:order-first h-48 sm:h-64 md:h-80 lg:h-96 mt-4 md:mt-0">
              <img
                src={truck}
                alt="SBIPL Equipment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 px-2 sm:px-4 md:px-12 py-4 sm:py-6 order-first md:order-last flex flex-col justify-center">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
                At SBIPL, we take pride in our clean and sound track record, with no disputes,
                litigation, or arbitration issues. Our commitment to transparency, professionalism,
                and continuous learning has driven our success and helped us contribute to the nation's
                infrastructure growth.
              </p>
              <p className="font-bold text-sm sm:text-base md:text-lg mt-4 sm:mt-6">
                Building the future, one project at a time!
              </p>
            </div>
          </div>
        </div>
      </section>

     
      {/* Board Members Section */}
      <section className="py-8 sm:py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-right mb-4 sm:mb-8">BOARD MEMBERS</h2>
         
          {/* Grid layout  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Board member image  */}
            <div className="h-full">
              <div
                className="rounded-lg overflow-hidden h-full"
                style={{ 
                  height: rightSideHeight > 0 && window.innerWidth >= 768 ? `${rightSideHeight}px` : 'auto'
                }}
              >
                <img
                  src={leftMember.image}
                  alt={leftMember.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
           
         
            <div className="flex flex-col h-full" ref={rightSideRef}>
              <div className="rounded-lg p-3 sm:p-6 mb-2 sm:mb-4 flex-grow-0">
                <p className="text-base sm:text-lg md:text-xl tracking-wide leading-relaxed">
                  {leftMember.quote}
                </p>
              </div>
             
            
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 text-center flex-grow-0">{leftMember.name}</h3>
              <div className="h-0.5 bg-red-600 w-full mt-1 mb-2 sm:mb-4 flex-grow-0"></div>
            
              <div
                className="cursor-pointer rounded-lg overflow-hidden relative transition-transform duration-300 flex-grow h-48 sm:h-60 md:h-72"
                onClick={togglePositions}
              >
                <img
                  src={rightMember.image}
                  alt={rightMember.name}
                  className="w-full h-full object-cover object-center opacity-50 transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/70 to-red-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4 md:p-6">
               
                  <div>
                    <p className="text-white text-xs sm:text-sm md:text-base font-medium drop-shadow-md tracking-wide leading-relaxed">
                      {rightMember.quote}
                    </p>
                  </div>
                 
                  <div>
                    <p className="text-white text-base sm:text-lg md:text-2xl font-bold uppercase tracking-wider drop-shadow-md">
                      {rightMember.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </section>
     
      {/* Our Mission Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start">
           
            <div className="md:pr-8" ref={missionContentRef}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-gray-800">OUR MISSION</h2>
            
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6 text-red-600 tracking-wide sm:tracking-wider leading-tight">
                We Aim to Build a<br />Better World
              </h3>
              <div className="space-y-3 sm:space-y-6">
               
                <p className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose tracking-wide sm:tracking-wider">
                  Our vision is to set a strong foundation for excellence by prioritizing complete
                  customer satisfaction. We aim to deliver globally competitive services
                  while continuously adapting to evolving industry standards.
                </p>
            
                <p className="text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose tracking-wide sm:tracking-wider">
                  With a dedicated and skilled team, we strive for continuous improvement,
                  ensuring high-quality service and unwavering commitment. Our goal is to
                  achieve zero-defect support, building lasting trust and reliability with our
                  valued customers.
                </p>
              </div>
            </div>
           
       
            <div className="mt-4 md:mt-0">
              <div
                className="overflow-hidden shadow-lg"
                style={{ 
                  height: missionContentHeight > 0 && window.innerWidth >= 768 ? `${missionContentHeight}px` : '250px'
                }}
              >
                <img
                  src={building}
                  alt="Construction site with city skyline"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Client/>
    </div>
  );
};

export default Aboutus;
