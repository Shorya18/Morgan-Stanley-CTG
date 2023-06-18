import { Box, Typography, useTheme, Button } from "@mui/material";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Invoices = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette);
	const columns = [
		{ field: "id", headerName: "ID" },
		{
			field: "Program Name",
			headerName: "Program Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "Number of people",
			headerName: "Number of people",
			flex: 1,
			renderCell: (params) => (
				<Typography color={colors.greenAccent[500]}>
					${params.row.cost}
				</Typography>
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
			<Box display="flex" alignItems="center" mb="20px"
			style={{ }}
			>
				<Header
					title="Manage Programs"
					subtitle="Number of programs running"
				/>
				<Box
					ml="auto"
					display="flex"
					alignItems="center"
					
				>
					<Box mr={1}>
						<Button
							type="submit"
							color="secondary"
							variant="contained"
						>
							Add Program
						</Button>
					</Box>
					<Box>
						<Button
							type="submit"
							color="negative"
							variant="contained"
						>
							Delete Program
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
						backgroundColor:
							colors.primary[400],
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
					checkboxSelection
					rows={mockDataInvoices}
					columns={columns}
					components={{
						Toolbar: CustomToolbar,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Invoices;
