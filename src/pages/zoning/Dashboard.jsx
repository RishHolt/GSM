import React from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/common/SummaryCard';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { zoningApplications, zoningStatistics, recentActivities } from '../../dummydata/zoningData';

const ZoningDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState(zoningStatistics);

  // Update statistics every 30 seconds
  React.useEffect(() => {
    const updateStats = () => {
      const currentDate = new Date();
      const lastMonth = new Date(currentDate);
      lastMonth.setMonth(currentDate.getMonth() - 1);

      const newStats = {
        pendingApplications: zoningApplications.filter(app => app.status === "Pending").length,
        approvedClearances: zoningApplications.filter(app => app.status === "Approved").length,
        rejectedApplications: zoningApplications.filter(app => app.status === "Rejected").length,
        revisionRequired: zoningApplications.filter(app => app.status === "Revision Required").length,
        underReview: zoningApplications.filter(app => app.status === "Under Review").length,
        averageProcessingTime: "7 days",
        totalApplications: zoningApplications.length,
        monthlyApplications: zoningApplications.filter(app => 
          new Date(app.dateSubmitted) > lastMonth
        ).length
      };
      setStats(newStats);
    };

    // Update immediately and then every 30 seconds
    updateStats();
    const interval = setInterval(updateStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { field: 'id', header: 'Application ID' },
    { field: 'applicantName', header: 'Applicant Name' },
    { field: 'projectType', header: 'Project Type' },
    { field: 'location', header: 'Location' },
    { field: 'dateSubmitted', header: 'Date Submitted' },
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
            navigate(`/zoning/application/${row.id}`);
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
      <h1 className="mb-6 font-bold text-2xl">Zoning Clearance Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <SummaryCard
          title="Total Applications"
          value={stats.totalApplications}
          icon="�"
          trend={`${stats.monthlyApplications} this month`}
          trendDirection="up"
        />
        <SummaryCard
          title="In Progress"
          value={stats.pendingApplications + stats.underReview}
          icon="�"
          trend="Needs Processing"
          trendDirection="neutral"
        />
        <SummaryCard
          title="Approved"
          value={stats.approvedClearances}
          icon="✅"
          trend={((stats.approvedClearances / stats.totalApplications) * 100).toFixed(0) + '% Success'}
          trendDirection="up"
        />
        <SummaryCard
          title="Needs Revision"
          value={stats.revisionRequired}
          icon="⚠️"
          trend="Requires Updates"
          trendDirection="down"
        />
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Applications</h2>
        </div>
        <DataTable
          columns={columns}
          data={zoningApplications}
          onRowClick={(row) => navigate(`/zoning/application/${row.id}`)}
        />
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Recent Activity</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex justify-center items-center bg-blue-100 rounded-full w-8 h-8">
                    🔔
                  </div>
                </div>
                <div>
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs">
                    Application {activity.applicationId} • {activity.date}
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

export default ZoningDashboard;
