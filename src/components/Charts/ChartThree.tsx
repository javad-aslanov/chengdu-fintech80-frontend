// ChartThree.jsx
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartThree = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    // Data specific to the driver's claim types
    const data = {
      series: [60, 25, 10, 5], // Example data for the driver's claim distribution
      options: {
        chart: {
          type: 'donut',
          height: 450, // Increased height for visibility
          fontFamily: 'Satoshi, sans-serif',
        },
        labels: ['Collision Claims', 'Mechanical Claims', 'Weather Damage', 'Other'],
        colors: ['#3C50E0', '#80CAEE', '#F87171', '#FBBF24'],
        legend: {
          position: 'bottom',
          fontSize: '14px',
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              background: 'transparent',
              labels: {
                show: true,
                name: {
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#333',
                },
                value: {
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#333',
                  formatter: (val) => `${val}%`,
                },
                total: {
                  show: true,
                  label: 'Total',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#333',
                  formatter: (w) =>
                    w.globals.seriesTotals.reduce((a, b) => a + b, 0) + '%',
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Driver’s Claim Types Distribution',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
          },
        },
        responsive: [
          {
            breakpoint: 640,
            options: {
              chart: {
                width: 300,
              },
            },
          },
        ],
      },
    };

    setSeries(data.series);
    setOptions(data.options);
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <ReactApexChart options={options} series={series} type="donut" height={450} />
    </div>
  );
};

export default ChartThree;
