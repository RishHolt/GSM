import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataTable from '../../components/common/DataTable';
import { subdivisionProjects, projectsByStatus } from '../../dummydata/subdivisionData';
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

const SubdivisionReports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [developerFilter, setDeveloperFilter] = useState('all');

  const chartData = {
    labels: projectsByStatus.map(item => item.status),
    datasets: [
      {
        label: 'Projects by Status',
        data: projectsByStatus.map(item => item.count),
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
        text: 'Projects by Status',
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

  // Project Statistics Table
  const columns = [
    { field: 'developerName', header: 'Developer' },
    { field: 'totalProjects', header: 'Total Projects' },
    { field: 'approved', header: 'Approved' },
    { field: 'pending', header: 'Pending' },
    { field: 'rejected', header: 'Rejected' }
  ];

  // Calculate statistics by developer
  const developerStats = Object.values(subdivisionProjects.reduce((acc, project) => {
    if (!acc[project.developerName]) {
      acc[project.developerName] = {
        developerName: project.developerName,
        totalProjects: 0,
        approved: 0,
        pending: 0,
        rejected: 0
      };
    }
    
    acc[project.developerName].totalProjects++;
    if (project.status === 'Approved') acc[project.developerName].approved++;
    if (project.status === 'Under Review') acc[project.developerName].pending++;
    if (project.status === 'Rejected') acc[project.developerName].rejected++;
    
    return acc;
  }, {}));

  const handleExport = (format) => {
    // Implementation for export functionality
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Subdivision Project Reports</h1>
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
              Developer
            </label>
            <select
              value={developerFilter}
              onChange={(e) => setDeveloperFilter(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="all">All Developers</option>
              {developerStats.map(stat => (
                <option key={stat.developerName} value={stat.developerName}>
                  {stat.developerName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Projects by Status</h2>
        </div>
        <div className="p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Statistics Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Projects by Developer</h2>
        </div>
        <DataTable
          columns={columns}
          data={developerStats}
        />
      </div>
    </div>
  );
};

export default SubdivisionReports;
