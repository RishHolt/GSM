import React from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/common/SummaryCard';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { beneficiaries, beneficiaryStats } from '../../dummydata/housingData';

const HousingDashboard = () => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'familySize', header: 'Family Size' },
    { field: 'address', header: 'Current Address' },
    {
      field: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    { field: 'housingProject', header: 'Housing Project' },
    {
      field: 'actions',
      header: 'Actions',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/housing/beneficiary/${row.id}`);
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
      <h1 className="mb-6 font-bold text-2xl">Housing Beneficiary Registry</h1>
      
      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <SummaryCard
          title="Total Beneficiaries"
          value={beneficiaryStats.totalBeneficiaries}
          icon="👥"
        />
        <SummaryCard
          title="Verified Beneficiaries"
          value={beneficiaryStats.verified}
          icon="✅"
        />
        <SummaryCard
          title="Pending Verification"
          value={beneficiaryStats.pendingVerification}
          icon="⏳"
        />
        <SummaryCard
          title="Resettled Families"
          value={beneficiaryStats.resettledFamilies}
          icon="🏠"
        />
      </div>

      {/* Beneficiary List */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Beneficiary List</h2>
        </div>
        <DataTable
          columns={columns}
          data={beneficiaries}
          onRowClick={(row) => navigate(`/housing/beneficiary/${row.id}`)}
        />
      </div>

      {/* Recent Registrations */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Recent Registrations</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            {beneficiaries.slice(0, 5).map((beneficiary) => (
              <li key={beneficiary.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex justify-center items-center bg-blue-100 rounded-full w-8 h-8">
                    👤
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">{beneficiary.name}</p>
                  <p className="text-gray-500 text-xs">
                    Family Size: {beneficiary.familySize} • Status: {beneficiary.status}
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

export default HousingDashboard;
