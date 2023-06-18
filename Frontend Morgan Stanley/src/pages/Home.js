import React from "react";
import Nav from "../components/Nav";
import Map from "../components/Map/Map";
import HomeBelowNav from "../components/HomePage/HomeBelowNav";
import Schemes from "../components/schemes/Schemes";
import Faq from "../components/FAQ/Faq.js";
import Footer from "../components/Footer/Footer.js";
import HeroSection from "../components/HomePage/Nav2";

export default function home() {
  return (
    <div style={{ marginLeft: "40px", marginRight: "40px", backgroundColor: '#FFFFFF' }}>
      {/* <Nav /> */}
      <HeroSection />
      <HomeBelowNav />

      <Schemes />
      <Faq />
      <Map />
      <Footer />
    </div>
  );
}
