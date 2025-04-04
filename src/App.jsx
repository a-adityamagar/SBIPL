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
import Fleetandequipmentdetail from "./pages/Fleetequipmentdetail";
import Projects from "./pages/Projects";
import Financial from "./pages/Financial";
import Physical from "./pages/Physical";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fleets" element={<Fleetandequipment />} />
        <Route path="/equipments" element={<Fleetandequipment />} />
        <Route path="/fleets/:id" element={<Fleetandequipmentdetail/>} />
        <Route path="/equipments/:id" element={<Fleetandequipmentdetail/>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/performance/financial" element={<Financial />} />
        <Route path="/performance/physical" element={<Physical />} />
      </Routes>
    </Router>
  );
}

// landing page
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
