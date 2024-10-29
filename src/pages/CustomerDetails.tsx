// CustomerDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  AiOutlineCar,
  AiOutlineWarning,
  AiOutlineDollarCircle,
  AiOutlineCalendar,
} from 'react-icons/ai';
import ReactApexChart from 'react-apexcharts';
import CardDataStats from '../components/CardDataStats';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // For demonstration, using static data; replace with dynamic data as needed
  const customer = {
    id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    policyNumber: 'POL123456',
    policyStatus: 'Active',
    riskLevel: 'High Risk',
    riskScorePercentile: 90, // Percentile of risk score in comparison to other users
    claimHistory: 'No Claims',
    signupDate: '2024-10-25',
    premium: '$1,200',
    policyExpiry: '2025-10-25',
    drivingPatterns: {
      averageSpeed: '45 mph',
      totalMiles: '12,000 miles/year',
      highRiskEvents: 2,
    },
    incidents: [
      {
        id: 'INC001',
        name: 'Minor Collision',
        date: '2024-08-15',
        status: 'Resolved',
        impactOnPremium: '$50 increase',
        riskIncrease: 10, // Risk score increase in %
      },
      {
        id: 'INC002',
        name: 'Speeding Violation',
        date: '2024-05-20',
        status: 'Penalty Paid',
        impactOnPremium: '$30 increase',
        riskIncrease: 5, // Risk score increase in %
      },
    ],
  };

  const [premiumHistorySeries, setPremiumHistorySeries] = useState([]);
  const [premiumHistoryOptions, setPremiumHistoryOptions] = useState({});
  const [riskScoreSeries, setRiskScoreSeries] = useState([]);
  const [riskScoreOptions, setRiskScoreOptions] = useState({});
  const [riskPercentileSeries, setRiskPercentileSeries] = useState([]);
  const [riskPercentileOptions, setRiskPercentileOptions] = useState({});

  useEffect(() => {
    // Chart 1: Premium Over Time (Reflecting Incidents)
    const premiumHistoryData = {
      series: [
        {
          name: 'Premium',
          data: [1100, 1150, 1200], // Premium history data (premium increases after incidents)
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
        stroke: {
          width: 2,
          curve: 'smooth',
        },
        markers: {
          size: 5,
          colors: ['#F87171'], // Highlight incident points on the graph
        },
        xaxis: {
          categories: ['2024-05', '2024-08', '2024-10'], // Dates of premium changes and incidents
          title: {
            text: 'Date',
          },
        },
        yaxis: {
          title: {
            text: 'Premium ($)',
          },
        },
        annotations: {
          points: [
            {
              x: '2024-08',
              y: 1150,
              marker: {
                size: 6,
                fillColor: '#FF4560',
              },
              label: {
                text: 'Minor Collision',
                borderColor: '#FF4560',
                style: {
                  color: '#fff',
                  background: '#FF4560',
                },
              },
            },
            {
              x: '2024-05',
              y: 1100,
              marker: {
                size: 6,
                fillColor: '#00E396',
              },
              label: {
                text: 'Speeding Violation',
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
              },
            },
          ],
        },
        title: {
          text: 'Premium Changes Over Time (Reflecting Incidents)',
          align: 'left',
        },
      },
    };

    setPremiumHistorySeries(premiumHistoryData.series);
    setPremiumHistoryOptions(premiumHistoryData.options);

    // Chart 2: Risk Score Over Time (Reflecting Incidents)
    const riskScoreData = {
      series: [
        {
          name: 'Risk Score',
          data: [70, 88, 90], // Updated data with more points
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
        stroke: {
          width: 2,
          curve: 'smooth', // Smooth the curve for a better visual representation
        },
        markers: {
          size: 4, // Adjust the size of markers
          colors: ['#F87171'],
          hover: {
            size: 6,
          },
        },
        xaxis: {
          categories: ['2024-05', '2024-08', '2024-10'], // Updated to show more periods
          title: {
            text: 'Date',
          },
        },
        yaxis: {
          min: 60, // Adjusted to provide some padding below the minimum value
          max: 100, // Adjusted to provide some padding above the maximum value
          title: {
            text: 'Risk Score',
          },
        },
        annotations: {
          points: [
            {
              x: '2024-08',
              y: 88,
              marker: {
                size: 6,
                fillColor: '#FF4560',
              },
              label: {
                text: 'Minor Collision',
                borderColor: '#FF4560',
                style: {
                  color: '#fff',
                  background: '#FF4560',
                },
              },
            },
            {
              x: '2024-05',
              y: 70,
              marker: {
                size: 6,
                fillColor: '#00E396',
              },
              label: {
                text: 'Speeding Violation',
                borderColor: '#00E396',
                style: {
                  color: '#fff',
                  background: '#00E396',
                },
              },
            },
          ],
        },
        title: {
          text: 'Risk Score Changes Over Time (Reflecting Incidents)',
          align: 'left',
        },
      },
    };
    setRiskScoreSeries(riskScoreData.series);
    setRiskScoreOptions(riskScoreData.options);

    // Chart 3: Risk Score Distribution (John Doe’s Position)
    const percentileData = {
      series: [
        {
          name: 'Number of Users',
          data: [10, 20, 40, 15, 10, 5], // Example data representing the distribution of users
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
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: false,
          },
        },
        xaxis: {
          categories: ['0-20', '20-40', '40-60', '60-80', '80-90', '90-100'], // Risk score ranges
          title: {
            text: 'Risk Score Ranges',
          },
        },
        yaxis: {
          title: {
            text: 'Number of Users',
          },
        },
        annotations: {
          points: [
            {
              x: '90-100',
              y: 5, // Example value indicating where John Doe is in the distribution
              marker: {
                size: 6,
                fillColor: '#FF4560',
              },
              label: {
                text: 'John Doe',
                borderColor: '#FF4560',
                style: {
                  color: '#fff',
                  background: '#FF4560',
                },
              },
            },
          ],
        },
        colors: ['#00E396'],
        title: {
          text: 'Risk Score Distribution (John Doe’s Position)',
          align: 'left',
        },
      },
    };

    setRiskPercentileSeries(percentileData.series);
    setRiskPercentileOptions(percentileData.options);
  }, []);

  return (
    <>
      {/* Page Title and Back Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Customer Details</h1>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

      {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats
            title="Policy Number"
            total={customer.policyNumber}
            rate={customer.policyStatus}
          >
            <AiOutlineCar className="text-blue-500" size={24} />
          </CardDataStats>
          <CardDataStats
            title="Risk Level"
            total={customer.riskLevel}
            rate="Assessment"
          >
            <AiOutlineWarning className="text-orange-500" size={24} />
          </CardDataStats>
          <CardDataStats
            title="Premium"
            total={customer.premium}
            rate="Annual"
          >
            <AiOutlineDollarCircle className="text-green-500" size={24} />
          </CardDataStats>
          <CardDataStats
            title="Policy Expiry"
            total={customer.policyExpiry}
            rate="Renewal Date"
          >
            <AiOutlineCalendar className="text-red-500" size={24} />
          </CardDataStats>
        </div>

      {/* Incidents Table */}
        <div
          className="mt-6 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-xl font-semibold mb-4">Incidents</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Incident Name</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
              <th className="p-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Impact on Premium
              </th>
              <th className="p-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Risk Score Change
              </th>
            </tr>
            </thead>
            <tbody>
            {customer.incidents.map((incident) => (
              <tr key={incident.id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="p-2">
                  <Link to={`/incident-details`} className="text-blue-500 hover:underline">
                    {incident.name}
                  </Link>
                </td>
                <td className="p-2">{incident.date}</td>
                <td className="p-2">
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                incident.status === 'Resolved'
                  ? 'bg-green-100 text-green-800'
                  : incident.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {incident.status}
            </span>
                </td>
                <td className="p-2">
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                incident.impactOnPremium.includes('increase')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {incident.impactOnPremium.includes('increase') ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {incident.impactOnPremium}
            </span>
                </td>
                <td className="p-2">
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                incident.riskIncrease > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}
            >
              {incident.riskIncrease > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {incident.riskIncrease > 0 ? `+${incident.riskIncrease}%` : `${incident.riskIncrease}%`}
            </span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      {/* Main Content */}
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
          {/* Risk Score Over Time */}
          <div className="col-span-12 lg:col-span-8">
            <div
              className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <ReactApexChart
                options={riskScoreOptions}
                series={riskScoreSeries}
                type="line"
                height={350}
              />
            </div>

            {/* Chart: Premium Over Time */}
            <div
              className="mt-6 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <ReactApexChart
                options={premiumHistoryOptions}
                series={premiumHistorySeries}
                type="line"
                height={350}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="col-span-12 lg:col-span-4">
            {/* Risk Score Distribution */}
            <div
              className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="text-lg font-semibold mb-2">Risk Score Distribution</h3>
              <p className={"mb-4"}>
                John Doe's risk score falls within the <strong>{customer.riskScorePercentile}th</strong> percentile of
                all users.
              </p>
              {/* Chart: Risk Score Distribution */}
              <ReactApexChart
                options={riskPercentileOptions}
                series={riskPercentileSeries}
                type="bar"
                height={350}
              />
            </div>

            {/* Personal Information */}
            <div
              className="mt-6 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <p>
                <strong>Name:</strong> {customer.name}
              </p>
              <p>
                <strong>Email:</strong> {customer.email}
              </p>
              <p>
                <strong>Phone:</strong> {customer.phone}
              </p>
              <p>
                <strong>Address:</strong> {customer.address}
              </p>
              <p>
                <strong>Signup Date:</strong> {customer.signupDate}
              </p>
            </div>

            {/* Policy Details */}
            <div
              className="mt-6 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="text-lg font-semibold mb-2">Policy Details</h3>
              <p>
                <strong>Policy Status:</strong> {customer.policyStatus}
              </p>
              <p>
                <strong>Policy Expiry:</strong> {customer.policyExpiry}
              </p>
              <p>
                <strong>Premium:</strong> {customer.premium} per year
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default CustomerDetails;
