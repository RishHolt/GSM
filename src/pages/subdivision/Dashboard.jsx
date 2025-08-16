import React from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/common/SummaryCard';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { subdivisionProjects, reviewStats } from '../../dummydata/subdivisionData';

const SubdivisionDashboard = () => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', header: 'Project ID' },
    { field: 'developerName', header: 'Developer' },
    { field: 'projectName', header: 'Project Name' },
    { field: 'lotArea', header: 'Lot Area' },
    { field: 'location', header: 'Location' },
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
            navigate(`/subdivision/project/${row.id}`);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          View Details
        </button>
      )
    }
  ];

  return (
    <div className="p-6">
      <h1 className="mb-6 font-bold text-2xl">Subdivision & Building Review</h1>
      
      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <SummaryCard
          title="Pending Reviews"
          value={reviewStats.pendingReviews}
          icon="📋"
        />
        <SummaryCard
          title="Approved Projects"
          value={reviewStats.approvedProjects}
          icon="✅"
        />
        <SummaryCard
          title="Under Revision"
          value={reviewStats.projectsUnderRevision}
          icon="🔄"
        />
      </div>

      {/* Project Review Table */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Project Reviews</h2>
          <button
            onClick={() => navigate('/subdivision/new-project')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            New Project
          </button>
        </div>
        <DataTable
          columns={columns}
          data={subdivisionProjects}
          onRowClick={(row) => navigate(`/subdivision/project/${row.id}`)}
        />
      </div>

      {/* Recent Submissions */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Recent Submissions</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            {subdivisionProjects.slice(0, 5).map((project) => (
              <li key={project.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex justify-center items-center bg-blue-100 rounded-full w-8 h-8">
                    🏗️
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">{project.projectName}</p>
                  <p className="text-gray-500 text-xs">
                    by {project.developerName} • {project.location}
                  </p>
                  <p className="mt-1 text-gray-500 text-xs">
                    Status: <StatusBadge status={project.status} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubdivisionDashboard;
