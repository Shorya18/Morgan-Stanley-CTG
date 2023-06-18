import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Typography, MenuItem, Button, Paper } from "@mui/material/";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BasicTextFields() {
    const { state } = useLocation();
    console.log(state);
    const [name, setName] = useState("");
    const [mobNo, setMobNo] = useState("");
    const [adharCard, setAdharCard] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [familyMembers, setFamilyMembers] = useState([]);
    const [income, setIncome] = useState("");
    const [education, setEducation] = useState("");
    const [helpNeeded, setHelpNeeded] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [familyId, setFamilyId] = useState(state.familyId);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [community, setCommunity] = useState(state.communityData);
    const [adharCheck, setAdharCheck] = useState(false);
    const [age, setAge] = useState(0);

    const navigate = useNavigate();

 
  const handleFamilyMembersChange = (e, index) => {
    const { value } = e.target;
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index] = value;
    setFamilyMembers(updatedFamilyMembers);
  };

  const handleHelpNeededChange = (e, index) => {
    const { value } = e.target;
    const updatedHelpNeeded = [...helpNeeded];
    updatedHelpNeeded[index] = value;
    
    setHelpNeeded(updatedHelpNeeded);
  };
  const handleDocumentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDocuments = [...documents];
    updatedDocuments[index][name] = value;
    setDocuments(updatedDocuments);
  };

  const handleMedicalHistoryChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedicalHistory = [...medicalHistory];
    updatedMedicalHistory[index][name] = value;
    setMedicalHistory(updatedMedicalHistory);
  };

  const addMedicalHistoryField = () => {
    setMedicalHistory([
      ...medicalHistory,
      { lastMedicalCheckup: "", healthIssues: [] },
    ]);
  };
  const addDocumentField = () => {
    setDocuments([
      ...documents,
      { name: "", idNo: "", dateOfIssue: "", dateOfExpiry: "" },
    ]);
  };
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const dob = new Date(dateOfBirth);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };
  const handleBack=async(e)=>{
    e.preventDefault();
    navigate("/family-info", {
        state: {
          communityData: state.communityData,
          familyId: state.familyId,
        },
      });
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      userId: `${familyId}_${name}`,
      name,
      mobNo,
      adharCheck,
      adharCard,
      community,
      familyId,
      gender,
      dateOfBirth,
      age,
      income,
      education,
      helpNeeded,
      documents,
      medicalHistory,
      employmentStatus,
    };

    console.log(user);

    try {
      // Make a POST request to your backend endpoint to add the user
      const response = await axios.post(
        "http://localhost:4421/add-userdetails",
        user
      );

      console.log(response.data);
      navigate("/family-info", {
        state: {
          communityData: state.communityData,
          familyId: state.familyId,
        },
      });// Handle the response as needed
    } catch (error) {
      console.error(error); // Handle error if request fails
    }
    

    // Reset form fields
    setName("");
    setMobNo("");
    setAdharCard("");
    setCommunity("");
    setGender("");
    setDateOfBirth("");
    setIncome("");
    setEducation("");
    setHelpNeeded([]);
    setDocuments([]);
    setFamilyId("");
    setAdharCheck(false);
    setMedicalHistory([]);
    setEmploymentStatus("");
    setAge(0);
    // Reset other fields
  };
  const Gender = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Others" },
  ];
  const Education = [
    { value: "1", label: "None" },
    { value: "2", label: "Till School" },
    { value: "3", label: "After School" },
  ];
  const Help = [
    { value: "1", label: "Health Related" },
    { value: "2", label: "Education Related" },
    { value: "3", label: "Social Awareness Related" },
    { value: "4", label: "No Help Needed" },
  ];
  const Employment = [
    { value: "1", label: "Not Employeed" },
    { value: "2", label: "Employeed" },
  ];
  return (
    
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div style={{ width: "44%" ,marginLeft:"300px",padding:"20px", backgroundColor: "#fff",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)" }}>
        <div style={{ paddingBottom: "30px",display:"flex",justifyContent:"space-between" }}>
          <Typography variant="h5" gutterBottom>
            Personal Details
          </Typography>
          <div>
          <Button sx={{mr:"10px"}}
                style={{ background: '#fbe400', color: '#000000'}}
          
          variant="contained" onClick={handleSubmit}>Add Member</Button>
          <Button 
              style={{ background: '#fff', color: '#000000'}}
          
          variant="contained" onClick={handleBack}>Back</Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <TextField
            required
            sx={{ width: "200px" }}
            id="outlined-required"
            label="Member Name"
       
            value={name}
              onChange={(e) => setName(e.target.value)}
          />

          <TextField
            
            sx={{ width: "200px" }}
            id="outlined-required"
            label="Phone Number"
            value={mobNo}
            onChange={(e) => setMobNo(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <TextField
            required
            sx={{ width: "200px" }}
            id="outlined-required"
            label="Community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          disabled
        
          />
          <TextField
            required
            sx={{ width: "200px" }}
            id="outlined-required"
            label="Family ID"
            value={familyId}
            onChange={(e) => setFamilyId(e.target.value)}
            disabled
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <TextField
            id="outlined-select-currency"
            sx={{ width: "200px" }}
            select
            label="Gender"
            value={gender}
            onChange={(e) => {
                if (e.target.value === "1") {
                  setGender("Male");
                }else if(e.target.value==="2"){
                    setGender("Female");
                }else{
                    setGender("Other");
                }
              }}
          >
            {Gender.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <div style={{display:"flex",flexDirection:"column"}}>
          <label>
              <input
                type="checkbox"
                checked={adharCheck}
                onChange={(e) => {
                  setAdharCheck(e.target.checked);
                }}
              />
              Do you have an Aadhar Card?
            </label>
            <br />
            {adharCheck && (<TextField
            required
            sx={{ width: "200px" }}
            id="outlined-required"
            label="Adhar Card ID"
            value={adharCard}
            onChange={(e) => {
              setAdharCard(e.target.value);
            }}
          
          /> )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Date of Birth"
            type="date"
            sx={{ width: "200px" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
              const age = calculateAge(dateOfBirth);
              setAge(age);
            }}
          />
          <TextField
            required
            sx={{ width: "200px" }}
            id="outlined-required"
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <TextField
            id="outlined-select-currency"
            sx={{ width: "200px" }}
            select
            label="Education"
            value={education}
            onChange={(e) => {
                if (e.target.value === "1") {
                  setEducation("None");
                }else if(e.target.value==="2"){
                    setEducation("Till School");
                }else{
                    setEducation("After School");
                }
              }}
          >
            {Education.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            sx={{ width: "200px" }}
            select
            label="Help Needed?"
            onChange={(e) => {
                if (e.target.value === "1") {
                  setHelpNeeded("Health Related");
                }else if(e.target.value==="2"){
                    setHelpNeeded("Education Related");
                }else if(e.target.value==="3"){
                    setHelpNeeded("Social Awareness Related");
                }else{
                    setHelpNeeded("No Help Needed");
                }
              }}
          >
            {Help.map((option) => (
              <MenuItem key={option.value} value={option.value} >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {age > 18 && (<div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
        
          <TextField
            required
            sx={{ width: "200px" }}
            id="outlined-required"
            label="Income:"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
            <TextField
            id="outlined-select-currency"
            sx={{ width: "200px" }}
            select
            label="Employment Status"
            value={employmentStatus}
            onChange={(e) => {
                if (e.target.value === "1") {
                  setGender("Not Employeed");
                }else if(e.target.value==="2"){
                    setGender("Employeed");
                }
              }}
          >
            {Employment.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>)}
        <div style={{ paddingBottom: "30px" }}>
          <Typography variant="h5" gutterBottom>
            Documents Details
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {documents.map((document, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",

                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  required
                  sx={{ width: "200px" }}
                  id="outlined-required"
                  label="Document Name"
                  type="text"
                  name="name"
                  value={document.name}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
                <TextField
                  required
                  sx={{ width: "200px" }}
                  id="outlined-required"
                  label="Document ID No:"
                  type="text"
                  name="idNo"
                  value={document.idNo}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
              </div>
              <div
                style={{
                  display: "flex",

                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label="Date of Issue:"
                  type="date"
                  sx={{ width: "200px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  
                  name="dateOfIssue"
                  value={document.dateOfIssue}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
                <TextField
                  label="Date of Expiry:"
                  type="date"
                  name="dateOfExpiry"
                  sx={{ width: "200px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={document.dateOfExpiry}
                  onChange={(e) => handleDocumentChange(e, index)}
                />
              </div>
            </div>
          ))}
           <Button variant="contained"
            type="button"
            onClick={addDocumentField}
          >
            Add Document Field
          </Button>
        </div>
        <div style={{ paddingBottom: "30px" }}>
          <Typography variant="h5" gutterBottom>
            Medical History
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            {medicalHistory.map((history, index) => (
              <div
                style={{
                  display: "flex",

                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  required
                  sx={{ width: "200px" }}
                  id="outlined-required"
               
                  value={history.lastMedicalCheckup}
                  type="date"
                  name="lastMedicalCheckup"
                  onChange={(e) => handleMedicalHistoryChange(e, index)}
                />
                <TextField
                  required
                  sx={{ width: "200px" }}
                  id="outlined-required"
                  label="Health Issues:"
                  value={history.healthIssues}
                  type="text"
                  name="healthIssues"
                  onChange={(e) => handleMedicalHistoryChange(e, index)}
                />
              </div>
            ))}
            <Button variant="contained"
            
              type="button"
              onClick={addMedicalHistoryField}
            >
              Add Medical History Field
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
