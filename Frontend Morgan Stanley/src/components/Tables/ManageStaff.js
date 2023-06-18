import React from "react";
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Team = () => {
	const [staffData, setStaffData] = useState([]);
	const [individual, setIndividual] = useState([]);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 600,
		bgcolor: "background.paper",
		border: "1px solid #000",
		boxShadow: 24,
		borderRadius: "12px",
		p: 4,
	};

	const navigate = useNavigate();
	useEffect(() => {
		axios.get("http://localhost:4421/details-staff")
			.then((response) => {
				const staff = response.data;
				setStaffData(staff);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve staff data:",
					error
				);
			});
	}, []);

	useEffect(() => {
		console.log(staffData);
	}, [staffData]);

	const theme = useTheme();
	const colors = tokens(theme.palette);
	const columns = [
		{ field: "_id", headerName: "ID" },
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
			field: "Flag",
			headerName: "Is Active",
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
						handleOpen();
					}}
				>
					View
				</Button>
			),
		},
	];

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	}

	return (
		<Box m="20px">
			<Box display="flex" alignItems="center" mb="20px">
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<div style={{ float: "left" }}>
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
									Card No:
								</b>{" "}
								{
									individual.AdharCard_No
								}
							</p>
							<p>
								<b>
									Date of
									Birth:
								</b>{" "}
								{
									individual.Date_of_Birth
								}
							</p>
							<p>
								<b>Email:</b>{" "}
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
								<b>Role:</b>{" "}
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

				<Box
					style={{  width: '100%'}}

				>

				<Header
					title="Manage Staff"
					subtitle="Number of staff members"
					/>
					</Box>
				<Box
				
					ml="auto"
					display="flex"
					alignItems="center"
				>
					<Box mr={1}>
						<Button
							onClick={() => {
								navigate(
									"/add-staff"
								);
							}}
							color="secondary"
							variant="contained"
							style={{ background: '#fbe400', color: '#000000' , width: '8rem', fontWeight: 'bold' }}
						>
							Add Staff
						</Button>
					</Box>
					<Box>
						<Button
							onClick={() => {
								navigate(
									"/delete-staff"
								);
							}}
							type="submit"
							color="negative"
							variant="contained"
							style={{ background: '#fff', color: '#000' , width: '8rem', fontWeight: 'bold' }}

						>
							Delete Staff
						</Button>
					</Box>
				</Box>
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
					rows={staffData}
					columns={columns}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Team;
