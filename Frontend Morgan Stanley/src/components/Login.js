import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/images/tinymiracleslogo.jpg";
import QuiltedImageList from "./LoginLeft";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [email, ChangeEmail] = useState("");
  const [password, ChangePassword] = useState("");

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


  function onChangeEmail(e) {
    ChangeEmail(e.target.value);
    // if (validateEmail(email))
    //   setIsValidEmail(true);
    // else setIsValidEmail(false);
  }
  function onChangePassword(e) {
    ChangePassword(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    console.log(email);
    const user = {
      email: email,
      password: password,
    };
    // console.log(user);
    ChangeEmail("");
    ChangePassword("");
    Axios.defaults.withCredentials = true;
    //console.log(user);
    Axios({
      method: "POST",
      url: "http://localhost:4421/admin-login",
      data: {
        username: user.email,
        password: user.password,
      },
    })
      .then((res) => {
        setAlertType('success');
        setAlertMsg("User logged in successfully!");
        navigate("/dashboard");
  
      })
      .catch((err) => {
        // alert("bad");
        setAlertType('error');
        setAlertMsg("There was some issue in processing your request. Please try again later.");
       
        console.log(err);
      });
  }
  const paperStyle = {
    padding: 20,
    height: "65vh",
    width: 320,
    margin: "100px auto",
    backgroundColor: "",
    borderRadius: 10,
    boxShadow: "0px 1px 20px babypink",
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF'
      }}
    >

        {message && (<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={alertType} variant="filled"  sx={{ width: '100%' }}>
                  <AlertTitle>{alertType}</AlertTitle>
                    {message}
              </Alert>
          </Snackbar>)}
      <div style={{ width: "50vw" }}>
        <QuiltedImageList style={{ height: "50vh", objectFit: "cover" }} />
        {/* <img src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" style={{width:"90%",height:"100vh"}}/> */}
      </div>
      <div
        className="d-flex flex-column align-items-center"
        style={{ margin: "auto" }}
      >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center" style={{ paddingTop: "50px" }}>
              <Avatar></Avatar>
              <h2>Log In</h2>
            </Grid>
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              required
              onChange={onChangeEmail}
              margin="dense"
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              onChange={onChangePassword}
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
              log in
            </Button>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

export default Login;
