import React from "react";
import img from "../../assets/images/Belowhero.png";

export default function BelowHeroSection() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "35px",
        margin: "10px 80px",
        justifyContent: "space-between",
      }}
    >
      <div>
        <img
          style={{
            height: "400px",
            borderRadius: "7px",
            boxShadow: "20px 20px 10px silver",
            width: "400px",
          }}
          src={img}
          alt="belowhero"
        />
      </div>
      <div>
        <div style={{ fontSize: "2.5rem", margin: "20px 0px" }}>
          We Serve The Humanity
        </div>
        <div style={{ width: "500px", textAlign: "justify" }}>
          Poverty is both the cause and the result of a vicious cycle. If you
          start life in a family that lives below the poverty line, there is a
          high likelihood that you lack access to knowledge, skills and a decent
          income to get out and stay out of poverty.
          <br />
          <br /> By creating a place in the economy for them and by fostering
          education and a | sense of community, we empower people to get out
          (and stay out) of poverty for | ever more. |
        </div>
      </div>
    </div>
  );
}
