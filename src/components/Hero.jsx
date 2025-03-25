import React, { useState, useEffect, useRef, memo } from "react";
import Navbar from "./Navbar";
import hero from "../assets/hero.mp4";


const VideoPlaceholder = memo(({ isLoading }) => {
  return isLoading ? (
    <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center">
      <div className="text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-sm">Loading video...</p>
      </div>
    </div>
  ) : null;
});

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  //  video load event
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  // video play event
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  // Lazy load the video 
  useEffect(() => {
  
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && videoRef.current) {
         
            videoRef.current.play().catch(error => {
              console.log("Auto-play was prevented:", error);
           
              setIsVideoLoaded(true);
            });
            
       
            observerRef.current.disconnect();
          }
        },
        { threshold: 0.1 } 
      );

      if (videoRef.current) {
        observerRef.current.observe(videoRef.current);
      }
    } else {
   
      setIsVideoLoaded(true);
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented"));
      }
    }

  
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Optimize video playback for performance
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    // Reduce video quality for mobile devices
    const isMobile = window.innerWidth < 768;
    if (isMobile && video.canPlayType) {
      video.playbackRate = 1.0;
    }
    
  
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isVideoPlaying) {
        video.play().catch(e => console.log("Play prevented on visibility change"));
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVideoPlaying]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoPlaceholder isLoading={!isVideoLoaded} />
   
      <video
        ref={videoRef}
        loop
        muted
        playsInline 
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadedData={handleVideoLoaded}
        onPlay={handleVideoPlay}
      >
        <source src={hero} type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-relaxed tracking-wider">
          LEADING MINING AND <br /> CONSTRUCTION EXPERTS
        </h1>
      </div>
    </div>
  );
};

export default memo(Hero);
