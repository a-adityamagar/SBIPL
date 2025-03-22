import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// Import the EnquiryFormModal component
const EnquiryFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Create a ref for the modal content
  const modalContentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    // Close modal
    onClose();
  };

  // Function to handle clicks outside the modal
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
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the form from closing it
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-900 font-medium mb-1"
              >
                Your name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
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
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#d20000] hover:bg-red-700 text-white py-3 px-12 rounded-md font-medium uppercase transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Get current location
  const dropdownRef = useRef(null);

  // Determine which menu item to show based on current location
  const isEquipmentsPage = location.pathname === "/equipments";

  useEffect(() => {
    if (isMenuOpen || isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isFormOpen]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openContactForm = () => {
    setIsFormOpen(true);
    setIsMenuOpen(false); // Close the hamburger menu when opening the form
  };

  const closeContactForm = () => {
    setIsFormOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-20 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        {/* Logo - Custom responsive adjustments */}
        <Link
          to="/"
          className="absolute left-6 sm:left-10 md:left-16 lg:left-24
                        text-red-600 text-3xl sm:text-2xl lg:text-3xl font-bold z-30"
        >
          SBIPL
        </Link>

        {/* Center Navigation */}
        <div className="flex-grow flex justify-center">
          {/* Navigation - Custom responsive adjustments */}
          <nav
            className="max-md:hidden flex flex-row
                          md:space-x-4 lg:space-x-8
                          text-white md:text-sm lg:text-lg"
          >
            <Link
              to="/"
              className={`hover:text-[#d20000] transition-colors duration-300 ${
                location.pathname === "/" ? "text-[#d20000]" : ""
              }`}
            >
              HOME
            </Link>
            <Link
              to="/about"
              className={`hover:text-[#d20000] transition-colors duration-300 ${
                location.pathname === "/about" ? "text-[#d20000]" : ""
              }`}
            >
              ABOUT US
            </Link>
            <Link
              to="/projects"
              className={`hover:text-[#d20000] transition-colors duration-300 ${
                location.pathname === "/projects" ? "text-[#d20000]" : ""
              }`}
            >
              PROJECTS
            </Link>
            <Link
              to="/services"
              className={`hover:text-[#d20000] transition-colors duration-300 ${
                location.pathname === "/services" ? "text-[#d20000]" : ""
              }`}
            >
              SERVICES
            </Link>

            {/* Dropdown for Fleets/Equipments */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/fleets" ||
                  location.pathname === "/equipments"
                    ? "text-[#d20000]"
                    : ""
                }`}
              >
                {/* Show EQUIPMENTS if on equipments page, otherwise show FLEETS */}
                {isEquipmentsPage ? "EQUIPMENTS" : "FLEETS"}
                <svg
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu - show the opposite of what's currently displayed */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 z-50">
                  {isEquipmentsPage ? (
                    <Link
                      to="/fleets"
                      className="block px-4 py-2 text-white hover:text-[#d20000] transition-colors duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      FLEETS
                    </Link>
                  ) : (
                    <Link
                      to="/equipments"
                      className="block px-4 py-2 text-white hover:text-[#d20000] transition-colors duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      EQUIPMENTS
                    </Link>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Contact Us Button - Right side */}
        <div className="absolute right-20 md:right-16 lg:right-24 z-30 max-md:hidden">
          <button
            onClick={openContactForm}
            className="bg-[#d20000] text-white px-4 py-2 rounded-sm font-medium hover:bg-red-700 transition-colors duration-300"
          >
            CONTACT US
          </button>
        </div>

        {/* Mobile Menu Button - Only visible below 764px */}
        <button
          className="absolute right-6 max-md:block hidden text-white text-3xl focus:outline-none z-30"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>

        {/* Full-screen mobile menu overlay - Only for screens below 764px */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-20 max-md:flex hidden flex-col items-center justify-center">
            <nav className="flex flex-col items-center space-y-8 text-white text-xl">
              <Link
                to="/"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/" ? "text-[#d20000]" : ""
                }`}
                onClick={closeMenu}
              >
                HOME
              </Link>
              <Link
                to="/about"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/about" ? "text-[#d20000]" : ""
                }`}
                onClick={closeMenu}
              >
                ABOUT US
              </Link>
              <Link
                to="/projects"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/projects" ? "text-[#d20000]" : ""
                }`}
                onClick={closeMenu}
              >
                PROJECTS
              </Link>
              <Link
                to="/services"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/services" ? "text-[#d20000]" : ""
                }`}
                onClick={closeMenu}
              >
                SERVICES
              </Link>

              {/* Mobile Fleets/Equipments Links */}
              <div className="flex flex-col items-center space-y-4">
                {/* Primary link - changes based on current page */}
                <Link
                  to={isEquipmentsPage ? "/equipments" : "/fleets"}
                  className={`hover:text-[#d20000] transition-colors duration-300 ${
                    (isEquipmentsPage && location.pathname === "/equipments") ||
                    (!isEquipmentsPage && location.pathname === "/fleets")
                      ? "text-[#d20000]"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  {isEquipmentsPage ? "EQUIPMENTS" : "FLEETS"}
                </Link>

                {/* Secondary link - the opposite of what's shown above */}
                <Link
                  to={isEquipmentsPage ? "/fleets" : "/equipments"}
                  className="text-gray-400 hover:text-[#d20000] transition-colors duration-300 text-base"
                  onClick={closeMenu}
                >
                  {isEquipmentsPage ? "FLEETS" : "EQUIPMENTS"}
                </Link>
              </div>

              {/* Contact Us Button in Mobile Menu */}
              <button
                onClick={openContactForm}
                className="bg-[#d20000] text-white px-6 py-2 rounded-sm font-medium mt-4 hover:bg-red-700 transition-colors duration-300"
              >
                CONTACT US
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Enquiry Form Modal */}
      <EnquiryFormModal isOpen={isFormOpen} onClose={closeContactForm} />
    </div>
  );
};

export { EnquiryFormModal };
export default Navbar;
