import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parse, isAfter, subDays } from 'date-fns';

const initialCustomerData = [
  {
    id: 'C001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    policyNumber: 'POL123456',
    policyStatus: 'Active',
    riskLevel: 'Low Risk',
    claimHistory: 'No Claims',
    signupDate: '2024-10-25', // Date within last 7 days
  },
  {
    id: 'C002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    address: '456 Elm St, Othertown, USA',
    policyNumber: 'POL654321',
    policyStatus: 'Lapsed',
    riskLevel: 'High Risk',
    claimHistory: '2 Claims',
    signupDate: '2024-10-20', // Date within last 7 days
  },
  {
    id: 'C003',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '(555) 555-5555',
    address: '789 Oak St, Sometown, USA',
    policyNumber: 'POL789012',
    policyStatus: 'Pending',
    riskLevel: 'Medium Risk',
    claimHistory: '1 Claim',
    signupDate: '2024-09-28', // Date within last 30 days
  },
  // Add more customer data as needed
];

const parseDate = (dateString) => {
  return parse(dateString, 'yyyy-MM-dd', new Date());
};

const sortedCustomerData = initialCustomerData.sort((a, b) => {
  return parseDate(b.signupDate) - parseDate(a.signupDate); // Sort in descending order
});

const getStatusColor = (riskLevel) => {
  switch (riskLevel) {
    case 'Low Risk':
      return 'text-green-500';
    case 'Medium Risk':
      return 'text-orange-500';
    case 'High Risk':
      return 'text-red-500';
    default:
      return 'text-black';
  }
};

const getPolicyStatusBadge = (policyStatus) => {
  switch (policyStatus) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Lapsed':
      return 'bg-red-100 text-red-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const filterData = (data, searchTerm, timeFilter) => {
  const now = new Date();
  const timeLimit =
    timeFilter === 'last 7 days'
      ? subDays(now, 7)
      : timeFilter === 'last 30 days'
        ? subDays(now, 30)
        : subDays(now, 365);

  return data.filter((customer) => {
    const customerSignupDate = parseDate(customer.signupDate);
    const searchMatch = searchTerm
      ? (
        customer.name +
        customer.email +
        customer.phone +
        customer.address +
        customer.policyNumber +
        customer.policyStatus +
        customer.riskLevel +
        customer.claimHistory
      )
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      : true;
    const timeMatch = isAfter(customerSignupDate, timeLimit);
    return searchMatch && timeMatch;
  });
};

const TableOne = () => {
  const [filteredData, setFilteredData] = useState(sortedCustomerData);
  const [searchTerm, setSearchTerm] = useState('');
  const [time, setTime] = useState('last 30 days');
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(filterData(sortedCustomerData, searchTerm, time));
  }, [searchTerm, time]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Customers
      </h4>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="last 7 days">Last 7 Days</option>
          <option value="last 30 days">Last 30 Days</option>
          <option value="last year">Last Year</option>
        </select>
      </div>

      <div className="flex flex-col mb-7">
        <div className="grid grid-cols-3 rounded-sm bg-gray-200 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Policy No.
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Risk Level
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Signup Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Policy Status
            </h5>
          </div>
        </div>

        {filteredData.map((customer, key) => (
          <div
            key={key}
            className={`grid grid-cols-3 sm:grid-cols-5 cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-700 ${
              key === filteredData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            onClick={() => navigate(`/customer-details`)}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{customer.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {customer.policyNumber}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className={`${getStatusColor(customer.riskLevel)}`}>
                {customer.riskLevel}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">
                {customer.signupDate}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPolicyStatusBadge(customer.policyStatus)}`}
              >
                {customer.policyStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
