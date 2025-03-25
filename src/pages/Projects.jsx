import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import project from "../assets/project.jpg";
import Client from "../components/Client";

function Projects() {
  const [companiesData, setCompaniesData] = useState({ companies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetch("/Project.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCompaniesData(data);
        // Set first company as default selected
        if (data.companies.length > 0) {
          setSelectedCompany(data.companies[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Function to determine how many logos to show based on screen size
  const getLogoDisplayConfig = () => {
    // Use window.innerWidth to determine screen size
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    
    if (screenWidth < 640) { // Mobile
      return {
        outerOvalMax: 6,
        innerOvalMax: 4,
        outerRadiusX: 46,
        outerRadiusY: 33,
        innerRadiusX: 26,
        innerRadiusY: 19,
        outerSize: 70,
        innerSize: 50
      };
    } else if (screenWidth < 1024) { // Tablet
      return {
        outerOvalMax: 8,
        innerOvalMax: 6,
        outerRadiusX: 46,
        outerRadiusY: 33,
        innerRadiusX: 26,
        innerRadiusY: 19,
        outerSize: 90,
        innerSize: 70
      };
    } else { // Desktop
      return {
        outerOvalMax: 12,
        innerOvalMax: 8,
        outerRadiusX: 46,
        outerRadiusY: 33,
        innerRadiusX: 26,
        innerRadiusY: 19,
        outerSize: 120,
        innerSize: 100
      };
    }
  };

  const [logoConfig, setLogoConfig] = useState(getLogoDisplayConfig());

  // Update logo configuration when window resizes
  useEffect(() => {
    const handleResize = () => {
      setLogoConfig(getLogoDisplayConfig());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <div
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${project})`,
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg mb-2 sm:mb-3 md:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            Our Projects <br />
            Building Excellence, Delivering Results
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 bg-white">
        {loading ? (
          <div className="text-center py-5">Loading clients...</div>
        ) : error ? (
          <div className="text-center py-5 text-red-600">
            Error loading clients
          </div>
        ) : (
          <div>
            {/* Responsive Logo Section */}
            <div className="relative">
              <div
                className="oval-logo-container relative mx-auto"
                style={{
                  height: "300px",
                  maxHeight: "50vh",
                  width: "100%",
                  maxWidth: "1100px",
                  overflow: "hidden",
                }}
              >
                {/* Center text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-40 sm:w-56 md:w-72">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#e20000]">
                    SBIPL
                  </div>

                  <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-8 md:mb-12">
                    WORK WE ARE PROUD OF
                  </h2>
                </div>

                {/* Responsive Logo Positioning */}
                {companiesData.companies
                  .filter((company) => company.logo)
                  .map((company, index, array) => {
                    const totalLogos = array.length;
                    
                    const maxOuterOvalLogos = Math.min(logoConfig.outerOvalMax, Math.ceil(totalLogos * 0.6));
                    const maxInnerOvalLogos = Math.min(logoConfig.innerOvalMax, totalLogos - maxOuterOvalLogos);
                    
                    const totalDisplayedLogos = maxOuterOvalLogos + maxInnerOvalLogos;
                    const skipFactor = totalLogos > totalDisplayedLogos ?
                                      Math.floor(totalLogos / totalDisplayedLogos) : 1;
                    
                    if (index % skipFactor !== 0 && totalLogos > totalDisplayedLogos) {
                      return null;
                    }
                    
                    const displayedIndex = Math.floor(index / skipFactor);
                    
                    let position;
                    
                    if (displayedIndex < maxOuterOvalLogos) {
                      const angle = (displayedIndex * (360 / maxOuterOvalLogos)) * (Math.PI / 180);
                      
                      position = {
                        left: 50 + logoConfig.outerRadiusX * Math.cos(angle),
                        top: 50 + logoConfig.outerRadiusY * Math.sin(angle),
                        size: logoConfig.outerSize,
                        zIndex: 3
                      };
                    } else if (displayedIndex < maxOuterOvalLogos + maxInnerOvalLogos) {
                      const innerIndex = displayedIndex - maxOuterOvalLogos;
                      
                      const angle = (innerIndex * (360 / maxInnerOvalLogos)) * (Math.PI / 180);
                      
                      position = {
                        left: 50 + logoConfig.innerRadiusX * Math.cos(angle),
                        top: 50 + logoConfig.innerRadiusY * Math.sin(angle),
                        size: logoConfig.innerSize,
                        zIndex: 4
                      };
                    } else {
                      return null;
                    }
                    
                    return (
                      <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                        style={{
                          left: `${position.left}%`,
                          top: `${position.top}%`,
                          width: `${position.size}px`,
                          height: `${position.size}px`,
                          zIndex: position.zIndex,
                        }}
                      >
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    );
                  }).filter(Boolean)}
              </div>
            </div>

            {/* Responsive Company Details Section */}
            <div className="container mx-auto px-2 sm:px-4 py-8 md:py-16 relative">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Horizontal scrollable company list for mobile */}
                <div className="w-full md:w-1/3 md:sticky md:top-24 self-start p-2 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Our Clients</h2>
                  
                  {/* Mobile: Horizontal scrolling list */}
                  <div className="md:hidden overflow-x-auto whitespace-nowrap pb-4 custom-scrollbar-x">
                    <style jsx>{`
                      .custom-scrollbar-x::-webkit-scrollbar {
                        height: 3px;
                        background-color: transparent;
                      }
                      .custom-scrollbar-x::-webkit-scrollbar-thumb {
                        background-color: #e20000;
                      }
                      .custom-scrollbar-x {
                        scrollbar-width: thin;
                        scrollbar-color: #e20000 transparent;
                      }
                      .custom-scrollbar-x::-webkit-scrollbar-thumb:horizontal {
                        visibility: hidden;
                      }
                      .custom-scrollbar-x:hover::-webkit-scrollbar-thumb:horizontal {
                        visibility: visible;
                      }
                    `}</style>
                    
                    <div className="flex space-x-3">
                      {companiesData.companies.map((company, index) => (
                        <div
                          key={index}
                          className={`
                            p-3 cursor-pointer transition-all duration-300 border-2 whitespace-normal
                            min-w-[150px] max-w-[200px] flex items-center justify-center
                            ${selectedCompany && selectedCompany.name === company.name
                              ? 'bg-white text-black border-[#e20000]'
                              : 'bg-[#e20000] text-white border-[#e20000]'}
                          `}
                          onClick={() => setSelectedCompany(company)}
                        >
                          <h3 className="font-semibold text-sm text-center">{company.name}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Desktop: Vertical scrolling list */}
                  <div
                    className="hidden md:block overflow-y-auto pr-2 custom-scrollbar"
                    style={{
                      height: "420px",
                    }}
                  >
                    <style jsx>{`
                      .custom-scrollbar::-webkit-scrollbar {
                        width: 3px;
                        background-color: transparent;
                      }
                      .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: #e20000;
                      }
                      .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #e20000 transparent;
                      }
                      .custom-scrollbar::-webkit-scrollbar-thumb:vertical {
                        visibility: hidden;
                      }
                      .custom-scrollbar:hover::-webkit-scrollbar-thumb:vertical {
                        visibility: visible;
                      }
                    `}</style>
                    {companiesData.companies.map((company, index) => (
                      <div
                        key={index}
                        className={`
                          p-4 mb-3 cursor-pointer transition-all duration-300 border-2
                          ${selectedCompany && selectedCompany.name === company.name
                            ? 'bg-white text-black border-[#e20000]'
                            : 'bg-[#e20000] text-white border-[#e20000]'}
                        `}
                        onClick={() => setSelectedCompany(company)}
                      >
                        <h3 className="font-semibold text-lg">{company.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Section - Company Details with responsive adjustments */}
                <div className="w-full md:w-2/3 bg-white p-4 md:p-8 md:pl-16">
                  {selectedCompany ? (
                    <div className="flex flex-col text-left md:ml-4">
                      {/* Company Logo */}
                      {selectedCompany.logo && (
                        <div className="mb-4 md:mb-6">
                          <img
                            src={selectedCompany.logo}
                            alt={`${selectedCompany.name} logo`}
                            className="max-w-full h-auto object-contain"
                            style={{ maxHeight: "100px", maxWidth: "200px" }}
                          />
                        </div>
                      )}
                      
                      {/* Company Description - Responsive text sizes */}
                      <div className="mb-6 md:mb-8">
                        {selectedCompany.description ? (
                          <p className="text-gray-700 text-base md:text-lg leading-relaxed tracking-wide" style={{
                            lineHeight: "1.6",
                            letterSpacing: "0.02em"
                          }}>
                            {selectedCompany.description}
                          </p>
                        ) : (
                          <p className="text-gray-500 italic text-base md:text-lg leading-relaxed tracking-wide" style={{
                            lineHeight: "1.6",
                            letterSpacing: "0.02em"
                          }}>
                            A valued partner of SBIPL.
                          </p>
                        )}
                      </div>
                      
                      {/* Projects as Unordered List with responsive text */}
                      <div className="mt-4 md:mt-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800 inline-block relative">
                          Projects with {selectedCompany.name}
                          <span
                            className="absolute bottom-0 left-0 h-0.5 bg-[#e20000]"
                            style={{
                              width: `${7 + selectedCompany.name.length * 0.8}rem`,
                              bottom: "-0.5rem"
                            }}
                          ></span>
                        </h3>
                        
                        {selectedCompany.projects && selectedCompany.projects.length > 0 ? (
                          <ul className="list-disc pl-5 md:pl-6 space-y-2 md:space-y-3 text-gray-700 mt-4 md:mt-6">
                            {selectedCompany.projects.map((project, index) => (
                              <li key={index} className="text-base md:text-lg tracking-wide" style={{ lineHeight: "1.5" }}>
                                {typeof project === 'object' ? project.name : project}
                                {typeof project === 'object' && project.description && (
                                  <p className="text-gray-600 mt-1 text-sm md:text-base tracking-wide" style={{
                                    lineHeight: "1.6",
                                    letterSpacing: "0.02em"
                                  }}>
                                    {project.description}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic mt-4 md:mt-6 text-base md:text-lg tracking-wide" style={{
                            lineHeight: "1.6",
                            letterSpacing: "0.02em"
                          }}>
                            No specific project details available for this client.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8 md:py-12 text-base md:text-lg">
                      Select a company to view project details
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Client/>
    </div>
  );
}

export default Projects;
