import React from 'react';
import { useParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { beneficiaries } from '../../dummydata/housingData';

const BeneficiaryDetail = () => {
  const { id } = useParams();
  const beneficiary = beneficiaries.find(b => b.id === id);

  if (!beneficiary) {
    return (
      <div className="p-6">
        <h1 className="mb-6 font-bold text-2xl">Beneficiary Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Beneficiary Details</h1>
        <StatusBadge status={beneficiary.status} />
      </div>

      {/* Personal Information */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Personal Information</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium">{beneficiary.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Age</p>
            <p className="font-medium">{beneficiary.details.age}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium">{beneficiary.address}</p>
          </div>
        </div>
      </div>

      {/* Household Members */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Household Members</h2>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left">Name</th>
                <th className="pb-2 text-left">Relation</th>
                <th className="pb-2 text-left">Age</th>
              </tr>
            </thead>
            <tbody>
              {beneficiary.details.householdMembers.map((member, index) => (
                <tr key={index} className="last:border-0 border-b">
                  <td className="py-2">{member.name}</td>
                  <td className="py-2">{member.relation}</td>
                  <td className="py-2">{member.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Socio-Economic Information */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Socio-Economic Information</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <p className="text-gray-500 text-sm">Income Level</p>
            <p className="font-medium">{beneficiary.details.socioEconomic.incomeLevel}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Employment Status</p>
            <p className="font-medium">{beneficiary.details.socioEconomic.employmentStatus}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Monthly Income</p>
            <p className="font-medium">₱ {beneficiary.details.socioEconomic.monthlyIncome}</p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Documents</h2>
        </div>
        <div className="p-4">
          {beneficiary.details.documents.map((doc, index) => (
            <div key={index} className="flex justify-between items-center py-2 last:border-0 border-b">
              <div className="flex items-center">
                <span className="mr-2 text-blue-500">📄</span>
                <span>{doc.type}</span>
              </div>
              <StatusBadge status={doc.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
          Verify Beneficiary
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
          Update Information
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">
          Remove from Registry
        </button>
      </div>
    </div>
  );
};

export default BeneficiaryDetail;
