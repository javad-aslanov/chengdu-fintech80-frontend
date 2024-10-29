// ChartTwo.jsx
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartTwo = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    // Data specific to the driver's incident severity levels
    const data = {
      series: [
        {
          name: 'Minor',
          data: [15],
        },
        {
          name: 'Moderate',
          data: [8],
        },
        {
          name: 'Severe',
          data: [3],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 450, // Increased height for better visibility
          stacked: true,
          fontFamily: 'Satoshi, sans-serif',
          toolbar: {
            show: false,
          },
        },
        colors: ['#3C50E0', '#80CAEE', '#F87171'],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 4,
            columnWidth: '45%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['Severity Levels'],
        },
        yaxis: {
          title: {
            text: 'Number of Incidents',
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
        fill: {
          opacity: 1,
        },
        title: {
          text: 'Incident Severity Levels for Driver',
          align: 'left',
        },
      },
    };

    setSeries(data.series);
    setOptions(data.options);
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <ReactApexChart options={options} series={series} type="bar" height={450} />
    </div>
  );
};

export default ChartTwo;
