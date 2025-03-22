import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Client from "../components/Client";

// Updated ItemCard component with dynamic specifications
const ItemCard = ({ item }) => {
  const [mainImage, setMainImage] = useState(item.image);
  const [thumbnails, setThumbnails] = useState([...(item.additionalImages || [])]);

  // Function to swap images when clicking on a thumbnail
  const swapImages = (thumbnailImg, index) => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = mainImage;
    setThumbnails(newThumbnails);
    setMainImage(thumbnailImg);
  };

  // Filter out specifications that don't have values
  const availableSpecs = Object.entries(item.specifications || {}).filter(
    ([_, value]) => value !== undefined && value !== null && value !== ""
  );

  return (
    <div className="bg-[#f7f7f7] shadow-md h-full">
      {/* Header section */}
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          {/* Title with red underline */}
          <h3 className="text-xl font-bold text-black border-b-2 border-red-600 pb-1 inline-block">
            {item.name}
          </h3>
          {/* Quantity circle */}
          <div className="bg-red-600 rounded-full text-white h-14 w-14 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold">{item.quantity}</span>
            <span className="text-xs">QTY</span>
          </div>
        </div>
        {/* Know more button */}
        <button className="mt-2 bg-red-600 text-white px-4 py-1 text-sm font-medium">
          Know more
        </button>
      </div>

      {/* Main Image section with transparent background */}
      <div
        className="relative flex justify-center items-center"
        style={{ height: "250px" }}
      >
        <img
          src={mainImage}
          alt={item.name}
          className="h-full object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* Updated Specifications and Images section with gray background */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between">
          {/* Dynamic Specifications in a row */}
          <div className="flex items-center space-x-4 flex-1">
            {availableSpecs.map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-lg font-bold text-black">{value}</p>
                <p className="text-sm text-gray-400">{key}</p>
              </div>
            ))}
          </div>

          {/* Images in the same line */}
          <div className="flex items-center space-x-2">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${item.name} thumbnail ${index + 1}`}
                className="h-8 cursor-pointer hover:opacity-80 transition-opacity"
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

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/fleetAndEquipment.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        // Set the appropriate data based on page type
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

  // Get current page content
  const currentContent = pageContent[pageType] || {};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  // Create pairs of items for the alternating layout
  const renderAlternatingLayout = () => {
    // Group items into pairs (each row has 2 cards)
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      pairs.push(data.slice(i, i + 2));
    }

    return pairs.map((pair, pairIndex) => {
      // Determine if this is an even or odd row for layout pattern
      const isEvenRow = pairIndex % 2 === 0;

      return (
        <div key={pairIndex} className="flex flex-col md:flex-row gap-8 mb-8">
          {/* First card in pair */}
          {pair[0] && (
            <div className={`md:w-${isEvenRow ? '3/5' : '2/5'}`}>
              <ItemCard item={pair[0]} />
            </div>
          )}
          
          {/* Second card in pair (if available) */}
          {pair[1] && (
            <div className={`md:w-${isEvenRow ? '2/5' : '3/5'}`}>
              <ItemCard item={pair[1]} />
            </div>
          )}
          
          {/* If there's only one item in this pair, add empty placeholder to maintain layout */}
          {pair.length === 1 && (
            <div className={`md:w-${isEvenRow ? '2/5' : '3/5'}`}>
              {/* Empty placeholder */}
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

      {/* Hero Section with Background Image */}
      <div
        className="w-full h-[80vh] sm:h-[90vh] md:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${currentContent.backgroundImage})`,
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg mb-4 sm:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            {currentContent.title} <br />
            {currentContent.tagline}
          </h1>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 sm:bottom-20 animate-bounce text-white text-2xl sm:text-4xl">
          ⌄
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto flex flex-col md:flex-row">
          {/* Left side - Large equipment image */}
          <div className="w-full md:w-1/2 p-4 md:p-6">
            <div className="h-64 sm:h-80 md:h-96 lg:h-[28rem]">
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

          {/* Right side - Text content */}
          <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {currentContent.sectionTitle}
              </h2>
              <p className="mb-6 sm:mb-8 text-gray-700 tracking-wider leading-loose text-base sm:text-lg">
                {currentContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Section - Modified for adjusted card sizes */}
      <div className="w-full py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mixed size card layout with adjusted proportions */}
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