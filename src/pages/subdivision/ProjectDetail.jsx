import React from 'react';
import { useParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { subdivisionProjects } from '../../dummydata/subdivisionData';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = subdivisionProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="mb-6 font-bold text-2xl">Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Project Review Details</h1>
        <StatusBadge status={project.status} />
      </div>

      {/* Developer Information */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Developer Information</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <p className="text-gray-500 text-sm">Developer Name</p>
            <p className="font-medium">{project.developerName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Project Name</p>
            <p className="font-medium">{project.projectName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium">{project.location}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Lot Area</p>
            <p className="font-medium">{project.lotArea}</p>
          </div>
        </div>
      </div>

      {/* Uploaded Plans */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Uploaded Plans</h2>
        </div>
        <div className="p-4">
          {project.details.plans.map((plan, index) => (
            <div key={index} className="flex justify-between items-center py-2 last:border-0 border-b">
              <div className="flex items-center">
                <span className="mr-2 text-blue-500">📄</span>
                <span>{plan.type}</span>
              </div>
              <button
                onClick={() => window.open(plan.url)}
                className="text-blue-600 hover:text-blue-800"
              >
                View Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Review Checklist */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Technical Review Checklist</h2>
        </div>
        <div className="p-4">
          {Object.entries(project.details.technicalReview).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-2 last:border-0 border-b">
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <StatusBadge status={value} />
            </div>
          ))}
        </div>
      </div>

      {/* Review Notes */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Review Notes</h2>
        </div>
        <div className="p-4">
          {project.details.reviewNotes.map((note, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{note.reviewer}</span>
                <span className="text-gray-500 text-sm">{note.date}</span>
              </div>
              <p className="text-gray-700">{note.remarks}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
          Approve Project
        </button>
        <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white">
          Request Revision
        </button>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white">
          Reject Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
