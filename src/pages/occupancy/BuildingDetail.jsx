import React from 'react';
import { useParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { occupancyData } from '../../dummydata/occupancyData';

const BuildingDetail = () => {
  const { id } = useParams();
  const building = occupancyData.find(b => b.id === id);

  if (!building) {
    return (
      <div className="p-6">
        <h1 className="mb-6 font-bold text-2xl">Building Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Building Details</h1>
        <StatusBadge status={building.status} />
      </div>

      {/* Building Information */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Building Information</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <p className="text-gray-500 text-sm">Building Name</p>
            <p className="font-medium">{building.buildingName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Owner</p>
            <p className="font-medium">{building.owner}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium">{building.address}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Occupancy Permit No.</p>
            <p className="font-medium">{building.permitNo}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Building Type</p>
            <p className="font-medium">{building.details.type}</p>
          </div>
        </div>
      </div>

      {/* Occupancy Data */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Occupancy Data</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 p-4">
          <div>
            <p className="text-gray-500 text-sm">Total Units</p>
            <p className="font-medium">{building.details.units}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Occupied Units</p>
            <p className="font-medium">{building.details.occupiedUnits}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Resident Families</p>
            <p className="font-medium">{building.details.families}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Business Units</p>
            <p className="font-medium">{building.details.businesses}</p>
          </div>
        </div>
      </div>

      {/* Inspection History */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Inspection History</h2>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
            Schedule Inspection
          </button>
        </div>
        <div className="p-4">
          {building.details.inspections.map((inspection, index) => (
            <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 last:border-0 border-b">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">Inspector: {inspection.inspector}</p>
                  <p className="text-gray-500 text-sm">Date: {inspection.date}</p>
                </div>
                <StatusBadge status={inspection.findings.includes('compliant') ? 'Compliant' : 'Non-Compliant'} />
              </div>
              <p className="mt-2 text-gray-700 text-sm">Findings: {inspection.findings}</p>
              {inspection.remarks && (
                <p className="mt-1 text-gray-500 text-sm">Remarks: {inspection.remarks}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
          Update Occupancy Data
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
          Renew Permit
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">
          Mark Non-Compliant
        </button>
      </div>
    </div>
  );
};

export default BuildingDetail;
