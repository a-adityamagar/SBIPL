import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Client from "../components/Client";
import EnquiryFormModal from "../components/EnquiryFormModal"; 
import csr from "../assets/csr.jpeg";

const CSR = () => {
  const [data, setData] = useState({ workers: [], contributions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Csr.json");
        if (!response.ok) throw new Error("Failed to fetch CSR data");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openContactForm = () => setIsFormOpen(true); 
  const closeContactForm = () => setIsFormOpen(false); 

  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div
            className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4"
            style={{ borderColor: "#d20000" }}
          ></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div
            className="text-xl p-6 rounded-lg bg-white shadow-lg"
            style={{ color: "#d20000" }}
          >
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <div
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${csr})`,
        }}
      >
        <div className="max-w-5xl px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-4 tracking-wide">
          Empowering our workforce and communities
          </h1>
        </div>
      </div>

      {/* Workers Gallery Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: "#d20000" }}
          >
            Our Dedicated Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {data.workers.map((worker, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300"
              >
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="w-full h-64 object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300x400?text=Image+Not+Found")
                  }
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold" style={{ color: "#1a1a1a" }}>
                    {worker.name}
                  </h3>
                  <p className="text-md text-gray-600">{worker.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributions Section */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: "#d20000" }}
          >
            Our Community Contributions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {data.contributions.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-xl duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found")
                  }
                />
                <div className="p-4">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#d20000" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#d20000" }}
          >
            Get Involved
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join us in making a difference in our communities and workforce.
          </p>
          <button
            onClick={openContactForm} // Trigger modal on click
            className="bg-[#d20000] text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-300"
          >
            Contact Us
          </button>
        </div>
      </section>

      <Client />

      {/* Enquiry Form Modal */}
      <EnquiryFormModal isOpen={isFormOpen} onClose={closeContactForm} />
    </div>
  );
};

export default CSR;