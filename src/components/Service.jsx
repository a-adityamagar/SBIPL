import React from "react";
import { Link } from "react-router-dom";
import residental from "../assets/residental.svg";
import site from "../assets/site.svg";
import special from "../assets/special.svg";
import pre from "../assets/preconstruction.svg";
import civil from "../assets/civil.svg";
import infra from "../assets/infra.svg";

const service = [
  { id: 1, icon: residental, title: "Residental\nConstruction" },
  { id: 2, icon: site, title: "Site\nManagement" },
  { id: 3, icon: civil, title: "Civil\nEngineering" },
  { id: 4, icon: special, title: "Special\nProjects" },
  { id: 5, icon: pre, title: "Pre-\nConstructions" },
  { id: 6, icon: infra, title: "Infrastructure\nConstruction" },
];

const Service = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20 max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 tracking-wide text-gray-900">
        Our Services
      </h2>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 flex items-center">
            <p className="text-red-600 text-lg md:text-xl font-semibold leading-relaxed">
              We Offer a Range of <br /> Services to Meet Your <br /> Needs
            </p>
          </div>

          {/* First row of service boxes */}
          {service.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="border border-red-600 flex flex-col items-start justify-center p-6 text-left h-48"
            >
              <img src={item.icon} alt={item.title} className="h-10 w-10 mb-4 mx-auto" />
              <p className="mt-2 text-sm font-medium tracking-widest text-center w-full">
                {item.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < item.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
       
          {service.slice(3, 6).map((item) => (
            <div
              key={item.id}
              className="border border-red-600 flex flex-col items-start justify-center p-6 text-left h-48"
            >
              <img src={item.icon} alt={item.title} className="h-10 w-10 mb-4 mx-auto" />
              <p className="mt-2 text-sm font-medium tracking-widest text-center w-full">
                {item.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < item.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}

          {/* Button  */}
          <div className="flex items-center justify-center">
            <Link to="/services" className="inline-block">
              <button className="bg-red-600 text-white px-8 py-3 text-base font-semibold uppercase hover:bg-red-700 transition duration-300">
                KNOW MORE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
