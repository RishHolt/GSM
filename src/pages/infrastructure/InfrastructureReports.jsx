import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { infrastructureProjects } from '../../dummydata/infrastructureData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InfrastructureReports = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filterProjects = () => {
    return infrastructureProjects.filter(project => {
      const projectYear = new Date(project.startDate).getFullYear();
      const projectQuarter = Math.floor((new Date(project.startDate).getMonth() + 3) / 3);
      
      const yearMatch = selectedYear === 'All' || projectYear === selectedYear;
      const quarterMatch = selectedQuarter === 'All' || projectQuarter === parseInt(selectedQuarter);
      const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;

      return yearMatch && quarterMatch && statusMatch;
    });
  };

  const calculateMetrics = () => {
    const filteredProjects = filterProjects();
    
    return {
      totalProjects: filteredProjects.length,
      totalBudget: filteredProjects.reduce((acc, curr) => acc + parseFloat(curr.details.budget), 0),
      onTrack: filteredProjects.filter(p => p.status === 'On Track').length,
      delayed: filteredProjects.filter(p => p.status === 'Delayed').length,
      completed: filteredProjects.filter(p => p.status === 'Completed').length,
    };
  };

  const metrics = calculateMetrics();

  const chartData = {
    labels: ['Roads', 'Bridges', 'Public Buildings', 'Drainage', 'Others'],
    datasets: [
      {
        label: 'Budget Allocation',
        data: filterProjects().reduce((acc, project) => {
          const category = project.details.category;
          acc[category] = (acc[category] || 0) + parseFloat(project.details.budget);
          return acc;
        }, {}),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
        text: 'Budget Allocation by Project Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Budget (₱)',
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 font-bold text-2xl">Infrastructure Reports</h1>

      {/* Filters */}
      <div className="bg-white shadow mb-6 p-4 rounded-lg">
        <div className="gap-4 grid grid-cols-3">
          <div>
            <label className="block font-medium text-gray-700 text-sm">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
              className="block shadow-sm mt-1 border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 w-full"
            >
              <option value="All">All Years</option>
              {[2023, 2022, 2021].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">Quarter</label>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="block shadow-sm mt-1 border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 w-full"
            >
              <option value="All">All Quarters</option>
              {[1, 2, 3, 4].map(quarter => (
                <option key={quarter} value={quarter}>Q{quarter}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block shadow-sm mt-1 border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 w-full"
            >
              <option value="All">All Status</option>
              <option value="On Track">On Track</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-4 mb-6">
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 text-lg">Total Projects</h3>
          <p className="mt-2 font-bold text-blue-600 text-3xl">{metrics.totalProjects}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 text-lg">Total Budget</h3>
          <p className="mt-2 font-bold text-green-600 text-3xl">
            ₱ {metrics.totalBudget.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 text-lg">On Track</h3>
          <p className="mt-2 font-bold text-blue-600 text-3xl">{metrics.onTrack}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 text-lg">Delayed</h3>
          <p className="mt-2 font-bold text-red-600 text-3xl">{metrics.delayed}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="gap-6 grid grid-cols-2 mb-6">
        <div className="bg-white shadow p-4 rounded-lg">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h3 className="mb-4 font-medium text-lg">Project Status Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>On Track</span>
                <span>{Math.round((metrics.onTrack / metrics.totalProjects) * 100)}%</span>
              </div>
              <div className="bg-gray-200 rounded-full w-full h-2">
                <div
                  className="bg-green-600 rounded-full h-2"
                  style={{ width: `${(metrics.onTrack / metrics.totalProjects) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Delayed</span>
                <span>{Math.round((metrics.delayed / metrics.totalProjects) * 100)}%</span>
              </div>
              <div className="bg-gray-200 rounded-full w-full h-2">
                <div
                  className="bg-red-600 rounded-full h-2"
                  style={{ width: `${(metrics.delayed / metrics.totalProjects) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Completed</span>
                <span>{Math.round((metrics.completed / metrics.totalProjects) * 100)}%</span>
              </div>
              <div className="bg-gray-200 rounded-full w-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${(metrics.completed / metrics.totalProjects) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Project List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="divide-y divide-gray-200 min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterProjects().map((project, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 text-sm">{project.projectName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500 text-sm">{project.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500 text-sm">
                      ₱ {parseInt(project.details.budget).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="bg-gray-200 rounded-full w-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{ width: `${project.details.progress}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureReports;
