import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataTable from '../../components/common/DataTable';
import { zoningApplications } from '../../dummydata/zoningData';
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

const ZoningReports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [status, setStatus] = useState('all');
  const [zoneType, setZoneType] = useState('all');

  // Prepare data for the zone category chart
  const zoneCategories = [...new Set(zoningApplications.map(app => app.details.landUseCategory))];
  const applicationsByZone = zoneCategories.map(category => ({
    category,
    count: zoningApplications.filter(app => app.details.landUseCategory === category).length
  }));

  const chartData = {
    labels: applicationsByZone.map(item => item.category),
    datasets: [
      {
        label: 'Applications by Zone Category',
        data: applicationsByZone.map(item => item.count),
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
        text: 'Applications by Zone Category',
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

  // Statistics table columns
  const columns = [
    { field: 'metric', header: 'Metric' },
    { field: 'value', header: 'Value' },
    { field: 'trend', header: 'Trend' },
  ];

  // Sample statistics data
  const statisticsData = [
    {
      metric: 'Total Applications',
      value: zoningApplications.length,
      trend: '+5% vs last month',
    },
    {
      metric: 'Average Processing Time',
      value: '5 days',
      trend: '-1 day vs last month',
    },
    {
      metric: 'Approval Rate',
      value: '85%',
      trend: '+2% vs last month',
    },
    {
      metric: 'Pending Applications',
      value: zoningApplications.filter(app => app.status === 'Pending').length,
      trend: 'No change',
    },
  ];

  const handleExport = (format) => {
    // Implementation for export functionality
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Zoning Reports & Analytics</h1>
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
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 p-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Zone Type
            </label>
            <select
              value={zoneType}
              onChange={(e) => setZoneType(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="all">All Zones</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Applications by Zone Category</h2>
        </div>
        <div className="p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Statistics Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Application Statistics</h2>
        </div>
        <DataTable
          columns={columns}
          data={statisticsData}
        />
      </div>
    </div>
  );
};

export default ZoningReports;
