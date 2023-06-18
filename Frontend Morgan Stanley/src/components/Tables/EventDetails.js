import React from "react";
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import { styled } from "@mui/material/styles";
import axios from "axios";

const EventDetails = () => {
	const { state } = useLocation();
	const [UserData, setUserData] = useState([]);
	const [StaffData, setStaffData] = useState([]);
	const [individual, setIndividual] = useState([]);
	const [EventData, setEventData] = useState([]);

	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);

	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => setOpen2(false);
	const formatDate = (date) => {
		let tempDate = new Date(date);
		let formattedDate =  tempDate.getFullYear() + '-' + (tempDate.getMonth() < 10 ? '0' + tempDate.getMonth(): tempDate.getMonth()) + '-' + (tempDate.getDate() < 10 ? '0' + tempDate.getDate(): tempDate.getDate());
		return formattedDate
	}
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 600,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const data = {
		Event_id: state.Event_id,
	};

	const navigate = useNavigate();
	useEffect(() => {
		axios({
			method: "POST",
			url: "http://localhost:4421/details-Event/user",
			data,
		})
			.then((res) => {
				// console.log(res);
				const data = res.data;
				setUserData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		console.log(UserData);
	}, [UserData]);

	useEffect(() => {
		axios({
			method: "POST",
			url: "http://localhost:4421/details-Event/staff",
			data,
		})
			.then((res) => {
				//console.log(res);
				const data = res.data;
				setStaffData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const data = {
			EventId: state.Event_id,
		};

		axios({
			method: "POST",
			url: "http://localhost:4421/details-Event/id",
			data,
		})
			.then((res) => {
				const data = res.data;
				setEventData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		console.log(EventData);
	}, [EventData]);

	const theme = useTheme();
	const colors = tokens(theme.palette);
	const columns1 = [
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "adharCard",
			headerName: "Aadhar Card No.",
			type: "number",
			headerAlign: "left",
			align: "left",
			flex: 1,
		},
		{
			field: "mobNo",
			headerName: "Phone Number",
			flex: 1,
		},
		{
			field: `gender`,
			headerName: "Gender",
			flex: 1,
		},
		{
			field: "community",
			headerName: "Community",
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
						console.log(params.row);
						setIndividual(params.row);
						handleOpen1();
					}}
				>
					View
				</Button>
			),
		},
	];

	const columns2 = [
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "AdharCard_No",
			headerName: "Aadhar Card No.",
			type: "number",
			headerAlign: "left",
			align: "left",
			flex: 1,
		},
		{
			field: "mobile_no",
			headerName: "Phone Number",
			flex: 1,
		},
		{
			field: "Role",
			headerName: "Role",
			flex: 1,
		},
		{
			field: "Assigned_Community",
			headerName: "Assigned Community",
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
						console.log(params.row);
						setIndividual(params.row);
						handleOpen2();
					}}
				>
					View
				</Button>
			),
		},
	];

	const date_start = moment(EventData.startDate).format("DD MMM, YYYY");
	const date_end = moment(EventData.endDate).format("DD MMM, YYYY");
	// const Total_Active_Events = EventData2.length

	
	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	}


	return (
		<Box
			m="20px"
			p="20px"
			style={{ overflowY: "scroll", height: "90vh" }}
		>
			<Box
				ml="auto"
				display="flex"
				alignItems="center"
				style={{ justifyContent: "space-between" }}
			>
				<div style={{ display: "flex" }}>
					<Box mr={1}>
						<Button
						style={{ background: '#fff', color: '#000000'}}

							onClick={() => {
								navigate(
									"/manage-event"
								);
							}}
							color="warning"
							variant="contained"
						>
							Back
						</Button>
					</Box>
					<Box mr={1}>
						<Button
							onClick={() => {
								navigate(
									"/Registration",
									{
										state: {
											Event_Reg_Id: EventData._id,
											Switcher: 1,
										},
									}
								);
							}}
							style={{ background: '#fbe400', color: '#000000'}}
							color="secondary"
							variant="contained"
						>
							Register
						</Button>
					</Box>
				</div>
				<div>
					<Button
						onClick={() => {
							navigate(
								"/attendance",
								{
									state: {
										Event_id: EventData._id,
										Switcher: 1,
									},
								}
							);
						}}

						style={{ background: '#fbe400', color: '#000000'}}

						color="secondary"
						variant="contained"
					>
						Attendance
					</Button>
				</div>
			</Box>
			<Box display="flex" alignItems="center" mb="20px">
				<Modal
					open={open1}
					onClose={handleClose1}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<div style={{ float: "left" }}>
							<img
								height="100px"
								width="100px"
								src="../../assets/user.png"
								alt="User Image"
							/>
						</div>
						<div
							style={{
								marginLeft: "150px",
							}}
						>
							<h2>
								{
									individual.name
								}
							</h2>
							<p>
								<b>Name:</b>{" "}
								{
									individual.name
								}
							</p>
							<p>
								<b>
									Mobile
									No:
								</b>{" "}
								{
									individual.mobNo
								}
							</p>
							<p>
								<b>
									Adhar
									Card No:
								</b>{" "}
								{
									individual.adharCard
								}
							</p>
							<p>
								<b>Gender:</b>{" "}
								{
									individual.gender
								}
							</p>
							<p>
								<b>
									Community:
								</b>{" "}
								{
									individual.community
								}
							</p>
							<p>
								<b>
									Date of
									Birth:
								</b>{" "}
								{
									individual.dateOfBirth
								}
							</p>

							<p>
								<b>Income:</b>{" "}
								{
									individual.income
								}
							</p>

							<p>
								<b>
									Education:
								</b>{" "}
								{
									individual.education
								}
							</p>

							<p>
								<b>
									Family
									ID:
								</b>{" "}
								{
									individual.familyId
								}
							</p>
							{individual &&
								individual.medicalHistory && (
									<p>
										<b>
											Medical
											History:
										</b>{" "}
										{individual
											.medicalHistory
											.length >
										0
											? "Yes"
											: "No"}
									</p>
								)}

							<p>
								<b>
									Employment
									Status:
								</b>{" "}
								{
									individual.employmentStatus
								}
							</p>
							<p>
								<b>
									Previous
									Employer:
								</b>{" "}
								{
									individual.previousEmployer
								}
							</p>
						</div>
					</Box>
				</Modal>

				<Paper
					elevation={10}
					style={{
						width: "100%",
						marginTop: "20px",
					}}
				>
					<Typography
						variant="h3"
						gutterBottom
						style={{
							padding: "20px 20px 0 20px",
							fontSize: "20px",
						}}
					>
						Event Details
						<hr />
					</Typography>
					<div>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>Name:</b>{" "}
							{
								EventData.nameOfActivity
							}
						</Typography>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>Desciption:</b>{" "}
							{EventData.description}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent:
								"space-between",
						}}
					>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								width: "50%",
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>Start Date:</b>{" "}
							{EventData.startDate && formatDate(EventData.startDate)}
						</Typography>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								width: "50%",
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>End Date:</b>{" "}
							{EventData.endDate && formatDate(EventData.endDate)}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent:
								"space-between",
						}}
					>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								width: "50%",
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>Venue:</b>{" "}
							{EventData.venue}
						</Typography>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								width: "50%",
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>Theme:</b>{" "}
							{EventData.theme}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent:
								"space-between",
						}}
					>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								width: "50%",
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>Start Time:</b>{" "}
							{EventData.startTime}
						</Typography>
						<Typography
							variant="h5"
							gutterBottom
							style={{
								width: "50%",
								padding: "2px 20px",
								fontSize: "20px",
							}}
						>
							<b>Duration:</b>{" "}
							{EventData.duration}hrs
						</Typography>
					</div>
				</Paper>
			</Box>
			<br></br>

			<Box
				style={{  width: '100%'}}

			>

			<Header
				title="Registered Community Members"
				subtitle="Members who registered for the Event"
				/>
			</Box>
			<Box
			
				m="40px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
						font: "15px",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .name-column--cell": {
						color: colors.greenAccent[300],
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor:
							colors.blueAccent[700],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: "#FFFFFF",
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor:
							colors.blueAccent[700],
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
				<DataGrid
					//   checkboxSelection
					getRowId={(row) => row._id}
					rows={UserData}
					columns={columns1}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
				<Box
					display="flex"
					alignItems="center"
					pb="40px"
				>
					<Modal
						open={open2}
						onClose={handleClose2}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<div
								style={{
									float: "left",
								}}
							>
								<img
									height="100px"
									width="100px"
									src="../../assets/user.png"
									alt="Staff Image"
								/>
							</div>
							<div
								style={{
									marginLeft: "150px",
								}}
							>
								<h2>
									{
										individual.name
									}
								</h2>
								<p>
									<b>
										Adhar
										Card
										No:
									</b>{" "}
									{
										individual.AdharCard_No
									}
								</p>
								<p>
									<b>
										Date
										of
										Birth:
									</b>{" "}
									{
										individual.Date_of_Birth
									}
								</p>
								<p>
									<b>
										Email:
									</b>{" "}
									{
										individual.email
									}
								</p>
								<p>
									<b>
										Mobile
										No:
									</b>{" "}
									{
										individual.mobile_no
									}
								</p>
								<p>
									<b>
										Role:
									</b>{" "}
									{
										individual.Role
									}
								</p>
								<p>
									<b>
										Experience:
									</b>{" "}
									{
										individual.Experience
									}
								</p>
								<p>
									<b>
										Assigned
										Community:
									</b>{" "}
									{
										individual.Assigned_Community
									}
								</p>
							</div>
						</Box>
					</Modal>
				</Box>

				<Box
					style={{  width: '100%'}}

				>

				<Header
					title="Assigned Staff"
					subtitle="Number of staff members"
					/>
					</Box>
				<Box
					
					m="40px 0 40px 0"
					height="75vh"
					sx={{
						"& .MuiDataGrid-root": {
							border: "none",
							font: "15px",
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
									"#FFFFFF",
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
					<DataGrid
						//   checkboxSelection
						getRowId={(row) => row._id}
						rows={StaffData}
						columns={columns2}
						components={{
							Toolbar: CustomToolbar,
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default EventDetails;
