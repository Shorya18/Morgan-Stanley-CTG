import React from "react";
import ngoimg from "../../assets/images/Banner2.jpg";
import "./HeroSection.css";
import { Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <div className="parent">
      <div className="leftdiv">
        <p className="app_name">Tiny Miracles</p>

        <div className="tagline">
          <div className="txt_tag">Inspiring Change,</div>
          <div className="txt_tag" id="emp_tag">
            Empowering Lives.
          </div>
        </div>

        <Typography className="minitag">
          Crafting transformative camps for social awareness, education, medical
          aid, and more, one miracle at a time
        </Typography>

        <p className="last_line">
          ~Poverty is a cycle. AND IT CAN, NO, MUST BE BROKEN.
        </p>
      </div>
      <div className="image_div">
        <img style={{ objectfit: "cover", height: "420px" }} src={ngoimg} />
      </div>
    </div>
  );
}
