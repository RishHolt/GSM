import React from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/common/SummaryCard';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { occupancyData, occupancyStats } from '../../dummydata/occupancyData';

const OccupancyDashboard = () => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', header: 'Building ID' },
    { field: 'buildingName', header: 'Building Name' },
    { field: 'owner', header: 'Owner' },
    { field: 'address', header: 'Address' },
    { field: 'permitNo', header: 'Permit No.' },
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
            navigate(`/occupancy/building/${row.id}`);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          View Details
        </button>
      )
    }
  ];

  // Filter buildings with non-compliant status or expired permits
  const alerts = occupancyData.filter(building => 
    building.status === 'Non-Compliant' || 
    building.status === 'Permit Expired'
  );

  return (
    <div className="p-6">
      <h1 className="mb-6 font-bold text-2xl">Occupancy Monitoring Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <SummaryCard
          title="Total Occupied Buildings"
          value={occupancyStats.totalOccupied}
          icon="🏢"
        />
        <SummaryCard
          title="Vacant Buildings"
          value={occupancyStats.vacant}
          icon="🏗️"
        />
        <SummaryCard
          title="Inspected This Month"
          value={occupancyStats.inspected}
          icon="✅"
        />
        <SummaryCard
          title="Non-Compliant"
          value={occupancyStats.nonCompliant}
          icon="⚠️"
          trend={-2}
        />
      </div>

      {/* Monitoring Table */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Building Monitoring</h2>
        </div>
        <DataTable
          columns={columns}
          data={occupancyData}
          onRowClick={(row) => navigate(`/occupancy/building/${row.id}`)}
        />
      </div>

      {/* Alerts Panel */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Alerts</h2>
        </div>
        <div className="p-4">
          {alerts.length === 0 ? (
            <p className="text-gray-500">No active alerts</p>
          ) : (
            <ul className="space-y-4">
              {alerts.map((building) => (
                <li key={building.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex justify-center items-center bg-red-100 rounded-full w-8 h-8 text-red-600">
                      ⚠️
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{building.buildingName}</p>
                    <p className="text-gray-500 text-xs">
                      {building.status} • Permit No: {building.permitNo}
                    </p>
                    <button
                      onClick={() => navigate(`/occupancy/building/${building.id}`)}
                      className="mt-1 text-blue-600 hover:text-blue-800 text-xs"
                    >
                      View Details →
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OccupancyDashboard;
