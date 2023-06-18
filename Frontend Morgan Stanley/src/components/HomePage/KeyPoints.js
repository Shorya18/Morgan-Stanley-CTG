import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SportsIcon from "@mui/icons-material/Sports";
import PeopleIcon from "@mui/icons-material/People";

export default function KeyPoints() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "30px 10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <LocalHospitalIcon style={{ fontSize: "3rem" }} />
        </div>
        <div style={{ fontSize: "20px" }}>Health</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <SchoolIcon style={{ fontSize: "3rem" }} />
        </div>
        <div style={{ fontSize: "20px" }}>Education</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <PeopleIcon style={{ fontSize: "3rem" }} />
        </div>
        <div style={{ fontSize: "20px" }}>Social Awareness</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <SportsIcon style={{ fontSize: "3rem" }} />
        </div>
        <div style={{ fontSize: "20px" }}>Skills Training</div>
      </div>
      <div sstyle={{ display: "flex", flexDirection: "column" }}>
        <div>
          <CelebrationIcon style={{ fontSize: "3rem" }} />
        </div>
        <div style={{ fontSize: "20px" }}>Celebration</div>
      </div>
    </div>
  );
}
