import React from 'react';
import { useParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { infrastructureProjects } from '../../dummydata/infrastructureData';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = infrastructureProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="mb-6 font-bold text-2xl">Project Not Found</h1>
      </div>
    );
  }

  const calculateProgress = (timeline) => {
    const totalWeight = timeline.length;
    const completedWeight = timeline.reduce((acc, phase) => {
      return acc + (phase.complete / 100);
    }, 0);
    return Math.round((completedWeight / totalWeight) * 100);
  };

  const overallProgress = calculateProgress(project.details.timeline);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Project Details</h1>
        <StatusBadge status={project.status} />
      </div>

      {/* Project Information */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Project Information</h2>
        </div>
        <div className="gap-4 grid grid-cols-2 p-4">
          <div>
            <p className="text-gray-500 text-sm">Project Name</p>
            <p className="font-medium">{project.projectName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Implementing Agency</p>
            <p className="font-medium">{project.agency}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium">{project.location}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Budget</p>
            <p className="font-medium">₱ {parseInt(project.details.budget).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Start Date</p>
            <p className="font-medium">{project.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">End Date</p>
            <p className="font-medium">{project.endDate}</p>
          </div>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Progress Tracking</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-sm">Overall Progress</span>
              <span className="font-medium text-sm">{overallProgress}%</span>
            </div>
            <div className="bg-gray-200 rounded-full w-full h-2.5">
              <div
                className="bg-blue-600 rounded-full h-2.5"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <div className="space-y-4 mt-6">
            {project.details.timeline.map((phase, index) => (
              <div key={index} className="pb-4 last:pb-0 last:border-0 border-b">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">{phase.phase}</span>
                  <span className="font-medium text-sm">{phase.complete}%</span>
                </div>
                <div className="bg-gray-200 rounded-full w-full h-2">
                  <div
                    className="bg-green-500 rounded-full h-2"
                    style={{ width: `${phase.complete}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* File Repository */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">File Repository</h2>
        </div>
        <div className="p-4">
          {project.details.files.map((file, index) => (
            <div key={index} className="flex justify-between items-center py-2 last:border-0 border-b">
              <div className="flex items-center">
                <span className="mr-2 text-blue-500">📄</span>
                <span>{file.name}</span>
              </div>
              <button
                onClick={() => window.open(file.url)}
                className="text-blue-600 hover:text-blue-800"
              >
                View File
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Project Updates */}
      <div className="bg-white shadow mb-6 rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Project Updates</h2>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
            Add Update
          </button>
        </div>
        <div className="p-4">
          {project.details.updates.map((update, index) => (
            <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 last:border-0 border-b">
              <div className="flex justify-between">
                <StatusBadge status={update.status} />
                <span className="text-gray-500 text-sm">{update.date}</span>
              </div>
              <p className="mt-2 text-sm">{update.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
          Update Progress
        </button>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
          Add Progress Report
        </button>
        <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white">
          Flag Issues
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
