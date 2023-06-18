import React from 'react';
import Plot from 'react-plotly.js';

const LineGraph = () => {
  // Sample data
  const data = [
    {
      x: [1, 2, 3, 4, 5],
      y: [1, 4, 9, 16, 25],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' },
    },
  ];

  // Layout configuration
  const layout = {
    title: 'MPI IMPROVEMENTS',
    xaxis: {
      title: 'Months',
    },
    yaxis: {
      title: 'MPI Value',
    },
  };

  return <Plot data={data} layout={layout} style={{width:"500px"}}/>;
};

export default LineGraph;
