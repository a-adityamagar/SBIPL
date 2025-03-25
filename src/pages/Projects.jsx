import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import project from "../assets/project.jpg";
// Lazy load
const Client = lazy(() => import("../components/Client"));

function Projects() {
  const [companiesData, setCompaniesData] = useState({ companies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [logoConfig, setLogoConfig] = useState(null);

  // Fetch data with better error handling and caching
  useEffect(() => {
    // Check  cached data
    const cachedData = sessionStorage.getItem("projectsData");

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        setCompaniesData(parsedData);
        if (parsedData.companies.length > 0) {
          setSelectedCompany(parsedData.companies[0]);
        }
        setLoading(false);
        // update cache
        fetchData(true);
      } catch (e) {
        console.error("Error parsing cached data:", e);
        fetchData();
      }
    } else {
      fetchData();
    }
  }, []);

  // Separate fetch function 
  const fetchData = (isBackgroundFetch = false) => {
    if (!isBackgroundFetch) {
      setLoading(true);
    }

    fetch("/Project.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Cache the data
        sessionStorage.setItem("projectsData", JSON.stringify(data));

        setCompaniesData(data);
        if (!selectedCompany && data.companies.length > 0) {
          setSelectedCompany(data.companies[0]);
        }
        if (!isBackgroundFetch) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching companies data:", error);
        if (!isBackgroundFetch) {
          setError(error.message);
          setLoading(false);
        }
      });
  };

  
  const getLogoDisplayConfig = () => {
 
    const screenWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;

    if (screenWidth < 640) {
      // Mobile
      return {
        outerOvalMax: 6,
        innerOvalMax: 4,
        outerRadiusX: 46,
        outerRadiusY: 33,
        innerRadiusX: 26,
        innerRadiusY: 19,
        outerSize: 70,
        innerSize: 50,
      };
    } else if (screenWidth < 1024) {
      // Tablet
      return {
        outerOvalMax: 8,
        innerOvalMax: 6,
        outerRadiusX: 46,
        outerRadiusY: 33,
        innerRadiusX: 26,
        innerRadiusY: 19,
        outerSize: 90,
        innerSize: 70,
      };
    } else {
      // Desktop
      return {
        outerOvalMax: 12,
        innerOvalMax: 8,
        outerRadiusX: 46,
        outerRadiusY: 33,
        innerRadiusX: 26,
        innerRadiusY: 19,
        outerSize: 120,
        innerSize: 100,
      };
    }
  };

  
  useEffect(() => {
    
    setLogoConfig(getLogoDisplayConfig());

    // Debounced for better performance
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setLogoConfig(getLogoDisplayConfig());
      }, 150); 
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Memoize the logo 
  const renderLogos = () => {
    if (!logoConfig || !companiesData.companies.length) return null;

    return companiesData.companies
      .filter((company) => company.logo)
      .map((company, index, array) => {
        const totalLogos = array.length;

        const maxOuterOvalLogos = Math.min(
          logoConfig.outerOvalMax,
          Math.ceil(totalLogos * 0.6)
        );
        const maxInnerOvalLogos = Math.min(
          logoConfig.innerOvalMax,
          totalLogos - maxOuterOvalLogos
        );

        const totalDisplayedLogos = maxOuterOvalLogos + maxInnerOvalLogos;
        const skipFactor =
          totalLogos > totalDisplayedLogos
            ? Math.floor(totalLogos / totalDisplayedLogos)
            : 1;

        if (index % skipFactor !== 0 && totalLogos > totalDisplayedLogos) {
          return null;
        }

        const displayedIndex = Math.floor(index / skipFactor);

        let position;

        if (displayedIndex < maxOuterOvalLogos) {
          const angle =
            displayedIndex * (360 / maxOuterOvalLogos) * (Math.PI / 180);

          position = {
            left: 50 + logoConfig.outerRadiusX * Math.cos(angle),
            top: 50 + logoConfig.outerRadiusY * Math.sin(angle),
            size: logoConfig.outerSize,
            zIndex: 3,
          };
        } else if (displayedIndex < maxOuterOvalLogos + maxInnerOvalLogos) {
          const innerIndex = displayedIndex - maxOuterOvalLogos;

          const angle =
            innerIndex * (360 / maxInnerOvalLogos) * (Math.PI / 180);

          position = {
            left: 50 + logoConfig.innerRadiusX * Math.cos(angle),
            top: 50 + logoConfig.innerRadiusY * Math.sin(angle),
            size: logoConfig.innerSize,
            zIndex: 4,
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
              loading="lazy" 
            />
          </div>
        );
      })
      .filter(Boolean);
  };

 
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

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
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-5 text-red-600">
            Error loading clients: {error}
            <button
              onClick={() => fetchData()}
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
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
                    BUILDING TRUST
                  </h2>
                </div>

                {/*  Logo Rendering */}
                {renderLogos()}
              </div>
            </div>

            {/* Company Details */}
            <div className="container mx-auto px-2 sm:px-4 py-8 md:py-16 relative">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
               
                <div className="w-full md:w-1/3 md:sticky md:top-24 self-start p-2 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
                    Our Clients
                  </h2>

                  {/*  Horizontal scrolling */}
                  <div className="md:hidden overflow-x-auto whitespace-nowrap pb-4 custom-scrollbar-x">
                    <style jsx="true">{`
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
                            ${
                              selectedCompany &&
                              selectedCompany.name === company.name
                                ? "bg-white text-black border-[#e20000]"
                                : "bg-[#e20000] text-white border-[#e20000]"
                            }
                          `}
                          onClick={() => setSelectedCompany(company)}
                        >
                          <h3 className="font-semibold text-sm text-center">
                            {company.name}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/*  Vertical scrolling */}
                  <div
                    className="hidden md:block overflow-y-auto pr-2 custom-scrollbar"
                    style={{
                      height: "420px",
                    }}
                  >
                    <style jsx="true">{`
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
                          ${
                            selectedCompany &&
                            selectedCompany.name === company.name
                              ? "bg-white text-black border-[#e20000]"
                              : "bg-[#e20000] text-white border-[#e20000]"
                          }
                        `}
                        onClick={() => setSelectedCompany(company)}
                      >
                        <h3 className="font-semibold text-lg">
                          {company.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Details  */}
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
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Company Description */}
                      <div className="mb-6 md:mb-8">
                        {selectedCompany.description ? (
                          <p
                            className="text-gray-700 text-base md:text-lg leading-relaxed tracking-wide"
                            style={{
                              lineHeight: "1.6",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {selectedCompany.description}
                          </p>
                        ) : (
                          <p
                            className="text-gray-500 italic text-base md:text-lg leading-relaxed tracking-wide"
                            style={{
                              lineHeight: "1.6",
                              letterSpacing: "0.02em",
                            }}
                          >
                            A valued partner of SBIPL.
                          </p>
                        )}
                      </div>

                      <div className="mt-4 md:mt-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800 inline-block relative">
                          Projects with {selectedCompany.name}
                          <span
                            className="absolute bottom-0 left-0 h-0.5 bg-[#e20000]"
                            style={{
                              width: `${
                                7 + selectedCompany.name.length * 0.8
                              }rem`,
                              bottom: "-0.5rem",
                            }}
                          ></span>
                        </h3>

                        {selectedCompany.projects &&
                        selectedCompany.projects.length > 0 ? (
                          <ul className="list-disc pl-5 md:pl-6 space-y-2 md:space-y-3 text-gray-700 mt-4 md:mt-6">
                            {selectedCompany.projects.map((project, index) => (
                              <li
                                key={index}
                                className="text-base md:text-lg tracking-wide"
                                style={{ lineHeight: "1.5" }}
                              >
                                {typeof project === "object"
                                  ? project.name
                                  : project}
                                {typeof project === "object" &&
                                  project.description && (
                                    <p
                                      className="text-gray-600 mt-1 text-sm md:text-base tracking-wide"
                                      style={{
                                        lineHeight: "1.6",
                                        letterSpacing: "0.02em",
                                      }}
                                    >
                                      {project.description}
                                    </p>
                                  )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p
                            className="text-gray-500 italic mt-4 md:mt-6 text-base md:text-lg tracking-wide"
                            style={{
                              lineHeight: "1.6",
                              letterSpacing: "0.02em",
                            }}
                          >
                            No specific project details available for this
                            client.
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

      <Suspense
        fallback={
          <div className="bg-black text-white p-8 text-center">
            Loading footer...
          </div>
        }
      >
        <Client />
      </Suspense>
    </div>
  );
}

export default Projects;
