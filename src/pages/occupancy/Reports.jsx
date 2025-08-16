import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataTable from '../../components/common/DataTable';
import { occupancyData, occupancyStats, complianceRate } from '../../dummydata/occupancyData';
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

const OccupancyReports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [buildingType, setBuildingType] = useState('all');

  const chartData = {
    labels: complianceRate.map(item => item.month),
    datasets: [
      {
        label: 'Occupancy Compliance Rate (%)',
        data: complianceRate.map(item => item.rate),
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
        text: 'Monthly Occupancy Compliance Rate',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
  };

  // Calculate permit status
  const permitStatus = occupancyData.reduce((acc, building) => {
    const status = building.status === 'Active' ? 'Active' : 'Expired';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const columns = [
    { field: 'status', header: 'Permit Status' },
    { field: 'count', header: 'Number of Buildings' },
    { field: 'percentage', header: 'Percentage' }
  ];

  const totalBuildings = occupancyData.length;
  const tableData = Object.entries(permitStatus).map(([status, count]) => ({
    status,
    count,
    percentage: `${((count / totalBuildings) * 100).toFixed(1)}%`
  }));

  const handleExport = (format) => {
    // Implementation for export functionality
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Occupancy Reports</h1>
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
              Building Type
            </label>
            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="all">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="mixed">Mixed Use</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Rate Chart */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Compliance Rate Trend</h2>
        </div>
        <div className="p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Permit Status Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Occupancy Permit Status</h2>
        </div>
        <DataTable
          columns={columns}
          data={tableData}
        />
      </div>
    </div>
  );
};

export default OccupancyReports;
