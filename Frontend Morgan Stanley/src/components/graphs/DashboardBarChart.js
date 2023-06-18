import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

const DashboardBarChart = ({ Score, data }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette);
	
	const customData = data.map((item) =>({
		name: item.name,
		MPI_Score: item.MPIscore.length === 0 ? 1 : item.MPIscore[item.MPIscore.length - 1].score,
	}))
	console.log("custom", customData);

	return (
		<ResponsiveBar
			data={customData}
			theme={{
				// added
				axis: {
					domain: {
						line: {
							stroke: colors
								.grey[100],
						},
					},
					legend: {
						text: {
							fill: colors.grey[100],
						},
					},
					ticks: {
						line: {
							stroke: colors
								.grey[100],
							strokeWidth: 1,
						},
						text: {
							fill: colors.grey[100],
						},
					},
				},
				legends: {
					text: {
						fill: colors.grey[100],
					},
				},
			}}
			keys={[
				"MPI_Score"
			]}
			indexBy="name"
			margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
			padding={0.3}
			valueScale={{ type: "linear" }}
			indexScale={{ type: "band", round: true }}
			colors={['#f47560']}
			defs={[
				{
					id: 'dots',
					type: 'patternDots',
					background: 'inherit',
					color: '#38bcb2',
					size: 4,
					padding: 1,
					stagger: true
				},
				{
					id: 'lines',
					type: 'patternLines',
					background: 'inherit',
					color: 'rgba(255, 255, 255, 0.3)',
					rotation: -45,
					lineWidth: 6,
					spacing: 10
				},
			]}
			fill={[
				{
					match: {
						id: 'MPI_Score'
					},
					id: 'lines'
				},
			]}
			borderColor={{
				from: "color",
				modifiers: [["darker", "1.6"]],
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "MPI Score", // changed
				legendPosition: "middle",
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Community Name", // changed
				legendPosition: "middle",
				legendOffset: -80,
			}}
			enableLabel={false}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: "color",
				modifiers: [["darker", 1.6]],
			}}
			layout='horizontal'
			legends={[
				{
					dataFrom: "keys",
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: "left-to-right",
					itemOpacity: 0.85,
					symbolSize: 20,
					effects: [
						{
							on: "hover",
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
			role="application"
			barAriaLabel={function (e) {
				return (
					e.id +
					": " +
					e.formattedValue +
					" in name: " +
					e.indexValue
				);
			}}
		/>
	);
};

export default DashboardBarChart;
