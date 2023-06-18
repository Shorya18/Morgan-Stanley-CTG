import { Button, Grid, Paper, TextField, Typography, Snackbar, Alert, AlertTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../components/css/addstaff.css";
import { useLocation, useNavigate } from "react-router-dom";
import BelowHeroSection from "../components/HomePage/BelowHeroSection";
import axios from "axios";
import moment from "moment";
import QuiltedImageList from "../components/LoginLeft";

export default function Registration() {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 50,
    height: "100%",
    width: "80%",
    margin: "auto",
  };

  const { state } = useLocation();
  //console.log("state",state);

  const [adharNo, setAdharNo] = React.useState("");
  const [EventData, setEventData] = useState([]);
  const [userId, setUserId] = React.useState("");

  const [openAlert, setAlertOpen] = useState(false);
  const [message, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  
  const openAlertToast = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
    setAlertType('');
    setAlertMsg('');
  };

  useEffect(() => {
    openAlertToast();

  }, [message, alertType]);


  function onChangeAdhar(e) {
    setAdharNo(e.target.value);
    // if (validateEmail(email))
    //   setIsValidEmail(true);
    // else setIsValidEmail(false);
  }
  function onChangeUserId(e) {
    setUserId(e.target.value);
  }

  const formatDate = (date) => {
    let tempDate = new Date(date);
    let formattedDate =  tempDate.getFullYear() + '-' + (tempDate.getMonth() < 10 ? '0' + tempDate.getMonth(): tempDate.getMonth()) + '-' + (tempDate.getDate() < 10 ? '0' + tempDate.getDate(): tempDate.getDate());
    return formattedDate
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      AdharCard_No: adharNo,
      Event_id: state.Event_Reg_Id,
      userId: userId,
    };
    //console.log(data);

    // console.log(data)
    // const allowedCommunities=EventData.invitedCommunity;

    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "http://localhost:4421/details-Event/Registration",
      data,
    })
      .then((res) => {
        console.log(res);
        if (res.data == "Success") {
          if (state.Switcher == 1) {
            // setAlertType('success');
            // setAlertMsg("Registration is successful!");
        
            navigate("/event-details", {
              state: {
                Event_id: state.Event_id,
              },
            });
          } else {
            // alert("Registered in Event");
            setAlertType('success');
            setAlertMsg("Registered in Event");
          
            navigate("/");
          }
        } else if (res.data == "No User Found") {
          setAlertType('error');
          setAlertMsg("You Have Not A Part Of Any Community, Please Register YourSelf with the help of Voluteers");
        
          // alert(
          //   "You Have Not A Part Of Any Community, Please Register YourSelf with the help of Voluteers"
          // );
        } else if (res.data == "You Are Not from the allowed community") {
          setAlertType('error');
          setAlertMsg(res.data);
        
          // alert("You Are Not from the allowed community");
        } else {
          setAlertType('error');
          setAlertMsg("There was some issue in processing your request. Please try again later.");
         
          // alert("Error");
        }
      })
      .catch((err) => {
        // alert("bad");
        setAlertType('error');
        setAlertMsg("There was some issue in processing your request. Please try again later.");
       
        console.log(err);
      });
  };

  const data = {
    EventId: state.Event_Reg_Id,
  };
  //console.log(data)

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:4421/details-Event/id",
      data,
    })
      .then((res) => {
        console.log(res);
        const data = res.data;
        setEventData(data);
        //console.log(data);
      })
      .catch((err) => {
        setAlertType('error');
        setAlertMsg("There was some issue in processing your request. Please try again later.");
       
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(EventData);
  }, [EventData]);

  const date_start = moment(EventData.startDate).format("DD MMM, YYYY");
  const date_end = moment(EventData.endDate).format("DD MMM, YYYY");

  return (
    <div style={{
      backgroundColor: '#FFFFFF'
    }}>
          {message && (<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={alertType} variant="filled"  sx={{ width: '100%' }}>
                  <AlertTitle>{alertType}</AlertTitle>
                    {message}
              </Alert>
          </Snackbar>)}
      {/* <button
        style={{ margin: "20px" }}
        onClick={() => {
          if (state.Switcher == 1) {
            navigate("/event-details", {
              state: {
                Event_id: state.Event_id,
              },
            });
          } else {
            navigate("/");
          }
        }}
        className="btn_back"
      >
        Back
      </button> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50vw" }}>
          <QuiltedImageList style={{ height: "50vh" }} />
        </div>
        <div
          style={{
            width: "50vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{width:"80%"}}>
          <Paper elevation={10} style={{marginBottom:"50px"}}>
            <Typography variant="h3" gutterBottom style={{padding:"2px 20px",fontSize:"20px"}}>
              Event Details
             <hr/>
            </Typography>
            <div>
              <Typography variant="h5" gutterBottom style={{padding:"2px 20px",fontSize:"20px"}}>
                <b>Name:</b> {EventData.nameOfActivity}
              </Typography>
              <Typography variant="h5" gutterBottom style={{padding:"2px 20px",fontSize:"20px"}}>
                <b>Description:</b> {EventData.description}
              </Typography>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <Typography variant="h5" gutterBottom style={{width:"50%",padding:"2px 20px",fontSize:"20px"}}>
                <b>Start Date:</b> {EventData.startDate && formatDate(EventData.startDate)}
              </Typography>
              <Typography variant="h5" gutterBottom style={{width:"50%",padding:"2px 20px",fontSize:"20px"}}>
                <b>End Date:</b> {EventData.endDate && formatDate(EventData.endDate)}
              </Typography>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <Typography variant="h5" gutterBottom style={{width:"50%",padding:"2px 20px",fontSize:"20px"}}>
                <b>Venue:</b> {EventData.venue}
              </Typography >
              <Typography variant="h5" gutterBottom style={{width:"50%",padding:"2px 20px",fontSize:"20px"}}>
                <b>Theme:</b> {EventData.theme}
              </Typography>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <Typography variant="h5" gutterBottom style={{width:"50%",padding:"2px 20px",fontSize:"20px"}}>
                <b>Start Time:</b> {EventData.startTime}
              </Typography>
              <Typography variant="h5" gutterBottom style={{width:"50%",padding:"2px 20px",fontSize:"20px"}}>
                <b>Duration:</b> {EventData.duration}hrs
              </Typography>

            </div>
            </Paper>
          </div>
          <div style={{ width: "100%" }}>
            <Grid>
              <Paper elevation={10} style={paperStyle}>
                <Grid align="center" style={{}}>
                  <h2>Register For The Event</h2>
                </Grid>
                <TextField
                  label="Adhar No"
                  placeholder="Enter Adhar Number"
                  fullWidth
                  required
                  onChange={onChangeAdhar}
                  value={adharNo}
                  margin="dense"
                />
                <div style={{ textAlign: "center" }}>
                  <b>OR</b>
                </div>
                <TextField
                  label="UserID"
                  placeholder="Enter UserID"
                  value={userId}
                  onChange={onChangeUserId}
                  fullWidth
                  required
                  margin="dense"
                />
                <Button
                  type="submit"
                  onClick={onSubmit}
                  color="primary"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: "10px" }}
                >
                  Register
                </Button>
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default Registration;
