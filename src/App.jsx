import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero"; // Your landing page component
import AboutUs from "./Pages/Aboutus";
import Vision from "./components/Vision";
import Project from "./components/Project";
import Service from "./components/Service";
import Client from "./components/Client";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/projects" element={<div>Projects Page</div>} /> */}
        {/* <Route path="/services" element={<div>Services Page</div>} /> */}
        {/* <Route path="/gallery" element={<div>Gallery Page</div>} /> */}
      </Routes>
    </Router>
  );
}

// Home component that combines all your landing page sections
function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <Project />
      <Service />
      <Client />
    </>
  );
}

export default App;
