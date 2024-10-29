// IncidentDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
  AiOutlineSafetyCertificate,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import ReactApexChart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';

const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // For demonstration, using static data; replace with dynamic data as needed
  const incident = {
    id,
    name: 'High-Speed Collision',
    date: '2024-10-20 05:12 AM',
    location: 'Highway 5, Palo Alto, CA',
    status: 'Under Investigation',
    severity: 'High',
    damageCost: '$25,000',
    details:
      'The incident involved a collision at high speed with another vehicle, resulting in significant damage. Preliminary analysis suggests potential speeding and violation of traffic signals.',
    vehicleType: 'Autonomous Sedan Model X',
    weather: 'Clear skies, good visibility',
    roadConditions: 'Dry, low traffic',
    contributingFactors: [
      'Speeding (75 mph in a 55 mph zone)',
      'Ignored red traffic light',
      'Driver distraction detected',
    ],
    potentialLiability: 'Customer at Fault',
    policeReportFiled: true,
    coordinates: { lat: 37.4419, lng: -122.1430 }, // Palo Alto coordinates
  };

  // Chart data and options specific to the incident
  const [speedProfileSeries, setSpeedProfileSeries] = useState([]);
  const [speedProfileOptions, setSpeedProfileOptions] = useState({});

  const [locationIncidentSeries, setLocationIncidentSeries] = useState([]);
  const [locationIncidentOptions, setLocationIncidentOptions] = useState({});

  const [contributingFactorsSeries, setContributingFactorsSeries] = useState([]);
  const [contributingFactorsOptions, setContributingFactorsOptions] = useState(
    {}
  );

  useEffect(() => {
    // Chart One: Speed Profile Leading to Incident
    const speedData = {
      series: [
        {
          name: 'Speed (mph)',
          data: [55, 60, 65, 70, 75, 80, 75, 70, 65, 60, 55], // Example speed data leading up to the incident
        },
      ],
      options: {
        chart: {
          type: 'line',
          height: 350,
          fontFamily: 'Satoshi, sans-serif',
          toolbar: {
            show: false,
          },
        },
        colors: ['#F87171'],
        stroke: {
          width: 2,
          curve: 'smooth',
        },
        xaxis: {
          categories: [
            '-10 min',
            '-9 min',
            '-8 min',
            '-7 min',
            '-6 min',
            '-5 min',
            '-4 min',
            '-3 min',
            '-2 min',
            '-1 min',
            'Incident Time',
          ],
          title: {
            text: 'Time Before Incident',
          },
        },
        yaxis: {
          title: {
            text: 'Speed (mph)',
          },
        },
        title: {
          text: 'Speed Profile Leading to Incident',
          align: 'left',
        },
      },
    };

    setSpeedProfileSeries(speedData.series);
    setSpeedProfileOptions(speedData.options);

    // Chart Two: Incident Frequency at Location
    const locationData = {
      series: [
        {
          name: 'Number of Incidents',
          data: [5, 7, 6, 9, 12, 15, 13, 10, 8, 6, 4, 5], // Example data over months
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          fontFamily: 'Satoshi, sans-serif',
          toolbar: {
            show: false,
          },
        },
        colors: ['#3C50E0'],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 4,
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          title: {
            text: 'Month',
          },
        },
        yaxis: {
          title: {
            text: 'Number of Incidents',
          },
        },
        title: {
          text: 'Incident Frequency at Location (Past Year)',
          align: 'left',
        },
      },
    };

    setLocationIncidentSeries(locationData.series);
    setLocationIncidentOptions(locationData.options);

    // Chart Three: Contributing Factors Distribution
    const factorsData = {
      series: [50, 30, 20], // Example percentages
      options: {
        chart: {
          type: 'pie',
          height: 350,
          fontFamily: 'Satoshi, sans-serif',
        },
        labels: ['Speeding', 'Signal Violation', 'Driver Distraction'],
        colors: ['#F87171', '#3C50E0', '#FBBF24'],
        legend: {
          position: 'bottom',
          fontSize: '14px',
        },
        title: {
          text: 'Contributing Factors Distribution',
          align: 'center',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val.toFixed(1)}%`,
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

    setContributingFactorsSeries(factorsData.series);
    setContributingFactorsOptions(factorsData.options);
  }, []);

  return (
    <>
      {/* Page Title and Back Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Incident Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <AiOutlineExclamationCircle className="text-red-500" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Damage Cost</p>
              <p className="text-xl font-semibold">{incident.damageCost}</p>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <AiOutlineInfoCircle className="text-orange-500" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Severity Level</p>
              <p className="text-xl font-semibold">{incident.severity}</p>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <AiOutlineClockCircle className="text-blue-500" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-xl font-semibold">{incident.status}</p>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center">
            <AiOutlineSafetyCertificate className="text-purple-500" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Liability</p>
              <p className="text-xl font-semibold">
                {incident.potentialLiability}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
        {/* Incident Overview */}
        <div className="col-span-12 lg:col-span-8">
          <div
            className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-xl font-semibold mb-4">{incident.name}</h2>
            <p>
              <strong>Date & Time:</strong> {incident.date}
            </p>
            <p>
              <strong>Location:</strong> {incident.location}
            </p>
            <p>
              <strong>Status:</strong> {incident.status}
            </p>
            <p>
              <strong>Severity:</strong> {incident.severity}
            </p>
            <p>
              <strong>Damage Cost:</strong> {incident.damageCost}
            </p>
            <p>
              <strong>Vehicle Type:</strong> {incident.vehicleType}
            </p>
            <p>
              <strong>Weather Conditions:</strong> {incident.weather}
            </p>
            <p>
              <strong>Road Conditions:</strong> {incident.roadConditions}
            </p>
            <p className="mt-4">
              <strong>Incident Details:</strong> {incident.details}
            </p>
            <p className="mt-4">
              <strong>Contributing Factors:</strong>
            </p>
            <ul className="list-disc list-inside">
              {incident.contributingFactors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
            <p className="mt-4">
              <strong>Potential Liability:</strong> {incident.potentialLiability}
            </p>
            <p>
              <strong>Police Report Filed:</strong>{' '}
              {incident.policeReportFiled ? 'Yes' : 'No'}
            </p>
          </div>

          {/* Charts Specific to the Incident */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Chart One: Speed Profile Leading to Incident */}
            <div
              className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <ReactApexChart
                options={speedProfileOptions}
                series={speedProfileSeries}
                type="line"
                height={350}
              />
            </div>

            {/* Chart Two: Incident Frequency at Location */}
            <div
              className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <ReactApexChart
                options={locationIncidentOptions}
                series={locationIncidentSeries}
                type="bar"
                height={350}
              />
            </div>
          </div>

          {/* Chart Three: Contributing Factors Distribution */}

        </div>

        {/* Map and Additional Info */}
        <div className="col-span-12 lg:col-span-4">
          {/* Map Display */}
          <div
            className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h3 className="text-lg font-semibold mb-2">Incident Location</h3>
            <MapContainer
              center={[incident.coordinates.lat, incident.coordinates.lng]}
              zoom={14}
              style={{ height: '425px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[incident.coordinates.lat, incident.coordinates.lng]}
              >
                <Popup>{incident.location}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentDetails;
