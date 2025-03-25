import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Client from "../components/Client";

// Updated ItemCard component with "Know more" button navigation
const ItemCard = ({ item, pageType }) => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(item.image);
  const [thumbnails, setThumbnails] = useState([...(item.additionalImages || [])]);

  const swapImages = (thumbnailImg, index) => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = mainImage;
    setThumbnails(newThumbnails);
    setMainImage(thumbnailImg);
  };

  // Function to navigate to item detail page
  const handleKnowMoreClick = () => {
    navigate(`/${pageType}/${item.id}`, { state: { itemData: item } });
  };

  
  const availableSpecs = Object.entries(item.specifications || {}).filter(
    ([_, value]) => value !== undefined && value !== null && value !== ""
  );

  return (
    <div className="bg-[#f7f7f7] shadow-md h-full">
      {/* Header section */}
      <div className="p-3 pb-1 sm:p-4 sm:pb-2">
        <div className="flex justify-between items-start">
        
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-black border-b-2 border-red-600 pb-1 inline-block">
            {item.name}
          </h3>
         
          <div className="bg-red-600 rounded-full text-white h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex flex-col items-center justify-center text-center">
            <span className="text-sm sm:text-base md:text-xl font-bold">{item.quantity}</span>
            <span className="text-[8px] sm:text-xs">QTY</span>
          </div>
        </div>
        {/* Know more button  */}
        <button 
          className="mt-1 sm:mt-2 bg-red-600 text-white px-2 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-medium cursor-pointer hover:bg-red-700 transition-colors"
          onClick={handleKnowMoreClick}
        >
          Know more
        </button>
      </div>

      {/* Main Image section */}
      <div
        className="relative flex justify-center items-center"
        style={{ height: "180px", minHeight: "150px" }}
      >
        <img
          src={mainImage}
          alt={item.name}
          className="h-full object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* Specifications and Images section */}
      <div className="p-2 sm:p-3 md:p-4 ">
  
        <div className="flex items-center justify-between overflow-x-auto pb-1">
          
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
            {availableSpecs.map(([key, value]) => (
              <div key={key} className="text-center flex-shrink-0">
                <p className="text-sm sm:text-base md:text-lg font-bold text-black whitespace-nowrap">{value}</p>
                <p className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">{key}</p>
              </div>
            ))}
          </div>

          {/* Images */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${item.name} thumbnail ${index + 1}`}
                className="h-6 sm:h-7 md:h-8 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => swapImages(img, index)}
                style={{ mixBlendMode: "multiply" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Fleetandequipment = () => {
  const location = useLocation();
  const [pageType, setPageType] = useState("");
  const [data, setData] = useState([]);
  const [pageContent, setPageContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine which content to show based on the current URL
  useEffect(() => {
    if (location.pathname === "/fleets") {
      setPageType("fleets");
    } else if (location.pathname === "/equipments") {
      setPageType("equipments");
    }
  }, [location.pathname]);

  // data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/fleetAndEquipment.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();


        if (pageType === "fleets") {
          setData(jsonData.fleets);
        } else if (pageType === "equipments") {
          setData(jsonData.equipments);
        }

        // Set page content
        setPageContent(jsonData.pageContent);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (pageType) {
      fetchData();
    }
  }, [pageType]);


  const currentContent = pageContent[pageType] || {};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 px-4 text-center">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  // Create pairs for the alternating layout
  const renderAlternatingLayout = () => {
 
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      pairs.push(data.slice(i, i + 2));
    }

    return pairs.map((pair, pairIndex) => {
      // Determine even or odd row for layout pattern
      const isEvenRow = pairIndex % 2 === 0;

      return (
        <div key={pairIndex} className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
   
          {pair[0] && (
            <div className={`w-full mb-4 md:mb-0 md:w-${isEvenRow ? '3/5' : '2/5'}`}>
              <ItemCard item={pair[0]} pageType={pageType} />
            </div>
          )}
         
      
          {pair[1] && (
            <div className={`w-full md:w-${isEvenRow ? '2/5' : '3/5'}`}>
              <ItemCard item={pair[1]} pageType={pageType} />
            </div>
          )}
         
          {/*  empty placeholder to maintain layout */}
          {pair.length === 1 && (
            <div className={`hidden md:block md:w-${isEvenRow ? '2/5' : '3/5'}`}>
            
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${currentContent.backgroundImage})`,
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            {currentContent.title} <br />
            {currentContent.tagline}
          </h1>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-20 animate-bounce text-white text-xl sm:text-2xl md:text-4xl">
          ⌄
        </div>
      </div>

      {/* Main Content  */}
      <div className="w-full bg-gray-100 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto flex flex-col md:flex-row">
        
          <div className="w-full md:w-1/2 p-3 sm:p-4 md:p-6">
            <div className="h-48 sm:h-64 md:h-80 lg:h-96">
              <img
                src={currentContent.backgroundImage}
                alt={
                  pageType === "fleets"
                    ? "Fleet overview"
                    : "Equipment overview"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          
          <div className="w-full md:w-1/2 p-3 sm:p-4 md:p-6 flex flex-col justify-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                {currentContent.sectionTitle}
              </h2>
              <p className="mb-4 sm:mb-6 md:mb-8 text-gray-700 tracking-wide md:tracking-wider leading-relaxed md:leading-loose text-sm sm:text-base md:text-lg">
                {currentContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="w-full py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
         
          <div className="max-w-6xl mx-auto">
            {data.length === 0 ? (
              <div className="text-center py-8">No items available</div>
            ) : (
              renderAlternatingLayout()
            )}
          </div>
        </div>
      </div>
      
      <Client />
    </div>
  );
};

export default Fleetandequipment;