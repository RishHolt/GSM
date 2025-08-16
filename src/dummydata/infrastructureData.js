export const infrastructureProjects = [
  {
    id: "INF-2025-001",
    projectName: "Main Road Expansion",
    agency: "Public Works Department",
    location: "North District",
    startDate: "2025-06-01",
    endDate: "2025-12-31",
    status: "Ongoing",
    details: {
      budget: "50000000",
      timeline: [
        { phase: "Planning", complete: 100 },
        { phase: "Procurement", complete: 100 },
        { phase: "Construction", complete: 45 },
        { phase: "Quality Assurance", complete: 0 }
      ],
      files: [
        { name: "Project Proposal", url: "/files/proposal.pdf" },
        { name: "MOA", url: "/files/moa.pdf" },
        { name: "Budget Document", url: "/files/budget.pdf" }
      ],
      updates: [
        {
          date: "2025-08-15",
          status: "On Track",
          details: "Phase 2 construction commenced"
        }
      ]
    }
  },
  // More projects...
];

export const projectStats = {
  ongoing: 12,
  completed: 25,
  delayed: 3,
  upcoming: 5
};

export const projectTimeline = [
  {
    month: "August 2025",
    projects: [
      { id: "INF-2025-001", milestone: "Phase 2 Start" },
      { id: "INF-2025-002", milestone: "Project Completion" }
    ]
  },
  // More timeline data...
];
