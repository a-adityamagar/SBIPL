import React from "react";
import { Link } from "react-router-dom";
import worker from "../assets/worker.jpg";
import roller from "../assets/roller.jpg";
import house from "../assets/house.svg";
import sustainable from "../assets/sustainable.svg";
import team from "../assets/team.svg";
import tick from "../assets/tick.svg";

const Vision = () => {
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
          <Link to="/about">
            <button className="bg-red-600 text-white font-semibold px-6 py-3 hover:bg-red-700 transition duration-300">
              LEARN MORE
            </button>
          </Link>
        </div>
      </div>



   

      {/* Vision Content */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Text  */}
        <div className="p-4 md:p-6 md:w-1/2 text-left flex justify-center items-center">
          <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide pl-2 sm:pl-4 md:pl-8 max-w-lg">
            SBIPL Project Limited is a leading mining and construction company
            offering a wide range of services including mining planning,
            equipment rental, and project management. Our dedicated team is
            committed to delivering excellence in every project and ensuring
            customer satisfaction.
          </p>
        </div>

        {/* Image */}
        <div className="md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[300px] overflow-hidden">
          <img
            src={worker}
            alt="Construction Workers"
            className="w-full h-full object-cover object-center"
          />
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
       
        {/* Features Section  */}
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
