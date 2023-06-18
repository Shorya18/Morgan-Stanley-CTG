import React from "react";
import HeroSection from "./HeroSection";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Logo from "../../assets/images/Logo.svg";
import { Height } from "@mui/icons-material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Nav2() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // background: "linear-gradient(to bottom,floralwhite,ghostwhite)"
          background:
            "linear-gradient(to right, rgba(255, 228, 225, 0.874), #ffffff)",

          padding: "20px",
          // borderBottom: "1px solid silver",
        }}
      >
        <img
          style={{ height: "40px", width: "250px" }}
          src={Logo}
          alt="Tiny Miracles"
        />
        <div>
          <Button
            style={{
              backgroundColor: "gold",
              color: "black",
              boxShadow: "0px 0px 14px silver",
              marginLeft: "10px",
              width: "180px",
              padding: "5px",
            }}
            onClick={() => {
              // console.log(EventName.Event_id);
              navigate("/login");
            }}
            variant="contained"
          >
            Login Here <ArrowRightAltIcon />
          </Button>
        </div>
      </div>
      <HeroSection />
    </div>
  );
}
