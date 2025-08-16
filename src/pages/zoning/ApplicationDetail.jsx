import React from 'react';
import { useParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { zoningApplications } from '../../dummydata/zoningData';

const ApplicationDetail = () => {
  const params = useParams();
  const path = window.location.pathname;
  
  console.log('Current path:', path); // Add this to debug
  
  // Handle new application case
  if (path.includes('/applications/new')) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl">New Application</h1>
        </div>

        {/* Application Form */}
        <form className="bg-white shadow mb-6 p-6 rounded-lg">
          <div className="gap-6 grid grid-cols-2">
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Applicant Name
              </label>
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                placeholder="Enter applicant name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Contact Number
              </label>
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                placeholder="Enter contact number"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Address
              </label>
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Project Type
              </label>
              <select className="p-2 border rounded-md w-full">
                <option value="">Select project type</option>
                <option value="residential">Residential Building</option>
                <option value="commercial">Commercial Building</option>
                <option value="industrial">Industrial Facility</option>
                <option value="mixed-use">Mixed-Use Development</option>
                <option value="institutional">Institutional</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Lot Size (sqm)
              </label>
              <input
                type="number"
                className="p-2 border rounded-md w-full"
                placeholder="Enter lot size"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Land Use Category
              </label>
              <select className="p-2 border rounded-md w-full">
                <option value="">Select category</option>
                <option value="residential">Residential Zone</option>
                <option value="commercial">Commercial Zone</option>
                <option value="industrial">Industrial Zone</option>
                <option value="mixed-use">Mixed-Use Zone</option>
                <option value="institutional">Institutional Zone</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Location
              </label>
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Upload Documents
            </label>
            <div className="flex justify-center mt-1 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto w-12 h-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-gray-600 text-sm">
                  <label className="relative bg-white rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" multiple />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-gray-500 text-xs">
                  PDF, DOC up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    );
  }

  const application = zoningApplications.find(app => app.id === id);

  if (!application) {
    return (
      <div className="p-6">
        <h1 className="mb-6 font-bold text-2xl">Application Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Application Details</h1>
        <StatusBadge status={application.status} />
      </div>

      {/* Applicant Information */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Applicant Information</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium">{application.applicantName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Contact</p>
            <p className="font-medium">{application.details.contact}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium">{application.details.address}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Project Details</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <p className="text-gray-500 text-sm">Project Type</p>
            <p className="font-medium">{application.projectType}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Lot Size</p>
            <p className="font-medium">{application.details.lotSize}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Land Use Category</p>
            <p className="font-medium">{application.details.landUseCategory}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium">{application.location}</p>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Uploaded Files</h2>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            {application.details.files.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="mr-2 text-blue-500">📎</span>
                  {file.name}
                </span>
                <button
                  onClick={() => window.open(file.url)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Compliance Checklist</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <label className="ml-2">Zoning Classification Compliance</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <label className="ml-2">Building Height Restrictions</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <label className="ml-2">Setback Requirements</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <label className="ml-2">Parking Requirements</label>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
          Approve Application
        </button>
        <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white">
          Request Revision
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">
          Reject Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetail;
