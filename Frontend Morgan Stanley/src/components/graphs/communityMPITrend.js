import React from 'react';
import Plot from 'react-plotly.js';

const LineGraph = ({data}) => {
  // Sample data
//   const data = [
//     {
//       familyId: "8076794410",
          // x: [1, 2],
          // y: [0.4444444444444444, 0.666]
//     },
//   ];
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const transformedData = data.map(item => {
  const x = item.x.map(dateString => {
    const monthIndex = parseInt(dateString.split("-")[1]) - 1;
    const monthName = monthNames[monthIndex];
    return monthName;
  });

  return { ...item, x };
});
    console.log("line", transformedData);
  // Layout configuration
  const layout = {
    title: 'MPI TREND',
    xaxis: {
      title: 'Months',
    },
    yaxis: {
      title: 'MPI Value',
    //   zeroline: false,
    },
  };

  return <Plot data={transformedData} layout={layout} style={{width:"320px", height: "300px"}}/>;
};

export default LineGraph;
