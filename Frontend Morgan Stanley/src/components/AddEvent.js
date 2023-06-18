import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Snackbar, Alert, AlertTitle } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Grid, Paper, TextField } from "@mui/material";
import "./css/addstaff.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from '@mui/material/Typography';
import TableRow from "@mui/material/TableRow";
import { Add as AddIcon } from "@mui/icons-material";
import { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

  const CommunityModal = () => {
    const [communities, updateCommunities] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [staffs, updateStaffs] = useState([]);

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


  useEffect(() => {
    axios
      .get("http://localhost:4421/details-Community")
      .then((response) => {
        const com = response.data;
        updateCommunities(com);
       
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });

    axios
      .get("http://localhost:4421/details-staff")
      .then((response) => {
        const staff = response.data;
        updateStaffs(staff);
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });
  }, []);

  const navigate = useNavigate();
  const paperStyle = {
    padding: 50,
    height: "100%",
    width: "80%",
    margin: "auto",
  };

  const [nameOfActivity, setnameOfActivity] = React.useState("");
  const [venue, setvenue] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [duration, setduration] = React.useState("");
  const [startDate, setstartDate] = React.useState("");
  const [startTime, setstartTime] = React.useState("");
  const [endDate, setendDate] = React.useState("");
  const [Capacity, setCapacity] = React.useState("");
  const [theme, setTheme] = React.useState("");

  const handleChange = (event) => {
    setTheme(event.target.value);
  };

  const [openCommunity, setOpenCommunity] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);

  const handleOpenCommunity = () => {
    setOpenCommunity(true);
  };

  const handleCloseCommunity = () => {
    setOpenCommunity(false);
  };

  const handleOpenStaff = () => {
    setOpenStaff(true);
  };

  const handleCloseStaff = () => {
    setOpenStaff(false);
  };

  const handleAddCommunities = () => {
    // console.log(selectedCommunities);
  };

  const handleAddStaffs = () => {
    // console.log(selectedStaffs);
  };

  const handleCommunitySelect = (community) => () => {
    setSelectedCommunities((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) => selected._id === community._id
      );

      if (isSelected) {
        return prevSelected.filter((selected) => selected._id !== community._id);
      } else {
        return [...prevSelected, community];
      }
    });
    
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaffs((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) => selected._id === staff._id
      );

      if (isSelected) {
        return prevSelected.filter((selected) => selected._id !== staff._id);
      } else {
        return [...prevSelected, staff];
      }
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid silver",
    borderRadius: 4,
    boxShadow: "0px 0px 12px gray",
    p: 4,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const myArray = [];
    console.log(nameOfActivity)
    for (let index = 0; index < selectedCommunities.length; index++) {
      const element = selectedCommunities[index];
      myArray.push(element.name)
    }
    const myArray2 = [];
    for (let index = 0; index < selectedStaffs.length; index++) {
      const element = selectedStaffs[index];
      myArray2.push(element._id)
    }
    const data = {
      nameOfActivity: nameOfActivity,
      venue: venue,
      startDate: startDate,
      endDate: endDate,
      capacity: Capacity,
      theme: theme,
      invitedCommunity: myArray,
      assignedStaff: myArray2,
      description: description,
      startTime: startTime,
      duration: duration,
    };
    console.log(data);
    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "http://localhost:4421/add-Event",
      data,
    })
      .then((res) => {
        if(res.data == "Date"){
          // alert("Invalid Dates");
          setAlertType('error');
          setAlertMsg("Invalid Dates");
        }
        else if(res.data == "Description") {
          // alert("Minimum 20 Letters in Description");
          setAlertType('error');
          setAlertMsg("Minimum 20 Letters in Description");
        }
        else {
          alert("Event Created !!");

          setAlertType('success');
          setAlertMsg("Event Created successully!");
          navigate("/manage-event");
        }
      })
      .catch((err) => {
        // alert("bad");
        setAlertType('error');
        setAlertMsg("There was some issue in processing your request. Please try again later.");
       
        console.log(err);
      });
  };

  return (
    <div>
       {message && (<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={alertType} variant="filled"  sx={{ width: '100%' }}>
                  <AlertTitle>{alertType}</AlertTitle>
                    {message}
              </Alert>
          </Snackbar>)}

      <div className="d-flex flex-column align-items-center">
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <button
              style={{ background: '#fbe400', color: '#000000'}}

              onClick={() => {
                navigate("/manage-event");
              }}
              className="btn_back"
            >
              Back
            </button>
            <Grid align="center" style={{ paddingTop: "5px" }}>
              <h1>Event Manager🧑🏼‍💻</h1>
              <h2 style={{color:"gray"}}>Here You Can Add An Event</h2>
            </Grid>
            <div className="basic_info">
              <TextField
                label="Event Name"
                placeholder="Name"
                type="text"
                sx={{ width: "60%" }}
                required
                name="nameOfActivity"
                value={nameOfActivity}
                onChange={(e) => {
                  setnameOfActivity(e.target.value);
                }}
                margin="dense"
              />
              <FormControl sx={{ width: "30%", mt: "7px" }}>
                <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={theme}
                  label="Theme"
                  name="theme"
                  onChange={handleChange}
                >
                  <MenuItem value={"Health 🏥"}>Health 🏥</MenuItem>
                  <MenuItem value={"Education 📚"}>Education 📚</MenuItem>
                  <MenuItem value={"Social Awareness 🎗️"}>
                    Social Awareness 🎗️
                  </MenuItem>
                  <MenuItem value={"Skill Training 🤖"}>
                    Skill Training 🤖
                  </MenuItem>
                  <MenuItem value={"Celebration 🥳"}>
                    Celebration 🥳
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="contact_info">
            <TextField
                label="Start Date"
                placeholder="Start Date"
                type="date"
                focused
                name="startDate"
                value={startDate}
                onChange={(e) => {
                  setstartDate(e.target.value);
                }}
                required
                sx={{ width: "30%" }}
                margin="dense"
              />
              <TextField
                label="End Date"
                placeholder="End Date"
                type="date"
                focused
                name="endDate"
                value={endDate}
                onChange={(e) => {
                  setendDate(e.target.value);
                }}
                required
                sx={{ width: "30%" }}
                // onChange={onChangeEmail}
                margin="dense"
              />
              <TextField
                label="Start Time"
                placeholder="Start Time"
                type="time"
                focused
                name="startTime"
                value={startTime}
                onChange={(e) => {
                  setstartTime(e.target.value);
                }}
                required
                sx={{ width: "30%" }}
                // onChange={onChangeEmail}
                margin="dense"
              />
            </div>
            <div className="contact_info">
            <TextField
                label="Venue"
                placeholder="Venue"
                type="text"
                fullWidth
                name="venue"
                sx={{ width: "30%" }}
                required
                value={venue}
                onChange={(e) => {
                  setvenue(e.target.value);
                }}
                margin="dense"
              />
              <TextField
                label="Capacity"
                placeholder="Capacity"
                type="number"
                name="capacity"
                sx={{ width: "30%" }}
                value={Capacity}
                onChange={(e) => {
                  setCapacity(e.target.value);
                }}
                fullWidth
                required
                margin="dense"
              />
              <TextField
                label="duration"
                placeholder="duration"
                type="number"
                name="duration"
                sx={{ width: "30%" }}
                value={duration}
                onChange={(e) => {
                  setduration(e.target.value);
                }}
                fullWidth
                required
                margin="dense"
              />
            </div>
            <div className="contact_info">
              <TextField
                label="Description"
                placeholder="Description"
                type="text"
                fullWidth
                name="description"
                sx={{ width: "100%", height: "40%"}}
                required
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                margin="dense"
              />
              </div>

              { selectedCommunities.length > 0 && <div style={{ marginBottom: '20px'}}>
                <h4 style={{ marginBottom: 0 }}>
                Added Communities: 
                </h4>
                { "  " + selectedCommunities.map(c => c.name).join(', ')}
              </div>}

              { selectedStaffs.length > 0 && <div style={{ marginBottom: '20px'}}>
                <h4 style={{ marginBottom: 0 }}>
                Added Staff: 
                </h4>
                { "  " + selectedStaffs.map(c => c.name).join(', ')}
              </div>}

            <div className="role_info">
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCommunity}
                sx={{ width: "40%", border: "solid black", padding: "10px" }}
                margin="dense"
              >
                Add Community
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenStaff}
                sx={{ width: "40%", border: "solid black", padding: "10px" }}
              >
                Add Staff
              </Button>
            </div>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Add Event
            </Button>
          </Paper>
        </Grid>
      </div>

      <Modal open={openCommunity} onClose={handleCloseCommunity}>
        <Box sx={style}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {communities.map((community) => (
                  <TableRow key={community._id} value="community">
                    <TableCell>{community.name}</TableCell>
                    <TableCell>
                      <Checkbox aria-multiselectable="true"
                        checked={selectedCommunities.findIndex(
                          (selected) => selected._id === community._id
                        )>=0}
                        onChange={handleCommunitySelect(community)}
                      />
                    </TableCell>
                  </TableRow>
                ))}


              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* <Modal open={openCommunity} onClose={handleCloseCommunity}>
        <Box sx={style}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {communities.map((community) => (
                  <TableRow key={community._id} value="community">
                    <TableCell>{community.name}</TableCell>
                    <TableCell>
                      <Checkbox aria-multiselectable="true"
                        checked={selectedCommunities.findIndex(
                          (selected) => selected._id === community._id
                        )>=0}
                        onChange={handleCommunitySelect(community)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal> */}

      {/* STAFF MODAL */}
      <Modal open={openStaff} onClose={handleCloseStaff}>
        <Box sx={style}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffs.map((staff) => (
                  <TableRow key={staff._id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={selectedStaffs.some(
                          (selected) => selected._id === staff._id
                        )}
                        onChange={() => {handleStaffSelect(staff)}}
                      />
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default CommunityModal;
