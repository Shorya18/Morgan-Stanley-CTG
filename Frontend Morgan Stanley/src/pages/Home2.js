import React, { useEffect, useState } from "react";
import Nav2 from "../components/HomePage/Nav2";
import BelowHeroSection from "../components/HomePage/BelowHeroSection";
import KeyPoints from "../components/HomePage/KeyPoints";
import Map from "../components/Map/Map";
import Faq from "../components/FAQ/Faq";
import Footer from "../components/Footer/Footer.js";
import Card from "../components/HomePage/Card";
import axios from "axios";

export default function Home() {
  const [EventData, setEventData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4421/details-Event")
      .then((response) => {
        const Event = response.data;
        setEventData(Event);
        console.log(Event);
      })
      .catch((error) => {
        console.error("Failed to retrieve Event data:", error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFFFF'}}>
      <div>
        <Nav2 />
        <BelowHeroSection />
        <KeyPoints />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "50px",
            maxWidth:"100vw",
          
            flexWrap: "wrap", // Enable wrapping of cards
            // display: "grid",
            // gridTemplateColumns: "repeat(3, 1fr)"
          }}
        >
          {EventData.map((Event) => (
            <Card
            
              key={Event._id}
              description={Event.description}
              Event_id={Event._id}
              EventName={Event.nameOfActivity}
              StartTime={Event.startDate}
              Venue={Event.venue}
              Theme={Event.theme}
              Invited={Event.invitedCommunity}
            />
          ))}
        </div>
        <Faq />
        <Map />
      </div>
      <Footer />
    </div>
  );
}
