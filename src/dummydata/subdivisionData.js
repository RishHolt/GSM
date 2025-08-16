export const subdivisionProjects = [
  {
    id: "SUB-2025-001",
    developerName: "Metro Developers Inc.",
    projectName: "Green Valley Subdivision",
    lotArea: "10000 sqm",
    location: "East District",
    status: "Under Review",
    details: {
      plans: [
        { type: "Subdivision Plan", url: "/files/subdivision-plan.pdf" },
        { type: "Building Plan", url: "/files/building-plan.pdf" },
        { type: "Drainage Plan", url: "/files/drainage-plan.pdf" }
      ],
      technicalReview: {
        zoning: "Compliant",
        roadWidth: "Pending Review",
        openSpace: "Compliant",
        drainage: "Under Review",
        safety: "Pending Review"
      },
      reviewNotes: [
        {
          date: "2025-08-16",
          reviewer: "Engr. Johnson",
          remarks: "Drainage plan needs revision"
        }
      ]
    }
  },
  // More projects...
];

export const reviewStats = {
  pendingReviews: 15,
  approvedProjects: 45,
  projectsUnderRevision: 8
};

export const projectsByStatus = [
  { status: "Pending", count: 15 },
  { status: "Approved", count: 45 },
  { status: "Under Revision", count: 8 }
];
