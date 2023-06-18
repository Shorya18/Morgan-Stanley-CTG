import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

const MpiVsFamilyBarChart = ({ data }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette);
	console.log(data);
	return (
		<ResponsiveBar
			data={data}
			// layout='horizontal'
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
				"MPI_score"
			]}
			indexBy="familyId"
			margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
			padding={0.3}
			valueScale={{ type: "linear" }}
			indexScale={{ type: "band", round: true }}
			colors={['#f1e15b']}
			colorBy="index"
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
					color: '#fbe400',
					rotation: -45,
					lineWidth: 6,
					spacing: 10
				},
			]}
			fill={[
				{
					match: {
						id: 'MPI_score'
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
				legend: "Family Ids", // changed
				legendPosition: "middle",
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "MPI Score", // changed
				legendPosition: "middle",
				legendOffset: -40,
			}}
			enableLabel={false}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: "color",
				modifiers: [["darker", 1.6]],
			}}
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
					" in familyId: " +
					e.indexValue
				);
			}}
		/>
	);
};

export default MpiVsFamilyBarChart;
