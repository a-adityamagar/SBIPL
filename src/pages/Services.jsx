import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";


// Import images
import main from "../assets/main.jpg";
import roller from "../assets/roller.jpg";
import loader from "../assets/loader.jpg";
import heavy from "../assets/heavy.jpg";
import power from "../assets/power.jpg";
import site from "../assets/site.svg";
import preconstruction from "../assets/preconstruction.svg";
import special from "../assets/special.svg";
import infra from "../assets/infra.svg";

// Lazy load the Client component
const Client = lazy(() => import("../components/Client"));

const LoadingComponent = () => (
  <div className="bg-gray-100 p-8 text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
    <p className="mt-4 text-gray-600">Loading content...</p>
  </div>
);

// Memoized for better performance
const OptimizedImage = React.memo(({ src, alt, className, onClick }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy"
    />
  );
});

const ServiceItem = React.memo(({ title, description, icon, isReversed }) => {
  const containerClass = `max-w-5xl mx-auto flex flex-col ${
    isReversed ? "md:flex-row-reverse" : "md:flex-row"
  } items-center mb-16 sm:mb-20`;
 
  const textContainerClass = `w-full md:w-2/3 ${
    isReversed ? "pl-0 md:pl-12" : "pr-0 md:pr-12"
  }`;

  return (
    <div className={containerClass}>
      <div className={textContainerClass}>
        <h4 className="text-xl sm:text-2xl font-semibold mb-4 border-b-2 border-red-600 pb-2 inline-block">
          {title}
        </h4>
        <p className="text-gray-700 text-base sm:text-lg leading-loose tracking-wide">
          {description}
        </p>
      </div>
      <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
        <div className="text-red-600 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
          <OptimizedImage
            src={icon}
            alt={`${title} Icon`}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
});

const Services = () => {
  const [featuredImage, setFeaturedImage] = useState(roller);
  
  // Memoize the equipment images array
  const equipmentImages = useMemo(() => [roller, loader, heavy, power], []);
 
  // Memoize the filtered small images
  const smallImages = useMemo(() =>
    equipmentImages.filter((img) => img !== featuredImage),
    [equipmentImages, featuredImage]
  );

  const heroBackgroundStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${main})`,
  }), []);
 
  const serviceData = useMemo(() => [
    {
      title: "Site Management",
      description: "We ensure seamless project execution with efficient planning, resource management, and on-site supervision for optimal results. Our dedicated team monitors progress, addresses challenges proactively, and implements best practices to maintain quality standards throughout the construction process.",
      icon: site,
      isReversed: false
    },
    {
      title: "Pre-Construction",
      description: "Our expert team provides strategic planning, feasibility analysis, and risk assessment to lay a strong foundation for successful project execution. We collaborate closely with stakeholders to develop comprehensive project plans, establish realistic timelines, and identify potential challenges before construction begins.",
      icon: preconstruction,
      isReversed: true
    },
    {
      title: "Special Projects",
      description: "We handle unique and complex projects with tailored solutions, innovative approaches, and a commitment to excellence. Our specialized team has the expertise to manage challenging construction requirements, implement cutting-edge techniques, and deliver exceptional results for projects that demand extraordinary attention to detail.",
      icon: special,
      isReversed: false
    },
    {
      title: "Infrastructure Constructions",
      description: "From roads to large-scale developments, we deliver high-quality infrastructure projects that meet industry standards and client expectations. Our infrastructure expertise encompasses transportation networks, utility systems, and public facilities, all built with durability, functionality, and community impact in mind.",
      icon: infra,
      isReversed: true
    }
  ], []);

  // Use useCallback for event handlers
  const handleImageSwap = useCallback((clickedImage) => {
    setFeaturedImage(clickedImage);
  }, []);

  return (
    <div className="relative w-full min-h-screen">
     
      {/* Equipment Showcase Section */}
      <div className="w-full bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 md:p-6">
            <div className="h-64 sm:h-80 md:h-96 lg:h-[28rem]">
              <OptimizedImage
                src={featuredImage}
                alt="Heavy Construction Equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Get Ready Our Comprehensive Service Offerings
              </h2>
              
              <p className="mb-6 sm:mb-8 text-gray-700 tracking-wider leading-loose text-base sm:text-lg">
                Elevate Construction Standards: Providing Comprehensive
                Solutions Tailored To Your Unique Projects Needs. Ensuring
                Quality, Efficiency, And Client Satisfaction Every Step Of The
                Way
              </p>
            </div>
            <div className="flex flex-wrap">
              {smallImages.map((image, index) => (
                <div key={index} className="w-1/3 p-1 sm:p-2">
                  <div
                    className="aspect-square cursor-pointer transition-transform duration-300 hover:scale-105 overflow-hidden"
                    onClick={() => handleImageSwap(image)}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Construction Equipment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="w-full py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 md:pl-0">
              Our Services
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-red-600 md:pl-0 leading-relaxed">
              Building excellence, Delivering trust
            </h3>
          </div>
          {/* Service Items  */}
          {serviceData.map((service, index) => (
            <ServiceItem
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              isReversed={service.isReversed}
            />
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default Services;
