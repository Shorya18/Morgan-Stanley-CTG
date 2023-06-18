import React from "react";
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
  GridToolbarFilterButton
} from "@mui/x-data-grid";

const DeleteEvent = () => {
	const [EventData, setEventData] = useState([]);

	const navigate = useNavigate();
	useEffect(() => {
		axios.get("http://localhost:4421/details-event")
			.then((response) => {
				const Event = response.data;
				setEventData(Event);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve Event data:",
					error
				);
			});
	}, []);

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
			</GridToolbarContainer>
		);
	}

	useEffect(() => {
		console.log(EventData);
	}, [EventData]);

	const deleteEvent = (t) => {
		const data = {
			_id: t,
		};

		axios.post("http://localhost:4421/delete-Event", data)
			.then((response) => {
				console.log(response);
				navigate("/manage-event");
			})
			.catch((error) => {
				console.error("Failed to delete Event:", error);
			});
	};
	const theme = useTheme();
	const colors = tokens(theme.palette);
	const columns = [
		{
			field: "nameOfActivity",
			headerName: "Event Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "startDate",
			headerName: "Start Date",
			headerAlign: "left",
			align: "left",
			flex: 1,
			renderCell: (params) =>
				params.row.startDate.split("T")[0],
		},
		{
			field: "endDate",
			headerName: "End Date",
			flex: 1,
			renderCell: (params) =>
				params.row.endDate.split("T")[0],
		},
		{
			field: "startTime",
			headerName: "Start Time",
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
			field: "actions",
			headerName: "See More Details",
			flex: 1,
			renderCell: (params) => (
				<Button
					variant="outlined"
					color="primary"
					sx={{
						backgroundColor: "red",
						color: "white",
					}}
					onClick={() => {
						console.log(params.row._id);
						deleteEvent(params.row._id);
					}}
				>
					Cancel
				</Button>
			),
		},
	];

	return (
		<Box m="20px">
			<Box display="flex" alignItems="center" mb="20px"
			style={{ }}>
				<Header
					title="Manage Events"
					subtitle="All Event Details"
				/>
				<Box
					ml="auto"
					display="flex"
					alignItems="center"
				>
					{/* <Box mr={1}>
            <Button
              onClick={() => {
                navigate("/add-event");
              }}
              color="secondary"
              variant="contained"
            >
              Add Staff
            </Button>
          </Box> */}
					<Box>
						<Button
              style={{ background: '#fbe400', color: '#000000'}}

							onClick={() => {
								navigate(
									"/manage-event"
								);
							}}
							type="submit"
							color="negative"
							variant="contained"
						>
							Back
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
							'#83cfcd',
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: "#FFFFFF",
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor:
							'#83cfcd',
					},
					"& .MuiCheckbox-root": {
						color: `${colors.greenAccent[200]} !important`,
					},
				}}
			>
				<DataGrid
					//   checkboxSelection
					getRowId={(row) => row._id}
					rows={EventData}
					columns={columns}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</Box>
		</Box>
	);
};

export default DeleteEvent;
