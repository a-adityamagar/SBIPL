import React from "react";
import Hero from "./components/Hero";
import Vision from "./components/Vision";
import Project from "./components/Project";
import Service from "./components/Service";
import Client from "./components/Client";


function App() {
  return (
    <div className="App">
      <Hero />
      <Vision/>
      <Project/>
      <Service/>
      <Client/>
      {/* Other components will go here */}
    </div>
  );
}

export default App;
