import React from 'react';
import Plot from 'react-plotly.js';

const LineGraph = ({data}) => {
  // Sample data
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
    // data

console.log(transformedData);

    console.log("line", transformedData);
  // Layout configuration
  const layout = {
    title: 'MPI TREND',
    xaxis: {
      title: 'Date',
    },
    yaxis: {
      title: 'MPI Value',
      zeroline: true,
    },
  };

  return <Plot data={transformedData} layout={layout} style={{width:"500px"}}/>;
};

export default LineGraph;
