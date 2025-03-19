import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const Client = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.6139, // Default to Delhi area
    lng: 77.2090,
    label: 'Default'
  });
  
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const locations = {
    mines: { lat: 28.4089, lng: 76.9606, label: "MINES ADDRESS: PLOT NO.-2, VILLAGE- KAALYANA, DISTT CHARKHI DADRI, HARYANA" },
    registered: { lat: 28.5823, lng: 77.0500, label: "REGISTERED ADDRESS: FLAT NO A-01, GOLF VIEW APARTMENT, PLOT NO. 04, SECTOR - 19B, DWARKA, NEW DELHI-110075" },
    corporate: { lat: 28.4089, lng: 76.9606, label: "CORPORATE OFFICE: SHOP NO. 164, NEW ANAJ MANDI, CHARKHI DADRI, HARYANA - 127306" }
  };

  const handleLocationClick = (locationType) => {
    setSelectedLocation(locations[locationType]);
    setShowInfoWindow(true);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.375rem'
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Main content area */}
      <div className="flex-grow py-8 px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left Section - Company Info */}
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-bold text-red-600 mb-4">SBIPL</h1>
            <p className="mb-8">
              Building trusted and reliable construction company by building lasting relationships with our clients, employees, suppliers, and contractors.
            </p>
           
            {/* Location Information */}
            <div className="space-y-6">
              <div
                className="flex items-start space-x-2 cursor-pointer hover:text-red-400"
                onClick={() => handleLocationClick('mines')}
              >
                <svg className="h-6 w-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">
                  MINES ADDRESS: PLOT NO.-2, VILLAGE- KAALYANA, DISTT CHARKHI DADRI, HARYANA
                </p>
              </div>
             
              <div
                className="flex items-start space-x-2 cursor-pointer hover:text-red-400"
                onClick={() => handleLocationClick('registered')}
              >
                <svg className="h-6 w-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">
                  REGISTERED ADDRESS: FLAT NO A-01, GOLF VIEW APARTMENT, PLOT NO. 04, SECTOR - 19B, DWARKA, NEW DELHI-110075
                </p>
              </div>
             
              <div
                className="flex items-start space-x-2 cursor-pointer hover:text-red-400"
                onClick={() => handleLocationClick('corporate')}
              >
                <svg className="h-6 w-6 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">
                  CORPORATE OFFICE: SHOP NO. 164, NEW ANAJ MANDI, CHARKHI DADRI, HARYANA - 127306
                </p>
              </div>
            </div>
          </div>
         
          {/* Middle Section - Quick Links */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-red-600 mb-6">Quick Links</h2>
            <div className="space-y-4">
              <a href="#" className="block hover:text-red-400">Home</a>
              <a href="#" className="block hover:text-red-400">Projects</a>
              <a href="#" className="block hover:text-red-400">Gallery</a>
              <a href="#" className="block hover:text-red-400">About Us</a>
             
              <div className="pt-4">
                <a href="mailto:sbprojectslimited@gmail.com" className="flex items-center space-x-2 hover:text-red-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>sbprojectslimited@gmail.com</span>
                </a>
               
                <a href="tel:+919891029766" className="flex items-center space-x-2 mt-4 hover:text-red-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91 98910 29766</span>
                </a>
              </div>
            </div>
          </div>
         
          {/* Right Section - Google Map */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-red-600 mb-6">Google Map</h2>
            <div className="h-64 w-full rounded-md overflow-hidden">
              <LoadScript googleMapsApiKey="AIzaSyCuHfcAPan3paHgDfaJ-UPDLgcmGcBnpvE">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={selectedLocation}
                  zoom={12}
                  options={{
                    styles: [
                      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                    ],
                  }}
                >
                  <Marker 
                    position={selectedLocation}
                    icon={{
                      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    }}
                  />
                  
                  {showInfoWindow && (
                    <InfoWindow
                      position={selectedLocation}
                      onCloseClick={() => setShowInfoWindow(false)}
                    >
                      <div className="bg-white p-2 rounded text-black text-sm max-w-xs">
                        <p>{selectedLocation.label}</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
     
      {/* Footer */}
      <div className="mt-auto py-4 text-center border-t border-gray-800">
        <p>Copyright @2025 | SBIPL Projects Ltd.</p>
      </div>
    </div>
  );
};

export default Client;
