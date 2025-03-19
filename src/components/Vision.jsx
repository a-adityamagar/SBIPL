import React, { useState, useEffect, useRef } from "react";
import worker from "../assets/worker.jpg";
import roller from "../assets/roller.jpg";
import house from "../assets/house.svg";
import sustainable from "../assets/sustainable.svg";
import team from "../assets/team.svg";
import tick from "../assets/tick.svg";

const Vision = () => {
  // References and state for counting animation
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    locations: 0,
    machines: 0,
    projects: 0,
    clients: 0
  });

  // Final values for the counters
  const finalCounts = {
    locations: 3,
    machines: 50,
    projects: 30,
    clients: 20
  };

  // Set up intersection observer to detect when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isVisible]);

  // Animate the counters when section becomes visible
  useEffect(() => {
    if (!isVisible) return;

    // Duration of the animation in milliseconds
    const duration = 2000;
    // Number of steps in the animation
    const steps = 60;
    // Time between steps
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);

      setCounts({
        locations: Math.floor(progress * finalCounts.locations),
        machines: Math.floor(progress * finalCounts.machines),
        projects: Math.floor(progress * finalCounts.projects),
        clients: Math.floor(progress * finalCounts.clients)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        // Ensure final values are exact
        setCounts(finalCounts);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <>
      {/* Vision Section */}
      <div className="bg-[#fbecec] py-12 px-4 md:px-16 text-center">
        {/* Vision Title */}
        <h2 className="text-3xl md:text-5xl font-bold leading-relaxed tracking-wide text-gray-900">
          GROW YOUR VISION
        </h2>
        <p className="text-gray-700 mt-3 max-w-3xl mx-auto">
          Transforming ideas into remarkable realities with expertise in
          innovation, and a forward-thinking approach.
        </p>

        {/* Learn More Button */}
        <div className="mt-6">
          <button className="bg-red-600 text-white font-semibold px-6 py-3 hover:bg-red-700 transition duration-300">
            LEARN MORE
          </button>
        </div>
      </div>

      {/* Vision Content */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Text Section */}
        <div className="p-4 md:p-6 md:w-1/2 text-left flex justify-center items-center">
          <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide pl-2 sm:pl-4 md:pl-8 max-w-lg">
            SBIPL Project Limited is a leading mining and construction company
            offering a wide range of services including mining planning,
            equipment rental, and project management. Our dedicated team is
            committed to delivering excellence in every project and ensuring
            customer satisfaction.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[300px] overflow-hidden">
          <img
            src={worker}
            alt="Construction Workers"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Statistics Section */}
      <div
        ref={statsRef}
        className="bg-red-600 text-white w-full py-4 md:py-16"
      >
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center px-4">
          <div className="flex flex-col py-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3">{counts.locations}</h3>
            <p className="text-sm sm:text-base md:text-lg">Locations</p>
          </div>
          <div className="flex flex-col py-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3">{counts.machines}+</h3>
            <p className="text-sm sm:text-base md:text-lg">Machines</p>
          </div>
          <div className="flex flex-col py-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3">{counts.projects}+</h3>
            <p className="text-sm sm:text-base md:text-lg">Projects Completed</p>
          </div>
          <div className="flex flex-col py-3">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3">{counts.clients}+</h3>
            <p className="text-sm sm:text-base md:text-lg">Satisfied Clients</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white md:px-16">
        {/* Services Content */}
        <div className="grid md:grid-cols-2 border-2 border-red-600">
          {/* Left Image Section */}
          <div className="w-full aspect-[4/3] md:aspect-auto overflow-hidden">
            <img
              src={roller}
              alt="Mining Equipment"
              className="w-full h-full object-cover"
            />
          </div>
         
          {/* Right Services Content */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left tracking-wider">
              OUR SERVICES
            </h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>✔ Expertise in quarrying, mining, and material processing</li>
              <li>✔ Site preparation, grading, and land development</li>
              <li>✔ End-to-end project management from design to completion</li>
              <li>✔ Roads, bridges, highways, and large-scale infrastructure projects</li>
              <li>✔ End-to-end project management from design to completion</li>
            </ul>
          </div>
        </div>
       
        {/* Features Section - Increased height, larger icons, more word spacing */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-[#d20000] text-center">
          <div className="py-12 border-r border-b md:border-b-0 border-[#d20000] flex flex-col items-center justify-center">
            <img src={house} alt="Vast Experience" className="h-20 w-16 mx-auto" />
            <p className="text-lg mt-4 tracking-wider font-medium">Vast Experience</p>
          </div>
          <div className="py-12 border-b md:border-b-0 md:border-r border-[#d20000] flex flex-col items-center justify-center">
            <img src={sustainable} alt="Sustainable" className="h-20 w-16 mx-auto" />
            <p className="text-lg mt-4 tracking-wider font-medium">Sustainable</p>
          </div>
          <div className="py-12 border-r border-[#d20000] flex flex-col items-center justify-center">
            <img src={team} alt="Professional Team" className="h-20 w-16 mx-auto" />
            <p className="text-lg mt-4 tracking-wider font-medium">Professional</p>
          </div>
          <div className="py-12 flex flex-col items-center justify-center">
            <img src={tick} alt="Finish" className="h-20 w-16 mx-auto" />
            <p className="text-lg mt-4 tracking-wider font-medium">Finish</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vision;
