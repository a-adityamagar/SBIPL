import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Client from "../components/Client";
import stone from "../assets/stone.jpg";

const Fleetandequipmentdetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [error, setError] = useState(null);
  const [otherItems, setOtherItems] = useState([]);
  const [allData, setAllData] = useState(null);

  // Determine page type once using useMemo
  const pageType = useMemo(() => {
    const path = location.pathname;
    if (path.includes("fleets")) return "fleets";
    if (path.includes("equipments")) return "equipments";
    return "";
  }, [location.pathname]);

  // Fetch all data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/fleetAndEquipment.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setAllData(jsonData);

        // Find the current item
        const itemId = parseInt(id) || id;
        const foundItem = jsonData[pageType]?.find(item => item.id === itemId);

        if (foundItem) {
          setItem(foundItem);
          setActiveImage(foundItem.image);
          
          // Get other items from the same category (excluding current item)
          // Using name instead of id for comparison to ensure uniqueness
          const others = jsonData[pageType]
            .filter(otherItem => otherItem.name !== foundItem.name)
            .slice(0, 3); // Limit to 3 items
          
          setOtherItems(others);
        } else {
          setError("Item not found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load item data");
      } finally {
        setLoading(false);
      }
    };

    // If item data was passed via state, use it directly
    if (location.state?.itemData) {
      setItem(location.state.itemData);
      setActiveImage(location.state.itemData.image);
      
      // Still fetch all data to get other items
      fetchData();
    } else {
      // Otherwise fetch everything
      fetchData();
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, pageType, location.state]);

  const handleBack = useCallback(() => {
    navigate(`/${pageType}`);
  }, [navigate, pageType]);

  const handleImageClick = useCallback((img) => {
    setActiveImage(img);
  }, []);

  const handleShowMore = useCallback(() => {
    navigate(`/${pageType}`);
  }, [navigate, pageType]);

  const handleItemClick = useCallback((item) => {
    navigate(`/${pageType}/${item.id}`, { state: { itemData: item } });
  }, [navigate, pageType]);

  // Memoize allImages to prevent recalculation on each render
  const allImages = useMemo(() => {
    if (!item) return [];
    return [item.image, ...(item.additionalImages || [])];
  }, [item]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Error state
  if (error || !item) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">
            {error || "Item Not Found"}
          </h1>
          <p className="mb-4 text-sm sm:text-base">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleBack}
            className="bg-red-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            Back to {pageType === "fleets" ? "Fleets" : "Equipments"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section with Background Image */}
      <div
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${stone})`,
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold drop-shadow-lg mb-2 sm:mb-4 md:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            {pageType === "fleets"
              ? "OUR FLEET DETAILS"
              : "OUR EQUIPMENT DETAILS"}
          </h1>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-16 animate-bounce text-white text-xl sm:text-2xl md:text-3xl">
          ⌄
        </div>
      </div>

      {/* Item Detail Content */}
      <section className="container mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center mb-4 sm:mb-6 text-red-600 hover:text-red-800 transition-colors text-sm sm:text-base"
          aria-label={`Back to ${
            pageType === "fleets" ? "Fleets" : "Equipments"
          }`}
        >
          <span className="mr-1 sm:mr-2">←</span> Back to{" "}
          {pageType === "fleets" ? "Fleets" : "Equipments"}
        </button>

        {/* Item Detail Layout */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="md:w-1/2 p-4 sm:p-6 flex items-center justify-center bg-white">
              <img
                src={activeImage}
                alt={`${item.name}`}
                className="max-h-64 sm:max-h-80 md:max-h-96 max-w-full object-contain"
                style={{ mixBlendMode: "multiply" }}
                loading="eager"
              />
            </div>

            {/* Right side - Title and information */}
            <div className="md:w-1/2 flex flex-col">
              {/* Title in red box */}
              <div className="bg-red-600 p-3 sm:p-4 text-white w-fit">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{item.name}</h2>
              </div>

              {/* Description */}
              <div className="p-4 sm:p-6 bg-white flex-grow">
                <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                  The {item.name} is a robust, high-performance{" "}
                  {item.specifications?.type || "vehicle"}
                  {item.specifications?.capacity
                    ? ` with ${item.specifications.capacity} capacity`
                    : ""}
                  designed for the most demanding construction and
                  transportation needs. Built for strength, reliability, and
                  fuel efficiency, it offers unmatched power while ensuring a
                  comfortable driving experience.
                </p>

                {/* Thumbnail images in a row */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
                    {allImages.map((img, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 flex items-center justify-center ${
                          activeImage === img
                            ? "opacity-100"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => handleImageClick(img)}
                      >
                        <img
                          src={img}
                          alt={`${item.name} view ${index + 1}`}
                          className="max-h-full max-w-full object-contain"
                          style={{ mixBlendMode: "multiply" }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Specifications with Image */}
          {item.specIcons && item.specIcons.length > 0 && (
            <div className="p-4 sm:p-6 pl-6 sm:pl-8 md:pl-16">
              <div className="ml-2 sm:ml-4 md:ml-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800 inline-block relative">
                  Specification
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                </h3>
              </div>
              <div className="mt-4 sm:mt-6 flex flex-col md:flex-row ml-2 sm:ml-4 md:ml-6">
                {/* Left side - 2 column specifications */}
                <div className="md:w-1/2">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {item.specIcons.map((spec, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="text-red-600 mb-1 sm:mb-2">
                          <img
                            src={spec.icon}
                            alt={spec.title}
                            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
                          />
                        </div>
                        <h4 className="font-bold text-red-600 text-sm sm:text-base md:text-lg">{spec.title}</h4>
                        <p className="text-gray-800 text-xs sm:text-sm md:text-base">
                          {spec.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Image */}
                <div className="md:w-1/2 mt-4 md:mt-0 flex items-center justify-center">
                  <img
                    src={activeImage}
                    alt={`${item.name}`}
                    className="max-h-64 sm:max-h-80 md:max-h-96 max-w-full object-contain"
                    style={{ mixBlendMode: "multiply" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Key Features and Safety Features */}
          <div className="p-4 sm:p-6 pl-6 sm:pl-8 md:pl-16">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
              {/* Key Features */}
              {item.keyFeatures && item.keyFeatures.length > 0 && (
                <div className="md:w-1/2">
                  <div className="ml-2 sm:ml-4 md:ml-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800 inline-block relative">
                      Key Features
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                    </h3>
                  </div>
                  <ul className="list-disc pl-6 sm:pl-8 md:pl-12 space-y-1 sm:space-y-2 mt-2 sm:mt-4">
                    {item.keyFeatures.map((feature, index) => (
                      <li key={index} className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Safety Features */}
              {item.safetyFeatures && item.safetyFeatures.length > 0 && (
                <div className="md:w-1/2">
                  <div className="ml-2 sm:ml-4 md:ml-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800 inline-block relative">
                      Safety Features
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                    </h3>
                  </div>
                  <ul className="list-disc pl-6 sm:pl-8 md:pl-12 space-y-1 sm:space-y-2 mt-2 sm:mt-4">
                    {item.safetyFeatures.map((feature, index) => (
                                           <li key={index} className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
                                           {feature}
                                         </li>
                                       ))}
                                     </ul>
                                   </div>
                                 )}
                               </div>
                             </div>  
                           </div>
                         </section>
                   
                         {/* Other Fleets/Equipments Section */}
                         <section className="container mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 bg-gray-50">
                           <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
                             <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                               Other {pageType === "fleets" ? "Fleets" : "Equipments"}
                             </h2>
                             <button
                               onClick={handleShowMore}
                               className="bg-red-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm md:text-base hover:bg-red-700 transition-colors"
                             >
                               Show More
                             </button>
                           </div>
                          
                           {/* Cards Grid */}
                           {otherItems.length > 0 ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                               {otherItems.map((otherItem) => (
                                 <div
                                   key={otherItem.name} // Using name as key instead of id
                                   className="bg-[#f7f7f7] shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                                   onClick={() => handleItemClick(otherItem)}
                                 >
                                   <div className="p-2 sm:p-3 md:p-4 pb-1 sm:pb-2">
                                     <div className="flex justify-between items-start">
                                       <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black border-b-2 border-red-600 pb-1 inline-block">
                                         {otherItem.name}
                                       </h3>
                                      
                                       {otherItem.quantity && (
                                         <div className="bg-red-600 rounded-full text-white h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 flex flex-col items-center justify-center text-center">
                                           <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">{otherItem.quantity}</span>
                                           <span className="text-[6px] sm:text-[8px] md:text-xs">QTY</span>
                                         </div>
                                       )}
                                     </div>
                                     <button
                                       className="mt-1 sm:mt-2 bg-red-600 text-white px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-[10px] sm:text-xs md:text-sm font-medium cursor-pointer hover:bg-red-700 transition-colors"
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         handleItemClick(otherItem);
                                       }}
                                     >
                                       Know more
                                     </button>
                                   </div>
                   
                                   {/* Main Image section with transparent background */}
                                   <div
                                     className="relative flex justify-center items-center"
                                     style={{ height: "120px", minHeight: "100px" }}
                                   >
                                     <img
                                       src={otherItem.image}
                                       alt={otherItem.name}
                                       className="h-full object-contain"
                                       style={{ mixBlendMode: "multiply" }}
                                       loading="lazy"
                                     />
                                   </div>
                   
                                   {/* Specifications section */}
                                   <div className="p-2 sm:p-3 md:p-4">
                                     <div className="flex items-center justify-between overflow-x-auto pb-1">
                                       {/* Dynamic Specifications - scrollable on small screens */}
                                       <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1">
                                         {otherItem.specifications && Object.entries(otherItem.specifications)
                                           .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                                           .map(([key, value]) => (
                                             <div key={key} className="text-center flex-shrink-0">
                                               <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-black whitespace-nowrap">{value}</p>
                                               <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 whitespace-nowrap">{key}</p>
                                             </div>
                                           ))}
                                       </div>
                   
                                       {/* Thumbnail Images */}
                                       {otherItem.additionalImages && otherItem.additionalImages.length > 0 && (
                                         <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-1 sm:ml-2">
                                           {otherItem.additionalImages.slice(0, 3).map((img, index) => (
                                             <img
                                               key={index}
                                               src={img}
                                               alt={`${otherItem.name} thumbnail ${index + 1}`}
                                               className="h-4 sm:h-5 md:h-6 lg:h-8 cursor-pointer hover:opacity-80 transition-opacity"
                                               style={{ mixBlendMode: "multiply" }}
                                             />
                                           ))}
                                         </div>
                                       )}
                                     </div>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           ) : (
                             <div className="text-center py-4 sm:py-6 md:py-8">
                               <p className="text-gray-600 text-sm sm:text-base">
                                 No other {pageType === "fleets" ? "fleets" : "equipments"} available at the moment.
                               </p>
                               <button
                                 onClick={handleShowMore}
                                 className="mt-2 sm:mt-4 bg-red-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded text-xs sm:text-sm md:text-base hover:bg-red-700 transition-colors"
                               >
                                 Browse All {pageType === "fleets" ? "Fleets" : "Equipments"}
                               </button>
                             </div>
                           )}
                         </section>
                   
                         <Client />
                       </div>
                     );
                   };
                   
                   export default Fleetandequipmentdetail;
                   
