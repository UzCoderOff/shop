import React from "react";
import Carusel from "./Carusel";
import BrowseByCatag from "./BrowseByCatag";
import OurProducts from "./OurProducts";
import Jbl from "./Jbl";
import Services from "./Services";

const Home = () => {
  return (
    <div className="w-full 960:px-[9.3%] px-1 960:pt-11 pt-1">
      <Carusel />
      <BrowseByCatag />
      <OurProducts/>
      <Jbl/>
      <Services/>
    </div>
  );
};

export default Home;
