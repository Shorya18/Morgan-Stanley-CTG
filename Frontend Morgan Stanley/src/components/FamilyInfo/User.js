import React from "react";
import { div, useTheme, Button, Modal, Typography } from "@mui/material";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./User.css";

const formatDate = (date) => {
  let tempDate = new Date(date);
  let formattedDate =  tempDate.getFullYear() + '-' + (tempDate.getMonth() < 10 ? '0' + tempDate.getMonth(): tempDate.getMonth()) + '-' + (tempDate.getDate() < 10 ? '0' + tempDate.getDate(): tempDate.getDate());
  return formattedDate
}

const ManageUser = () => {
  const [UserData, setUserData] = useState([]);
  const [individual, setIndividual] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {state}=useLocation();
 //console.log(state);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {

    navigate(`/family-info`,{state});
  };

  useEffect(() => {
   
    axios
      .get("http://localhost:4421/get-userdetails")
      .then((response) => {
        const data = response.data;
        const foundUser = data.find((user) => user.adharCard === state.adharcard);
        setIndividual(foundUser);
        console.log(foundUser);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(UserData);
  }, [UserData]);

  const theme = useTheme();
  const colors = tokens(theme.palette);

  return (
    <div>
    {isLoading ? (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        width: "100%",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#555",
      }}
    >
      Loading...
    </div>
    ) :
    (<div style={{ marginLeft: "200px" }}>
   
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60vw",
          background: "#f0f0f0",
          paddingBottom:"15px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginTop: "0px" }}>
            <img
              height="200px"
              width="200px"
              src="../../assets/user.png"
              alt="User Image"
              style={{ margin: "30px" }}
            />
          </div>
          <div style={{ justifyContent: "space-around", width: "600px" }}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h1>{individual.name}</h1>
            <Button onClick={handleButtonClick} variant="contained" style={{height:"35px",marginTop:"25px",marginRight:"20px", backgroundColor: '#fbe400', color: 'black', fontFamily:'Merriweather', fontSize:'15px'}}>See Family</Button>
            </div>
            <div>
              <div className="text">
                <b>Mobile No:</b> {individual.mobNo}
              </div>
              <div className="text">
                <b>Adhar Card No:</b> {individual.adharCard}
              </div>
              <div className="text">
                <b>Gender:</b> {individual.gender}
              </div>
              <div className="text">
                <b>Community:</b> {individual.community}
              </div>
              <div className="text">
                <b>Date of Birth:</b> {individual.dateOfBirth}
              </div>

              <div className="text">
                <b>Income:</b> {individual.income}Rs
              </div>

              <div className="text">
                <b>Education:</b> {individual.education}
              </div>

              <div className="text">
                <b>Family ID:</b> {individual.familyId}
              </div>

              {individual && individual.medicalHistory && (
                <div className="text">
                  <b>Medical History:</b>{" "}
                  {individual.medicalHistory.length > 0 ? "Yes" : "No"}
                </div>
              )}

              <div className="text">
                <b>Employment Status:</b> {individual.employmentStatus}
              </div>
              <div className="text">
                <b>Previous Employer:</b> {individual.previousEmployer}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
          <h1>Medical History:</h1>
          <hr />
          {individual && individual.medicalHistory && (
            <div >
              {individual.medicalHistory.length > 0 ? (
                <div style={{display:"flex"}}>
                  {individual.medicalHistory.map((element) => {
                    return (
                      <div key={element._id} className="smallCard">
                        <div className="text">
                          <b>Last Medical Checkup Date:</b>
                          { element.lastMedicalCheckup && formatDate(element.lastMedicalCheckup)}
                        </div>
                        <div className="text">
                          <b>Problems:</b>
                          <li>{element.healthIssues}</li>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text">No Medical History</div>
              )}
                
            </div>
          )}
          <h1>Documents Information:</h1>
          <hr />
          {individual && individual.medicalHistory && (
            <div>
              {individual.documents.length > 0 ? (
                <div style={{display:"flex"}}>
                  {individual.documents.map((element) => {
                    return (
                      <div key={element._id} className="smallCard">
                        <div className="text">
                          <b>Document Name:</b>
                          {element.name}
                        </div>
                        <div className="text">
                          <b>Document ID:</b>
                          {element.idNo}
                        </div>
                        <div className="text">
                          <b>Date Of Issue:</b>
                          {element.dateOfIssue}
                        </div>
                        <div className="text">
                          <b>Date Of Expiry:</b>
                          {element.dateOfExpiry}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>No Documents Submitted</div>
              )}
            </div>
          )}
          {/* <h1>Events Attended:</h1>
          <hr />
          {individual && individual.medicalHistory && (
            <div >
              {individual.documents.length > 0 ? (
                <div style={{display:"flex"}}>
                  {individual.documents.map((element) => {
                    return (
                      <div key={element._id} className="smallCard">
                        <div className="text">
                          <b>Document Name:</b>
                          {element.name}
                        </div>
                        <div className="text">
                          <b>Document ID:</b>
                          {element.idNo}
                        </div>
                        <div className="text">
                          <b>Date Of Issue:</b>
                          {element.dateOfIssue}
                        </div>
                        <div className="text">
                          <b>Date Of Expiry:</b>
                          {element.dateOfExpiry}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>No Medical History</div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>)}
    </div>
  );
};

export default ManageUser;
