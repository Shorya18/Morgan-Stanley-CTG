import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton
} from "@mui/x-data-grid";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import { useTheme, Button, Typography, Snackbar, Alert, AlertTitle  } from "@mui/material";
import { saveAs } from "file-saver";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import PieChart from "../components/graphs/PieChart";
import AgeVsAttendeesBarChart from "../components/graphs/ageVsAttendees";
import MpiVsFamilyBarChart from "../components/graphs/mpiVsFamilyBarChart";
import {
	mockPieData,
	ageVsAttendeesData,
	MpiVsFamilyBarData,
} from "../data/dummyData";
import LineGraph from "../components/graphs/communityMPITrend";

// import Yo from "../yo";

const CommunityProfile = () => {

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
	  setAlertType('');
	  setAlertMsg('');
	  setAlertOpen(false);
	};
  
	useEffect(() => {
	  openAlertToast();
  
	}, [message, alertType]);

	const [communityData, setCommunityData] = useState([]);
	const [eventData, setEventData] = useState([]);

	const [familyData, setFamilyData] = useState([]);
	const { state } = useLocation();
	const [familyMPI, setfamilyMPI] = useState([]);
	const [communityMPI, setCommunityMPI] = useState([]);
	const [barchart, setBarChartValue] = useState(
		<MpiVsFamilyBarChart Score={familyMPI} data={familyMPI} />
	);

	// useEffect(() => {
		
	// }, []);


	const navigate = useNavigate();
	useEffect(() => {
		const data = {
			community: state.community,
		};
		// console.log("statee", state);
		axios.post("http://localhost:4421/get-communityfamily", data)
			.then((response) => {
				const data = response.data;
				const mpiScores = data.map((community) => ({
					familyId: community.familyId,
					community: community.community,
					MPI_score: community.MPIscore.length === 0 ? 1 : community.MPIscore[community.MPIscore.length - 1].score,
				}));
				// console.log("family", mpiScores);
				setCommunityData(mpiScores);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve Community data:",
					error
				);
			});

		axios.post("http://localhost:4421/details-Event/comwise", data)
			.then((response) => {
				// setAlertType('Success');
        		// setAlertMsg("");

				const data = response.data;
				// console.log("event", data);	
				setEventData(data);
			})
			.catch((error) => {
				setAlertType('Error');
        		setAlertMsg("Failed to retrieve Community data.");

				console.error(
					"Failed to retrieve Community data:",
					error
				);
			});
			axios.post(
				`http://localhost:4421/get-communityfamily`, data
			)
				.then((response) => {
					const data = response.data;
					console.log(data);
					const mpiScores = data.map((community) => ({
						familyId: community.familyId,
						MPI_score: community.MPIscore.length === 0 ? 1 : community.MPIscore[community.MPIscore.length - 1].score,
					  }));
					//   console.log("hello", mpiScores);
					  setfamilyMPI(mpiScores);
				})
				.catch((error) => {
					console.error(
						"Failed to retrieve Community data:",
						error
					);
				});
				axios
				.get("http://localhost:4421/details-Community")
				.then((response) => {
				  const data = response.data;
				  console.log(data);
				  const foundUsers = data.filter(
					(user) => user.name === state.community
				  );
				//   console.log("com", foundUsers)
				  const y = foundUsers[0].MPIscore.map((item) => item.score);
				  const x = foundUsers[0].MPIscore.map((item) => item.date.split("T")[0]);
				  const familyId = state.community;
				  const finalData = [{ x, y,familyId}];
				  console.log(finalData);
				  setCommunityMPI(finalData);
				
				})
				.catch((error) => {
				  console.error("Failed to retrieve Community data:", error);
				});
	}, [state.community]);
	
	useEffect(() => {
		setBarChartValue(() => (
			<MpiVsFamilyBarChart Score= {familyMPI} data={familyMPI} />
		));
	}, [familyMPI]);
	useEffect(() => {
		// console.log(communityData);
		// console.log(eventData);
	}, [communityData, eventData]);

	const theme = useTheme();
	const colors = tokens(theme.palette);

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	}
	const FamilyDetails = [
		{ field: "familyId", headerName: "ID", flex: 0.5 },
		{
			field: "community",
			headerName: "Community",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "MPI_score",
			headerName: "MPI Score",
			flex: 1,
		},
		{
			field: "actions",
			headerName: "See More Details",
			flex: 1,
			renderCell: (params) => (
				<Button
          variant="outlined"
          color="primary"
          onClick={() => {
            //console.log(params.row);
            navigate("/family-info", {
              state: {
                familyId: params.row.familyId,
                communityData: params.row.community,
              },
            });
          }}
        >
          View Members
        </Button>
			),
			align: "center",
		},
	];

	const EventDetails = [
		// { field: "eventId", headerName: "EventId", flex: 0.5 },

		{
			field: "nameOfActivity",
			headerName: "Event Name",
			flex: 1,
		},
		{
			field: "startDate",
			headerName: "Start Date",
			type: "date",
			renderCell: (params) =>
				params.row.startDate.split("T")[0],
			align: "left",
			flex: 1,
		},
		{
			field: "endDate",
			headerName: "End Date",
			type: "date",
			renderCell: (params) =>
				params.row.startDate.split("T")[0],
			align: "left",
			flex: 1,
		},
		{
			field: "venue",
			headerName: "Venue",
			flex: 1,
		},
		{
			field: "theme",
			headerName: "Theme",
			flex: 1,
		},
		{
			field: "capacity",
			headerName: "Capacity",
			flex: 1,
			align: "left",
		},
		{
			field: "actions",
			headerName: "See More Details",
			flex: 1,
			renderCell: (params) => (
			  <Button
				variant="outlined"
				color="primary"
				onClick={() => {
				  console.log(params.row._id)
				  navigate("/event-details", {
					state: {
					  Event_id: params.row._id,
					},
				  });
	  
				//   setIndividual(params.row);
				//   handleOpen();
				}}
			  >
				View
			  </Button>
			),
		  },
	];
	return (
		<Box m="20px">
			{message && (<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={alertType} variant="filled"  sx={{ width: '100%' }}>
                  <AlertTitle>{alertType}</AlertTitle>
                    {message}
              </Alert>
          </Snackbar>)}
					{/* header */}
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						style={{ }}
					>
						<Header
							title={`${state.community} Community Profile`}
							subtitle={`Information of the Families and Events in ${state.community}`}
						/>
						<Button 
						style={{ background: '#fbe400', color: '#000000'}}

						variant="contained" color="negative"              
						onClick={() => {
							navigate("/dashboard");
						}}>
					Back
					</Button>
					</Box>
				
				{/* FAMILIES */}
				<Box
				    
					sx={{
						"& .MuiDataGrid-root": {
							border: "none",
							fontSize: "14px",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: "none",
						},
						"& .name-column--cell": {
							color: colors
								.greenAccent[300],
						},
						"& .MuiDataGrid-columnHeaders":
							{
								backgroundColor:
									colors
										.blueAccent[700],
								borderBottom:
									"none",
							},
						"& .MuiDataGrid-virtualScroller":
							{
								backgroundColor:
									'#FFFFFF',
							},
						"& .MuiDataGrid-footerContainer":
							{
								borderTop: "none",
								backgroundColor:
									colors
										.blueAccent[700],
							},
						"& .MuiCheckbox-root": {
							color: `${colors.greenAccent[200]} !important`,
						},
						"& .MuiDataGrid-toolbarContainer .MuiButton-text":
							{
								color: `${colors.grey[100]} !important`,
							},
					}}
				>

						{/*families header  */}
					<Box
						sx={{ mt: "20px" }}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography
							variant="h3"
							fontWeight="600"
							color=''
						>
							FAMILIES
						</Typography>
						{/* <Box>
							<Button
								sx={{
									backgroundColor:
										colors
											.blueAccent[700],
									color: colors
										.grey[100],
									fontSize: "14px",
									fontWeight: "bold",
									padding: "10px 20px",
								}}
								onClick={() =>
									exportAsCsv(
										communityData,
										FamilyDetails
									)
								}
							>
								<DownloadOutlinedIcon
									sx={{
										mr: "10px",
									}}
								/>
								Download Family
								Details
							</Button>
						</Box> */}
					</Box>

					{/* Families Graphs */}
					<Box
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
						gridAutoRows="180px"
						gap="20px"
						height="480px"
						sx={{ mt: "15px", mb: "25px" }}
					>
						<Box
							gridColumn="span 7"
							gridRow="span 2"
							backgroundColor='#f0f0f0'
							
							height="450px"
						>
							<Typography
								variant="h4"
								fontWeight="600"
								textTransform="uppercase"
								sx={{
									padding: "30px 30px 0 30px",
								}}
							>
								MPI Score
								of different
								families in{" "}
								{
									state.community
								}{" "}
								community
							</Typography>
							<Box height="350px">
								{barchart}

								{/* <MpiVsFamilyBarChart isDashboard={true} data={MpiVsFamilyBarData} /> */}
							</Box>
						</Box>

						<Box
								gridColumn="span 5"
								gridRow="span 2"
								p="30px"
								height="450px"
								style={{ background:'#f0f0f0' }}
								
							>
								<Typography
									variant="h4"
									fontWeight="600"
									textTransform="uppercase"
									paddingBottom="20px"
								>
									Community MPI trend
								</Typography>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="center"
									mt="25px"
									height="300px"
								>
									<LineGraph data= {communityMPI}/>
									{/* <PieChart data={mockPieData} /> */}
								</Box>
							</Box>
					</Box>

					<Box style={{height: '400px'}}>

					<DataGrid
						sx={{ mb: "10px" }}
						rows={communityData}
						getRowId={(row) => row.familyId}
						columns={FamilyDetails}
						components={{
							Toolbar: CustomToolbar,
						}}
						/>
						</Box>
				</Box>
				{/* EVENTS */}

				<Box
					m="20px 0 0 0"
					sx={{
						"& .MuiDataGrid-root": {
							border: "none",
							fontSize: "14px",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: "none",
						},
						"& .name-column--cell": {
							color: colors
								.greenAccent[300],
						},
						"& .MuiDataGrid-columnHeaders":
							{
								backgroundColor:
									colors
										.blueAccent[700],
								borderBottom:
									"none",
							},
						"& .MuiDataGrid-virtualScroller":
							{
								backgroundColor:
									'#FFFFFF',
							},
						"& .MuiDataGrid-footerContainer":
							{
								borderTop: "none",
								backgroundColor:
									colors
										.blueAccent[700],
							},
						"& .MuiCheckbox-root": {
							color: `${colors.greenAccent[200]} !important`,
						},
						"& .MuiDataGrid-toolbarContainer .MuiButton-text":
							{
								color: `${colors.grey[100]} !important`,
							},
					}}
				>
					{/* events header */}
					<Box
						sx={{ mt: "35px" }}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography
							variant="h3"
							fontWeight="600"
							color=''
						>
							EVENTS
						</Typography>
					
					</Box>

					{/* Events Graphs */}
					<Box
						display="grid"
						gridTemplateColumns="repeat(12, 1fr)"
						gridAutoRows="180px"
						gap="20px"
						sx={{ mt: "15px" }}
						height="450px"

					>
						<Box
							gridColumn="span 7"
							gridRow="span 2"
							backgroundColor='#f0f0f0'
							height="450px"

						>
							<Typography
								 variant="h3"
								 fontWeight="600"
								 textTransform="uppercase"
								sx={{
									padding: "30px 30px 0 30px",
								}}
							>
								Attendees
								participating in
								events with
								their age group
							</Typography>
							<Box height="350px">
								<AgeVsAttendeesBarChart
									isDashboard={
										true
									}
									data={
										ageVsAttendeesData
									}
								/>
							</Box>
						</Box>
						<Box
							gridColumn="span 5"
							gridRow="span 2"
							backgroundColor='#f0f0f0'
							p="30px"
							height="450px"
						>
							<Typography
								 variant="h3"
								 fontWeight="600"
								 textTransform="uppercase"
							>
								People attending
								events of
								different gender
							</Typography>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								mt="25px"
								height="300px"
							>
								<PieChart
									data={
										mockPieData
									}
								/>

								{/* <Typography>
											Includes walk-in
											Attendees
										</Typography> */}
							</Box>
						</Box>
					</Box>


					<Box style={{height: '400px'}}>
				
						<DataGrid
							sx={{ mt: "20px" }}
							getRowId={(row) => row._id}
							rows={eventData}
							columns={EventDetails}
							components={{
								Toolbar: CustomToolbar,
							}}
						/>
					</Box>
				</Box>
			
		</Box>
	);
};

export default CommunityProfile;
