import React, { useState, useEffect, useRef } from "react";

const EnquiryFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const modalContentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      const response = await fetch("https://formspree.io/f/xjkyognj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Message sent successfully!" },
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        
        // Close modal after a short delay
        setTimeout(() => {
          onClose();
          setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null },
          });
        }, 2000);
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: data.error || "Something went wrong. Please try again." },
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Network error. Please check your connection." },
      });
    }
  };

  const handleOutsideClick = (e) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalContentRef}
        className="bg-white bg-opacity-95 rounded-md max-w-xl w-full relative shadow-xl"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Make an enquiry
          </h2>
          
          {/* Status message */}
          {status.info.msg && (
            <div className={`mb-4 p-3 rounded-md ${status.info.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {status.info.msg}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-900 font-medium mb-1"
              >
                Company name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="SBIPL Projects ltd."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                disabled={status.submitting}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-gray-900 font-medium mb-1"
                >
                  Email address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  disabled={status.submitting}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-gray-900 font-medium mb-1"
                >
                  Phone no<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  disabled={status.submitting}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-900 font-medium mb-1"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here"
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                disabled={status.submitting}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#d20000] hover:bg-red-700 text-white py-3 px-12 rounded-md font-medium uppercase transition-colors duration-300 disabled:bg-gray-400"
              disabled={status.submitting}
            >
              {status.submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryFormModal;
