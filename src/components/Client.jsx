import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Memoize the map component 
const MapComponent = memo(({ selectedLocation, showInfoWindow, setShowInfoWindow }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.375rem'
  };


  const mapOptions = {
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    ],
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={selectedLocation}
      zoom={12}
      options={mapOptions}
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
  );
});


const LocationItem = memo(({ icon, text, onClick }) => (
  <div
    className="flex items-start space-x-2 cursor-pointer hover:text-red-400 transition-colors duration-200"
    onClick={onClick}
  >
    {icon}
    <p className="text-sm">{text}</p>
  </div>
));


const LocationIcon = memo(() => (
  <svg className="h-5 w-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
));

const EmailIcon = memo(() => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
));


const PhoneIcon = memo(() => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
));

const Client = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.6139,
    lng: 77.2090,
    label: 'Default'
  });
 
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Pre-define locations 
  const locations = {
    mines: { lat: 28.4089, lng: 76.9606, label: "MINES ADDRESS: PLOT NO.-2, VILLAGE- KAALYANA, DISTT CHARKHI DADRI, HARYANA" },
    registered: { lat: 28.5823, lng: 77.0500, label: "REGISTERED ADDRESS: FLAT NO A-01, GOLF VIEW APARTMENT, PLOT NO. 04, SECTOR - 19B, DWARKA, NEW DELHI-110075" },
    corporate: { lat: 28.4089, lng: 76.9606, label: "CORPORATE OFFICE: SHOP NO. 164, NEW ANAJ MANDI, CHARKHI DADRI, HARYANA - 127306" }
  };

  // Memoize location 
  const handleLocationClick = useCallback((locationType) => {
    setSelectedLocation(locations[locationType]);
    setShowInfoWindow(true);
  }, [locations]);

  // Handle map load event
  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="bg-black text-white py-6 px-4 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Section - Company Info */}
        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold text-red-600 mb-3">SBIPL</h1>
          <p className="mb-4">
            Building trusted and reliable construction company by building lasting relationships with our clients, employees, suppliers, and contractors.
          </p>
         
          {/* Location Information */}
          <div className="space-y-4">
            <LocationItem 
              icon={<LocationIcon />}
              text="MINES ADDRESS: PLOT NO.-2, VILLAGE- KAALYANA, DISTT CHARKHI DADRI, HARYANA"
              onClick={() => handleLocationClick('mines')}
            />
            
            <LocationItem 
              icon={<LocationIcon />}
              text="REGISTERED ADDRESS: FLAT NO A-01, GOLF VIEW APARTMENT, PLOT NO. 04, SECTOR - 19B, DWARKA, NEW DELHI-110075"
              onClick={() => handleLocationClick('registered')}
            />
            
            <LocationItem 
              icon={<LocationIcon />}
              text="CORPORATE OFFICE: SHOP NO. 164, NEW ANAJ MANDI, CHARKHI DADRI, HARYANA - 127306"
              onClick={() => handleLocationClick('corporate')}
            />
          </div>
        </div>
       
        {/* Middle Section - Quick Links */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link to="/" className="block hover:text-red-400 transition-colors duration-200">Home</Link>
            <Link to="/projects" className="block hover:text-red-400 transition-colors duration-200">Projects</Link>
            <Link to="/services" className="block hover:text-red-400 transition-colors duration-200">Services</Link>
            <Link to="/about" className="block hover:text-red-400 transition-colors duration-200">About Us</Link>
           
            <div className="pt-3">
              <a href="mailto:sbprojectslimited@gmail.com" className="flex items-center space-x-2 hover:text-red-400 transition-colors duration-200">
                <EmailIcon />
                <span>sbprojectslimited@gmail.com</span>
              </a>
             
              <a href="tel:+919891029766" className="flex items-center space-x-2 mt-3 hover:text-red-400 transition-colors duration-200">
                <PhoneIcon />
                <span>+91 98910 29766</span>
              </a>
            </div>
          </div>
        </div>
       
        {/* Right Section - Google Map */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Google Map</h2>
          <div className="h-64 w-full rounded-md overflow-hidden">
            {/* Conditionally render the map to improve initial load time */}
            <LoadScript 
              googleMapsApiKey="AIzaSyCuHfcAPan3paHgDfaJ-UPDLgcmGcBnpvE"
              onLoad={handleMapLoad}
              loadingElement={
                <div className="h-full w-full flex items-center justify-center bg-gray-800">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
                </div>
              }
            >
              <MapComponent 
                selectedLocation={selectedLocation}
                showInfoWindow={showInfoWindow}
                setShowInfoWindow={setShowInfoWindow}
              />
            </LoadScript>
          </div>
        </div>
      </div>
     
      {/* Footer */}
      <div className="mt-6 pt-3 text-center border-t border-gray-800">
        <p>Copyright @{new Date().getFullYear()} | SBIPL Projects Ltd.</p>
      </div>
    </div>
  );
};

export default Client;
