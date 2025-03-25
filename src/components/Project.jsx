import React from "react";
import roller from "../assets/roller.jpg";
import stone from "../assets/stone.jpg";
import pit from "../assets/pit.jpg";
import load from "../assets/load.jpg";

const projects = [
  {
    id: 1,
    image: load,
    description: "Delhi Amritsar Katra Expressway from jind karnal road to ambala kaithal hissar road",
    company: "SBIPL Projects"
  },
  {
    id: 2,
    image: roller,
    description: "OPRATION & MAINTINANCE OF CRUSHING PLANT, RAJASTHAN",
    company: "SBIPL Projects"
  },
  {
    id: 3,
    image: pit,
    description: "EDFC Cp 303 Project, Saidpur, Modinagar, Ghaziabad, Uttar Pradesh",
    company: "SBIPL Projects"
  },
  {
    id: 4,
    image: stone,
    description: "Delhi Amritsar katra expressway from Ambala kaithal Hissar road to patiala samana patran road",
    company: "SBIPL Projects"
  },
  {
    id: 5,
    image: load,
    description: "India International Convention And Expo Centre, Dwarka Sec-25, New Delhi",
    company: "SBIPL Projects"
  },
];

const Project = () => {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-16 relative mb-10 sm:mb-12 md:mb-16">
      <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 tracking-wide text-gray-900">
        OUR PROJECTS
      </h2>
     
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mx-auto max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-7xl mb-10 sm:mb-12 md:mb-16">
        {/* First Row */}
        <div className="col-span-1 border-2 border-red-600 relative h-16 sm:h-24 md:h-36 lg:h-44">
          <ProjectImage project={projects[0]} />  
        </div>
        <div className="col-span-1 border-2 border-red-600 relative h-24 sm:h-36 md:h-56 lg:h-72">
          <ProjectImage project={projects[4]} />
        </div>
        <div className="col-span-2 row-span-2 border-2 border-red-600 relative h-[calc(16rem/4+24rem/4+0.5rem)] sm:h-[calc(24rem/4+36rem/4+0.75rem)] md:h-[calc(36rem/4+56rem/4+1rem)] lg:h-[calc(44rem/4+72rem/4+1rem)]">
        <ProjectImage project={projects[1]} />
        </div>

        {/* Second Row */}
        <div className="col-span-1 border-2 border-red-600 relative h-24 sm:h-36 md:h-56 lg:h-72 -mt-8 sm:-mt-12 md:-mt-20 lg:-mt-28">
          <ProjectImage project={projects[2]} />
        </div>
        <div className="col-span-1 border-2 border-red-600 relative h-16 sm:h-24 md:h-36 lg:h-44 mt-0">
          <ProjectImage project={projects[3]} />
        </div>
      </div>

      {/* View All Button  */}
      <div className="absolute left-1/2 transform -translate-x-1/2"
           style={{
             bottom: 'calc(6rem + 5vw)',
           }}>
        <a 
          href="/projects"
          className="inline-block bg-red-600 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold uppercase hover:bg-red-700 transition duration-300">
          View All
        </a>
      </div>
    </section>
  );
};

const ProjectImage = ({ project }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={project.image}
        alt={project.description}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
     
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/70 to-red-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2 sm:p-3">
        {/* Description*/}
        <div>
          <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium drop-shadow-md line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
            {project.description}
          </p>
        </div>
       
        {/* Company name */}
        <div>
          <p className="text-white text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider drop-shadow-md">
            {project.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Project;
