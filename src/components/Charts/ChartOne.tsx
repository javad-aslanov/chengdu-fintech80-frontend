// ChartOne.jsx
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    // Fetch or generate data specific to the driver's incident history
    const data = {
      series: [
        {
          name: 'Incidents',
          data: [1, 0, 2, 1, 1, 3, 2, 0, 1, 2, 0, 3], // Example data
        },
      ],
      options: {
        chart: {
          type: 'area',
          height: 350,
          fontFamily: 'Satoshi, sans-serif',
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
            color: '#623CEA14',
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
          },
        },
        colors: ['#3C50E0'],
        stroke: {
          width: 2,
          curve: 'smooth',
        },
        xaxis: {
          type: 'category',
          categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ],
        },
        yaxis: {
          title: {
            text: 'Number of Incidents',
          },
        },
        title: {
          text: 'Monthly Incident History for Driver',
          align: 'left',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
      },
    };

    setSeries(data.series);
    setOptions(data.options);
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default ChartOne;
