import React from 'react';
import { LineChart } from 'grommet-controls/chartjs';

export default ({ data }) => (
  data && (
    <LineChart
      data={{ datasets: [data] }}
      options={{
          tooltips: {
            mode: 'index',
            intersect: true,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              display: true,
              type: 'time',
              time: {
                tooltipFormat: 'llll',
                unit: 'day',
                displayFormats: {
                  'day': 'll',
                },
              },
              ticks: {
                source: 'data',
                autoSkip: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'date',
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'close',
              },
            }],
          },
        }}
    />
  )
);
