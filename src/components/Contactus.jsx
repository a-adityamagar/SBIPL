import React, { useCallback, useState } from "react";
import EnquiryFormModal from "./EnquiryFormModal";
import worker from "../assets/worker.jpg";

// Memoized for better performance
const OptimizedImage = React.memo(({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
});

const ContactUs = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openContactForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const closeContactForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  return (
    <>
      <div className="w-full py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="w-full md:w-1/2 pr-0 md:pr-10 flex flex-col h-full justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4 tracking-wide leading-tight">
                We Provide World Class Service
              </h2>
              <p className="text-gray-800 mb-8 text-base sm:text-lg leading-relaxed tracking-wide">
                End-to-end services, from site management and pre-construction planning to special projects and infrastructure construction.
              </p>
              <div>
                <button
                  onClick={openContactForm}
                  className="bg-[#d20000] text-white font-medium py-3 px-8 uppercase tracking-wider text-sm hover:bg-red-700 transition duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="h-64 sm:h-72 md:h-80 lg:h-96">
                <OptimizedImage
                  src={worker}
                  alt="Construction professionals reviewing plans"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enquiry Form Modal */}
      <EnquiryFormModal isOpen={isFormOpen} onClose={closeContactForm} />
    </>
  );
};

export default ContactUs;
