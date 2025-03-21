import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Aboutus from "./pages/Aboutus" 
import Vision from "./components/Vision";
import Project from "./components/Project";
import Service from "./components/Service";
import Client from "./components/Client";
import Services from "./pages/Services";
import Fleetandequipment from "./pages/Fleetandequipment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fleets" element={<Fleetandequipment />} />
        <Route path="/equipments" element={<Fleetandequipment />} />
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
