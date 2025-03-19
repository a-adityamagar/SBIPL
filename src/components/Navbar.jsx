import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-20 py-6">
      <div className="container mx-auto px-4 flex justify-center items-center relative">
        {/* Logo - Custom responsive adjustments */}
        <div className="absolute left-6 sm:left-10 md:left-16 lg:left-24 
                        text-red-600 text-3xl sm:text-2xl lg:text-3xl font-bold z-30">
          SBIPL
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
              <a href="#" className="hover:text-[#d20000] transition-colors duration-300" onClick={toggleMenu}>HOME</a>
              <a href="#" className="hover:text-[#d20000] transition-colors duration-300" onClick={toggleMenu}>ABOUT US</a>
              <a href="#" className="hover:text-[#d20000] transition-colors duration-300" onClick={toggleMenu}>PROJECTS</a>
              <a href="#" className="hover:text-[#d20000] transition-colors duration-300" onClick={toggleMenu}>SERVICES</a>
              <a href="#" className="hover:text-[#d20000] transition-colors duration-300" onClick={toggleMenu}>GALLERY</a>
            </nav>
          </div>
        )}

        {/* Navigation - Custom responsive adjustments */}
        <nav className="max-md:hidden flex flex-row 
                        md:space-x-4 lg:space-x-8 
                        text-white md:text-sm lg:text-lg">
          <a href="#" className="hover:text-[#d20000] transition-colors duration-300">HOME</a>
          <a href="#" className="hover:text-[#d20000] transition-colors duration-300">ABOUT US</a>
          <a href="#" className="hover:text-[#d20000] transition-colors duration-300">PROJECTS</a>
          <a href="#" className="hover:text-[#d20000] transition-colors duration-300">SERVICES</a>
          <a href="#" className="hover:text-[#d20000] transition-colors duration-300">GALLERY</a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
