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

const ManageUser = () => {
	const [UserData, setUserData] = useState([]);
	const [individual, setIndividual] = useState([]);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
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

	const navigate = useNavigate();
	useEffect(() => {
		axios.get("http://localhost:4421/get-userdetails")
			.then((response) => {
				const data = response.data;
				setUserData(data);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve staff data:",
					error
				);
			});
	}, []);

	useEffect(() => {
		console.log(UserData);
	}, [UserData]);

	const theme = useTheme();
	const colors = tokens(theme.palette);

	const columns = [
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
						// setIndividual(params.row);
						// handleOpen();

						navigate(`/member-info`, {
							state: {
								adharcard: params
									.row
									.adharCard,
								communityData:
									params
										.row
										.community,
								familyId: params
									.row
									.familyId,
							},
						});
					}}
				>
					View
				</Button>
			),
		},
	];

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

				<Box
					style={{  width: '100%'}}
				>

				<Header
					title="Manage Members"
					subtitle="Member Details"
					/>
				</Box>
				{/* <Box ml="auto" display="flex" alignItems="center">
          <Box mr={1}>
            <Button
              onClick={() => {
                navigate("/add-user");
              }}
              color="secondary"
              variant="contained"
            >
              Add Member
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => {
                navigate("/delete-user");
              }}
              type="submit"
              color="negative"
              variant="contained"
            >
              Delete Member
            </Button>
          </Box>
        </Box> */}
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
					columns={columns}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</Box>
		</Box>
	);
};

export default ManageUser;
