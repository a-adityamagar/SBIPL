import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import EnquiryFormModal from "./EnquiryFormModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openContactForm = () => {
    setIsFormOpen(true);
    setIsMenuOpen(false);
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
        <Link
          to="/"
          className="absolute left-6 sm:left-10 md:left-16 lg:left-24
                        text-red-600 text-3xl sm:text-2xl lg:text-3xl font-bold z-30"
        >
          SBIPL
        </Link>

        {/* Center Navigation */}
        <div className="flex-grow flex justify-center">
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
            <Link
              to="/fleets"
              className={`hover:text-[#d20000] transition-colors duration-300 ${
                location.pathname === "/fleets" ? "text-[#d20000]" : ""
              }`}
            >
              FLEETS
            </Link>
            <Link
              to="/equipments"
              className={`hover:text-[#d20000] transition-colors duration-300 ${
                location.pathname === "/equipments" ? "text-[#d20000]" : ""
              }`}
            >
              EQUIPMENTS
            </Link>
          </nav>
        </div>

        {/* Contact Us Button*/}
        <div className="absolute right-20 md:right-16 lg:right-24 z-30 max-md:hidden">
          <button
            onClick={openContactForm}
            className="bg-[#d20000] text-white px-4 py-2 rounded-sm font-medium hover:bg-red-700 transition-colors duration-300"
          >
            CONTACT US
          </button>
        </div>

        <button
          className="absolute right-6 max-md:block hidden text-white text-3xl focus:outline-none z-30"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>

        {/* Full-screen mobile menu overlay*/}
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

              {/* Contact Us Button  */}
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

export default Navbar;
