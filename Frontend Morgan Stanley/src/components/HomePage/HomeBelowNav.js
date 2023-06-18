import React from "react";
import "./HomeBelowNav.css";
import img1 from "../../assets/images/tinymiracleslogo.jpg";
import Marquee from "react-fast-marquee";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function () {
  return (
    <Box className="home">
      <Box className="left_featured">
        <p className="app_name">Tiny Miracles</p>

        <p className="tagline">Inspiring Change, Empowering Lives.</p>

        <Typography className="minitag">
          Crafting transformative camps for social awareness, education, medical
          aid, and more, one miracle at a time
        </Typography>
        <Box className="btns">
          <div className="schemes">
            <Typography>
              <h2 className="mg-0">12</h2>
              <p className="mg-0"> Schemes</p>
            </Typography>
          </div>
          <div className="schemes">
            <Typography>
              <h2 className="mg-0">1200</h2>
              <p className="mg-0">People</p>
            </Typography>
          </div>
          <div className="schemes">
            <Typography>
              <h2 className="mg-0">70</h2>
              <p className="mg-0">Events</p>
            </Typography>
          </div>
        </Box>
      </Box>
      <Box className="right_featured">
        <img className="img-1" src={img1} alt="blogapp" />
      </Box>
    </Box>
  );
}
