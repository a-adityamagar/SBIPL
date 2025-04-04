import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import EnquiryFormModal from "./EnquiryFormModal";
import Info from "./Info"; // Import Info component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showPerformanceDropdown, setShowPerformanceDropdown] = useState(false);
  const [showMobileAboutDropdown, setShowMobileAboutDropdown] = useState(false);
  const [showMobilePerformanceDropdown, setShowMobilePerformanceDropdown] = useState(false);
  const aboutDropdownTimeoutRef = useRef(null);
  const performanceDropdownTimeoutRef = useRef(null);
  const location = useLocation();

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (aboutDropdownTimeoutRef.current) clearTimeout(aboutDropdownTimeoutRef.current);
      if (performanceDropdownTimeoutRef.current) clearTimeout(performanceDropdownTimeoutRef.current);
    };
  }, []);

  const handleAboutDropdownEnter = () => {
    if (aboutDropdownTimeoutRef.current) clearTimeout(aboutDropdownTimeoutRef.current);
    setShowAboutDropdown(true);
  };

  const handleAboutDropdownLeave = () => {
    aboutDropdownTimeoutRef.current = setTimeout(() => setShowAboutDropdown(false), 300);
  };

  const handlePerformanceDropdownEnter = () => {
    if (performanceDropdownTimeoutRef.current) clearTimeout(performanceDropdownTimeoutRef.current);
    setShowPerformanceDropdown(true);
  };

  const handlePerformanceDropdownLeave = () => {
    performanceDropdownTimeoutRef.current = setTimeout(() => setShowPerformanceDropdown(false), 300);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openContactForm = () => {
    setIsFormOpen(true);
    setIsMenuOpen(false);
  };
  const closeContactForm = () => setIsFormOpen(false);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMobileAboutDropdown = (e) => {
    e.preventDefault();
    setShowMobileAboutDropdown(!showMobileAboutDropdown);
  };
  const toggleMobilePerformanceDropdown = (e) => {
    e.preventDefault();
    setShowMobilePerformanceDropdown(!showMobilePerformanceDropdown);
  };

  return (
    <div>
      <Info />
      <div
        className={`fixed top-5 left-0 w-full z-20 py-5 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <Link
            to="/"
            className="absolute left-6 sm:left-10 md:left-16 lg:left-24 text-red-600 text-2xl md:text-3xl font-bold z-30"
          >
            SBIPL
          </Link>

          {/* Center Navigation */}
          <div className="flex-grow flex justify-center">
            <nav className="max-md:hidden flex flex-row md:space-x-3 lg:space-x-6 text-white md:text-sm lg:text-base font-medium">
              <Link
                to="/"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/" ? "text-[#d20000]" : isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                HOME
              </Link>

              {/* About Us Dropdown */}
              <div className="relative" onMouseEnter={handleAboutDropdownEnter} onMouseLeave={handleAboutDropdownLeave}>
                <div
                  className={`hover:text-[#d20000] transition-colors duration-300 flex items-center cursor-pointer ${
                    location.pathname === "/about" ? "text-[#d20000]" : isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  OVERVIEW
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showAboutDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg overflow-hidden z-50">
                    <Link
                      to="/about"
                      className="block w-full text-sm text-[#d20000] hover:bg-[#d20000] hover:text-white transition-colors duration-200"
                      onClick={() => setShowAboutDropdown(false)}
                    >
                      <div className="px-4 py-2 w-full h-full">ABOUT US</div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/projects"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/projects" ? "text-[#d20000]" : isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                BUSINESS
              </Link>

              {/* Performance Dropdown */}
              <div
                className="relative"
                onMouseEnter={handlePerformanceDropdownEnter}
                onMouseLeave={handlePerformanceDropdownLeave}
              >
                <div
                  className={`hover:text-[#d20000] transition-colors duration-300 flex items-center cursor-pointer ${
                    location.pathname.includes("/performance") ? "text-[#d20000]" : isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  PERFORMANCE
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showPerformanceDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg overflow-hidden z-50">
                    <Link
                      to="/performance/physical"
                      className="block w-full text-sm text-[#d20000] hover:bg-[#d20000] hover:text-white transition-colors duration-200"
                      onClick={() => setShowPerformanceDropdown(false)}
                    >
                      <div className="px-4 py-2 w-full h-full">PHYSICAL</div>
                    </Link>
                    <Link
                      to="/performance/financial"
                      className="block w-full text-sm text-[#d20000] hover:bg-[#d20000] hover:text-white transition-colors duration-200"
                      onClick={() => setShowPerformanceDropdown(false)}
                    >
                      <div className="px-4 py-2 w-full h-full">FINANCIAL</div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/fleets"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/fleets" ? "text-[#d20000]" : isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                FLEETS
              </Link>

              <Link
                to="/equipments"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/equipments" ? "text-[#d20000]" : isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                EQUIPMENTS
              </Link>

              <Link
                to="/csr"
                className={`hover:text-[#d20000] transition-colors duration-300 ${
                  location.pathname === "/csr" ? "text-[#d20000]" : isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                CSR
              </Link>
            </nav>
          </div>

          {/* Contact Us Button */}
          <div className="absolute right-20 md:right-16 lg:right-24 z-30 max-md:hidden">
            <button
              onClick={openContactForm}
              className="bg-[#d20000] text-white px-4 py-1.5 rounded-sm text-sm font-medium hover:bg-red-700 transition-colors duration-300"
            >
              CONTACT US
            </button>
          </div>

          <button
            className={`absolute right-6 max-md:block hidden text-3xl focus:outline-none z-30 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? "×" : "☰"}
          </button>

          {/* Full-screen mobile menu overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-95 z-20 max-md:flex hidden flex-col items-center justify-center">
              <nav className="flex flex-col items-center space-y-6 text-white text-lg">
                <Link
                  to="/"
                  className={`hover:text-[#d20000] transition-colors duration-300 ${
                    location.pathname === "/" ? "text-[#d20000]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  HOME
                </Link>

                <div className="flex flex-col items-center">
                  <button
                    onClick={toggleMobileAboutDropdown}
                    className={`flex items-center hover:text-[#d20000] transition-colors duration-300 ${
                      location.pathname === "/about" ? "text-[#d20000]" : ""
                    }`}
                  >
                    OVERVIEW
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                        showMobileAboutDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showMobileAboutDropdown && (
                    <div className="flex flex-col items-center mt-2 bg-white rounded overflow-hidden w-full">
                      <Link
                        to="/about"
                        className="w-full text-center text-sm text-[#d20000] hover:bg-[#d20000] hover:text-white transition-colors duration-200"
                        onClick={closeMenu}
                      >
                        <div className="px-4 py-2">ABOUT US</div>
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/projects"
                  className={`hover:text-[#d20000] transition-colors duration-300 ${
                    location.pathname === "/projects" ? "text-[#d20000]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  BUSINESS
                </Link>

                <div className="flex flex-col items-center">
                  <button
                    onClick={toggleMobilePerformanceDropdown}
                    className={`flex items-center hover:text-[#d20000] transition-colors duration-300 ${
                      location.pathname.includes("/performance") ? "text-[#d20000]" : ""
                    }`}
                  >
                    PERFORMANCE
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                        showMobilePerformanceDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showMobilePerformanceDropdown && (
                    <div className="flex flex-col items-center mt-2 bg-white overflow-hidden w-full">
                      <Link
                        to="/performance/physical"
                        className="w-full text-center text-sm text-[#d20000] hover:bg-[#d20000] hover:text-white transition-colors duration-200"
                        onClick={closeMenu}
                      >
                        <div className="px-4 py-2">PHYSICAL</div>
                      </Link>
                      <Link
                        to="/performance/financial"
                        className="w-full text-center text-sm text-[#d20000] hover:bg-[#d20000] hover:text-white transition-colors duration-200"
                        onClick={closeMenu}
                      >
                        <div className="px-4 py-2">FINANCIAL</div>
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/fleets"
                  className={`hover:text-[#d20000] transition-colors duration-300 ${
                    location.pathname === "/fleets" ? "text-[#d20000]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  FLEETS
                </Link>

                <Link
                  to="/equipments"
                  className={`hover:text-[#d20000] transition-colors duration-300 ${
                    location.pathname === "/equipments" ? "text-[#d20000]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  EQUIPMENTS
                </Link>

                <Link
                  to="/csr"
                  className={`hover:text-[#d20000] transition-colors duration-300 ${
                    location.pathname === "/csr" ? "text-[#d20000]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  CSR
                </Link>

                <button
                  onClick={openContactForm}
                  className="bg-[#d20000] text-white px-4 py-1.5 rounded-sm font-medium hover:bg-red-700 transition-colors duration-300"
                >
                  CONTACT US
                </button>
              </nav>
            </div>
          )}
        </div>

        <EnquiryFormModal isOpen={isFormOpen} onClose={closeContactForm} />
      </div>
    </div>
  );
};

export default Navbar;