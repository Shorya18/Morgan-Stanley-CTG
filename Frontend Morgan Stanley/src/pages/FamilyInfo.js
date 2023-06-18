import React, { useEffect, useState } from "react";
import UserDetailCard from "../components/FamilyInfo/UserCard";
import axios from "axios";
import { Card, Typography, Box, Button, Snackbar, Alert, AlertTitle } from "@mui/material";
import CheckMarkNav from "../components/FamilyInfo/checkMarkNav";
import { useLocation, useNavigate } from "react-router-dom";
import LineGraph from "../components/graphs/FamilyMPITrend";
import Header from "../components/Header";

export default function FamilyInfo() {
  const [individual, setIndividual] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState({
    cookingFuel: false,
    sanitation: false,
    drinkingWater: false,
    electricity: false,
    house: false,
    assets: false,
  });
  const [communityData, setCommunityData] = useState([]);

  const { state } = useLocation();
  const obj = state;
  
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

  const handleCheckboxChange = (event) => {
    setServices((prevServices) => ({
      ...prevServices,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    const data = {
      familyId: obj.familyId,
      community: obj.communityData,
      cookingFuel: services.cookingFuel,
      sanitation: services.sanitation,
      drinkingWater: services.drinkingWater,
      electricity: services.electricity,
      house: services.house,
      assets: services.assets,
    };
    const data1 = {
			community: obj.communityData,
		};
    console.log(obj);
    axios
      .post("http://localhost:4421/add-familydetails", data)
      .then((response) => {
        const data = response.data;
        setAlertType('success');
        setAlertMsg("Family parameters updated successfully!");
      })
      .catch((error) => {
        setAlertType('error');
        setAlertMsg("There was some issue in processing your request. Please try again later.");
       
        console.error("Failed to retrieve Community data:", error);
      });
    console.log(services);
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/add-user", {
      state: {
        communityData: obj.communityData,
        familyId: obj.familyId,
      },
    });
  };

  const handleBack= () => {
    //console.log("check",state);
   navigate(`/community-families`,{state});
  };

  useEffect(() => {
    axios
      .get("http://localhost:4421/get-userdetails")
      .then((response) => {
        const data = response.data;
        const foundUsers = data.filter(
          (user) => user.familyId === state.familyId
          );
          // console.log(foundUsers);
        setIndividual(foundUsers);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to retrieve staff data:", error);
      });

      axios
      .post("http://localhost:4421/get-communityfamily", {
        community: obj.communityData,
      })
      .then((response) => {
        const data = response.data;
        //console.log(data);
        // console.log("heheh", data)
        const foundUsers = data.filter(
          (user) => user.familyId === state.familyId
        );
        console.log(data)
        const y = foundUsers[0].MPIscore.map((item) => item.score);
        const x =foundUsers[0].MPIscore.map((item) => item.date.split("T")[0]);
        const familyId = state.familyId;
        const finalData = [{ x, y,familyId}];
        // console.log("mpi", mpiScores); console.log("index", indexArray);
        setCommunityData(finalData);
      })
      .catch((error) => {
        console.error("Failed to retrieve Community data:", error);
      });
  }, []);

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
      ) : (

        <Box m="20px">
           {message && (<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={alertType} variant="filled"  sx={{ width: '100%' }}>
                  <AlertTitle>{alertType}</AlertTitle>
                    {message}
              </Alert>
          </Snackbar>)}
        
          <Box display="flex" alignItems="center" mb="20px"
          style={{ }}

          >
            <Header
              title={`Manage Family Members`}
              />
            <Box ml="auto" display="flex" alignItems="center">
              <Box mr={1}>
              <Button
              
                style={{ background: '#fbe400', color: '#000000', marginRight: '10px' }}
                  onClick={handleButtonClick}
                  color="primary"
                >
                  ADD MEMBER
                </Button>

                <Button
                style={{ background: '#fff', color: '#000000'}}
                  onClick={handleBack}
                  color="primary"
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding:'20px'
          }}
        >

          <div
            style={{
              display: "flex",
             
            }}
          >
            {/* <Card
              sx={{
                display: "flex",
                marginTop: "15px",
                marginLeft: "15px",
                width: 300,
                height: 168,
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleButtonClick}
            >
              <Box
                sx={{
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Typography
                  component="div"
                  variant="h2"
                  sx={{ color: "black" }}
                >
                  Add Member
                </Typography>
              </Box>
            </Card> */}

            {individual.map((element) => (
              <UserDetailCard
                key={element._id}
                name={element.name}
                adhar={element.adharCard}
                age={element.age}
                gender={element.gender}
                info={state}
              />
            ))}
          </div>

          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >

          <Card
              sx={{
                display: "flex",
                marginTop: "20px",
                marginLeft: "15px",
                padding: "20px",
                width: 500,
                height: 450,
                backgroundColor: "#f0f0f0",
                borderRadius: "0px",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  margin: "auto",
                }}
              >
                <Typography
                  component="div"
                  variant="h3"
                  sx={{ color: "black" }}
                >
                 Standard of Living:
                </Typography>

                <CheckMarkNav
                  services={services}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSubmit={handleSubmit}
                  state={state}
                />
              </Box>
            </Card>



            <div style={{  display: "flex", alignContent: "center",
                marginLeft: "15px",
                padding: "20px" }}>
              <LineGraph data = {communityData} />
              {/* <LineGraph /> */}
            </div>

          </div>


        </div>
      </Box>
        )}
      </div>

  );
}