import { Box, useTheme, Button, Snackbar, Alert, AlertTitle } from "@mui/material";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

const ManageCommunity = () => {
  const [communityData, setCommunityData] = useState([]);
  const navigate = useNavigate();

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


  const getCOmmunityDetails = () => {
    axios
    .get("http://localhost:4421/details-Community")
    .then((response) => {
      const data = response.data;
      setCommunityData(data);
    })
    .catch((error) => {
      console.error("Failed to retrieve Community data:", error);
    });
  }

  const onDeleteCommunity = (params) => {
    console.log(params);
    const data = {
      id: params.id
    };

    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "http://localhost:4421/delete-Community",
      data,
    })
      .then((res) => {
        console.log(res);
        if(res.data == "Community Does Not Exist"){
          setAlertType('error');
          setAlertMsg("There was some issue in processing your request. Please try again later.");
        }else{
          getCOmmunityDetails();
          setAlertType('success');
          setAlertMsg("Community deleted successully!");
        }

        // navigate("/team");
      })
      .catch((err) => {
        setAlertType('error');
        setAlertMsg("There was some issue in processing your request. Please try again later.");
       
        console.log(err);
      });
  };


  useEffect(() => {
    getCOmmunityDetails();
  }, []);

	const theme = useTheme();
	const colors = tokens(theme.palette);
	const columns = [
		{
			field: "name",
			headerName: "Name",
			flex: 0.5,
			cellClassName: "name-column--cell",
		},
		{
			field: "description",
			headerName: "Description",
			type: "String",
			headerAlign: "left",
			align: "left",
			flex: 1,
		},
		{
			field: "startDate",
			headerName: "Start Date",
			flex: 1,
			renderCell: (params) =>
				params.row.startDate.split("T")[0],
		},
		,
		{
			field: "actions",
			headerName: "See More Details",
			flex: 1,
			renderCell: (params) => (
				<Button
					onClick={() => {
						navigate(
							"/community-families",
							{
								state: {
									communityData:
										params
											.row
											.name,
									familyId: params
										.row
										.familyId,
								},
							}
						);
					}}
					variant="outlined"
					color="primary"
				>
					View Families
				</Button>
			),
		},
		{
			field: "deleteCommunity",
			headerName: "Delete Community",
			flex: 1,
			renderCell: (params) => (
				<Button
				color="negative"
				  variant="contained"
				  style={{ background: red[700], color: "#fff"}}
				  onClick={() => {
				    console.log("delete");
            		onDeleteCommunity(params);

				  }}
				>
					DELETE

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
					title="Manage Community"
					subtitle="Number of Community"
				/>
				<Box
					ml="auto"
					display="flex"
					alignItems="center"
				>
					<Box mr={1}>
						<Button
							onClick={() => {
								navigate(
									"/add-Community"
								);
							}}
							color="secondary"
							variant="contained"
							style={{ background: '#fbe400', color: '#000000' , width: '10rem', fontWeight: 'bold' }}

						>
							Add Community
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
					rows={communityData}
					columns={columns}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</Box>
		</Box>
	);
};

export default ManageCommunity;
