import React from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/common/SummaryCard';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { infrastructureProjects, projectStats } from '../../dummydata/infrastructureData';

const InfrastructureDashboard = () => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', header: 'Project ID' },
    { field: 'projectName', header: 'Project Name' },
    { field: 'agency', header: 'Agency' },
    { field: 'location', header: 'Location' },
    { field: 'startDate', header: 'Start Date' },
    { field: 'endDate', header: 'End Date' },
    {
      field: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      field: 'actions',
      header: 'Actions',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/infrastructure/project/${row.id}`);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          View Details
        </button>
      )
    }
  ];

  // Get current month's projects
  const currentMonthProjects = infrastructureProjects.filter(project => {
    const projectDate = new Date(project.startDate);
    const currentDate = new Date();
    return projectDate.getMonth() === currentDate.getMonth() &&
           projectDate.getFullYear() === currentDate.getFullYear();
  });

  return (
    <div className="p-6">
      <h1 className="mb-6 font-bold text-2xl">Infrastructure Project Coordination</h1>
      
      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <SummaryCard
          title="Ongoing Projects"
          value={projectStats.ongoing}
          icon="🏗️"
        />
        <SummaryCard
          title="Completed Projects"
          value={projectStats.completed}
          icon="✅"
        />
        <SummaryCard
          title="Delayed Projects"
          value={projectStats.delayed}
          icon="⚠️"
          trend={-1}
        />
        <SummaryCard
          title="Upcoming Projects"
          value={projectStats.upcoming}
          icon="📅"
        />
      </div>

      {/* Projects List */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Project List</h2>
          <button
            onClick={() => navigate('/infrastructure/new-project')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Add Project
          </button>
        </div>
        <DataTable
          columns={columns}
          data={infrastructureProjects}
          onRowClick={(row) => navigate(`/infrastructure/project/${row.id}`)}
        />
      </div>

      {/* Timeline/Calendar */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Project Timeline - This Month</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {currentMonthProjects.map((project) => (
              <div key={project.id} className="flex items-start space-x-4 pb-4 last:border-0 border-b">
                <div className="flex-shrink-0 w-16 text-gray-500 text-sm">
                  {new Date(project.startDate).toLocaleDateString('en-US', { 
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">{project.projectName}</h3>
                  <p className="text-gray-500 text-sm">{project.agency}</p>
                  <div className="mt-1">
                    <StatusBadge status={project.status} />
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => navigate(`/infrastructure/project/${project.id}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureDashboard;
