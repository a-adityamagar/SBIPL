import React from "react";
import { FaEnvelope, FaPhone, FaGlobe, FaCopyright } from "react-icons/fa";

const Info = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-100 py-1 overflow-hidden z-30">
      <div className="relative w-full">
        <div className="flex animate-marquee gap-5 hover:pause-marquee whitespace-nowrap">
          <div className="flex items-center space-x-4 gap-5 text-gray-800 text-xs md:text-sm">
            <span className="font-semibold">SBIPL Projects Ltd.</span>
            <div className="flex items-center space-x-1">
              <FaPhone className="text-[#d20000]" />
              <span>+91 98910 29766</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEnvelope className="text-[#d20000]" />
              <span>sbprojectslimited@gmail.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaGlobe className="text-[#d20000]" />
              <a
                href="https://sbiplprojects.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d20000] hover:underline"
              >
                sbiplprojects.co
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <FaCopyright className="text-[#d20000]" />
              <span>Copyright © 2025 | SBIPL Projects Ltd.</span>
            </div>
          </div>
          {/* Duplicate content for seamless looping */}
          <div className="flex items-center space-x-4 gap-5 text-gray-800 text-xs md:text-sm ml-4">
            <span className="font-semibold">SBIPL Projects Ltd.</span>
            <div className="flex items-center space-x-1">
              <FaPhone className="text-[#d20000]" />
              <span>+91 98910 29766</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaEnvelope className="text-[#d20000]" />
              <span>sbprojectslimited@gmail.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaGlobe className="text-[#d20000]" />
              <a
                href="https://sbiplprojects.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d20000] hover:underline"
              >
                sbiplprojects.co
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <FaCopyright className="text-[#d20000]" />
              <span>Copyright © 2025 | SBIPL Projects Ltd.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;