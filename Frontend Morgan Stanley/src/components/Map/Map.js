// import React, { useRef, useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { renderToStaticMarkup } from "react-dom/server";
// import RoomIcon from "@mui/icons-material/Room";
// import pointer from "../../assets/animation/pointer.json";
// import { useLottie } from "lottie-react";
// import "./Map.css";

// export default function Map() {
//   const mapRef = useRef(null);
//   const options = {
//     animationData: pointer,
//     loop: true,
//   };
//   const { View } = useLottie(options);

//   useEffect(() => {
//     if (!mapRef.current) {
//       const map = L.map("map").setView([19.259092, 72.833823], 9);
//       mapRef.current = map;

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "Map data &copy; OpenStreetMap contributors",
//         maxZoom: 20,
//       }).addTo(map);

//       const markerIcon = L.divIcon({
//         className: "custom-marker-icon",
//         html: renderToStaticMarkup(<RoomIcon style={{ color: "red" }} />),
//       });

//       L.marker([19.259092, 72.833823], {
//         icon: markerIcon,
//       }).addTo(map);
//     }
//   }, []);

//   return (
//     <div className="mapParent">
//       <div className="gif">
// 		{View}
//            </div>

//       <div id="map" className="Map" />
//     </div>
//   );
// }
import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import RoomIcon from "@mui/icons-material/Room";
import pointer from "../../assets/animation/pointer.json";
import { useLottie } from "lottie-react";
import "./Map.css";

export default function BelowHeroSection() {
  const mapRef = useRef(null);
  const options = {
    animationData: pointer,
    loop: true,
  };
  const { View } = useLottie(options);
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([19.259092, 72.833823], 9);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
        maxZoom: 20,
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: "custom-marker-icon",
        html: renderToStaticMarkup(<RoomIcon style={{ color: "red" }} />),
      });

      L.marker([19.259092, 72.833823], {
        icon: markerIcon,
      }).addTo(map);
    }
  }, []);
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "35px",
        marginTop:"0",
        margin: "10px 80px",
        justifyContent: "space-evenly",
        
      }}
    >
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"25px"}}>
        <div className="gif">{View}</div>
        <div style={{ width: "500px", textAlign: "center",display:"flex",flexDirection:"column",alignItems:"center" }}>
      <div style={{fontSize:"20px"}}> <b>VISIT US</b></div> 
      <div style={{width:"80%",fontSize:"15px"}}>
Alarsin House, Plot No A/2, opp Marol Telephone Exchange. MIDC Central Road, MIDC, Andheri East.
 Mumbai 400093
 </div>
        </div>
      </div>
    
        <div id="map" className="Map" />
    
    </div>
  );
}
