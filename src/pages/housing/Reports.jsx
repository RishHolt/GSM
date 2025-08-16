import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataTable from '../../components/common/DataTable';
import { beneficiaries, beneficiaryByBarangay } from '../../dummydata/housingData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HousingReports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [verificationStatus, setVerificationStatus] = useState('all');

  const chartData = {
    labels: beneficiaryByBarangay.map(item => item.barangay),
    datasets: [
      {
        label: 'Beneficiaries by Barangay',
        data: beneficiaryByBarangay.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Beneficiaries by Barangay',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Table for Verified vs Pending
  const verificationColumns = [
    { field: 'status', header: 'Status' },
    { field: 'count', header: 'Count' },
    { field: 'percentage', header: 'Percentage' }
  ];

  const totalBeneficiaries = beneficiaries.length;
  const verifiedCount = beneficiaries.filter(b => b.status === 'Verified').length;
  const pendingCount = beneficiaries.filter(b => b.status === 'Pending').length;

  const verificationData = [
    {
      status: 'Verified',
      count: verifiedCount,
      percentage: `${((verifiedCount / totalBeneficiaries) * 100).toFixed(1)}%`
    },
    {
      status: 'Pending',
      count: pendingCount,
      percentage: `${((pendingCount / totalBeneficiaries) * 100).toFixed(1)}%`
    }
  ];

  const handleExport = (format) => {
    // Implementation for export functionality
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Housing Reports</h1>
        <div className="space-x-2">
          <button
            onClick={() => handleExport('pdf')}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Export PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Filters</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="last180">Last 180 Days</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Verification Status
            </label>
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending Verification</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Beneficiaries by Barangay</h2>
        </div>
        <div className="p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Verification Status Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Verification Status</h2>
        </div>
        <DataTable
          columns={verificationColumns}
          data={verificationData}
        />
      </div>
    </div>
  );
};

export default HousingReports;
