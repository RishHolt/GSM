// ==================
// Current timestamp
// ==================
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const lastMonth = new Date(currentDate);
lastMonth.setMonth(currentDate.getMonth() - 1);

// ==================
// Application Status Types
// ==================
export const statusTypes = {
  PENDING: "Pending",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  REVISION_REQUIRED: "Revision Required",
};

// ==================
// Land Use Categories
// ==================
export const landUseCategories = [
  "Residential Zone",
  "Commercial Zone",
  "Industrial Zone",
  "Mixed-Use Zone",
  "Institutional Zone",
  "Agricultural Zone",
];

// ==================
// Zoning Applications
// ==================
export const zoningApplications = [
  {
    id: "ZC-2025-001",
    applicantName: "Juan Carlo Santos",
    projectType: "Commercial Building",
    location: "Bonifacio Global City, Taguig",
    dateSubmitted: "2025-08-15",
    status: statusTypes.PENDING,
    details: {
      contact: "+63 917 123 4567",
      address: "26th Street cor. 11th Avenue, BGC, Taguig City",
      lotSize: "500 sqm",
      landUseCategory: landUseCategories[1],
      files: [
        { name: "Site Development Plan.pdf", url: "/files/site-plan.pdf" },
        { name: "Barangay Clearance.pdf", url: "/files/barangay-clearance.pdf" },
        { name: "Land Title.pdf", url: "/files/title.pdf" },
      ],
      timeline: [
        { date: "2025-08-15", status: statusTypes.PENDING, remarks: "Initial submission" },
        { date: "2025-08-16", status: statusTypes.UNDER_REVIEW, remarks: "Documents verified" },
      ],
    },
  },
  {
    id: "ZC-2025-002",
    applicantName: "Maria Christina Reyes",
    projectType: "Residential Building",
    location: "Katipunan Avenue, Quezon City",
    dateSubmitted: "2025-08-10",
    status: statusTypes.UNDER_REVIEW,
    details: {
      contact: "+63 915 567 8901",
      address: "123 Katipunan Avenue, Loyola Heights, Quezon City",
      lotSize: "300 sqm",
      landUseCategory: landUseCategories[0],
      files: [
        { name: "Building Plans.pdf", url: "/files/building-plans.pdf" },
        { name: "Vicinity Map.pdf", url: "/files/vicinity-map.pdf" },
      ],
      timeline: [
        { date: "2025-08-10", status: statusTypes.PENDING, remarks: "Complete requirements" },
        { date: "2025-08-12", status: statusTypes.UNDER_REVIEW, remarks: "Technical review ongoing" },
      ],
    },
  },
  {
    id: "ZC-2025-003",
    applicantName: "Ramon dela Cruz",
    projectType: "Mixed-Use Development",
    location: "Ortigas Center, Pasig",
    dateSubmitted: "2025-08-05",
    status: statusTypes.APPROVED,
    details: {
      contact: "+63 918 234 5678",
      address: "Emerald Avenue, Ortigas Center, Pasig City",
      lotSize: "1200 sqm",
      landUseCategory: landUseCategories[3],
      files: [
        { name: "Master Plan.pdf", url: "/files/master-plan.pdf" },
        { name: "Environmental Compliance.pdf", url: "/files/env-compliance.pdf" },
      ],
      timeline: [
        { date: "2025-08-05", status: statusTypes.PENDING, remarks: "Complete documents" },
        { date: "2025-08-07", status: statusTypes.UNDER_REVIEW, remarks: "Technical evaluation" },
        { date: "2025-08-15", status: statusTypes.APPROVED, remarks: "All requirements met" },
      ],
    },
  },
  {
    id: "ZC-2025-004",
    applicantName: "Angeles Construction Corp.",
    projectType: "Industrial Facility",
    location: "Laguna Technopark",
    dateSubmitted: "2025-07-25",
    status: statusTypes.REVISION_REQUIRED,
    details: {
      contact: "+63 927 890 1234",
      address: "Laguna Technopark, Biñan, Laguna",
      lotSize: "2500 sqm",
      landUseCategory: landUseCategories[2],
      files: [
        { name: "Industrial Plans.pdf", url: "/files/industrial-plans.pdf" },
        { name: "PEZA Requirements.pdf", url: "/files/peza-docs.pdf" },
      ],
      timeline: [
        { date: "2025-07-25", status: statusTypes.PENDING, remarks: "Initial submission" },
        { date: "2025-07-30", status: statusTypes.UNDER_REVIEW, remarks: "Technical review" },
        { date: "2025-08-10", status: statusTypes.REVISION_REQUIRED, remarks: "Environmental compliance updates needed" },
      ],
    },
  },
  {
    id: "ZC-2025-005",
    applicantName: "SM Development Corporation",
    projectType: "Shopping Mall",
    location: "Commonwealth, Quezon City",
    dateSubmitted: "2025-08-01",
    status: statusTypes.UNDER_REVIEW,
    details: {
      contact: "+63 919 345 6789",
      address: "Commonwealth Avenue, Quezon City",
      lotSize: "15000 sqm",
      landUseCategory: landUseCategories[1],
      files: [
        { name: "Mall Complex Plans.pdf", url: "/files/mall-plans.pdf" },
        { name: "Traffic Impact Study.pdf", url: "/files/traffic-study.pdf" },
      ],
      timeline: [
        { date: "2025-08-01", status: statusTypes.PENDING, remarks: "Complete submission" },
        { date: "2025-08-03", status: statusTypes.UNDER_REVIEW, remarks: "Initial assessment" },
        { date: "2025-08-12", status: statusTypes.UNDER_REVIEW, remarks: "Traffic study evaluation" },
      ],
    },
  },
];

// ==================
// Zoning Statistics
// ==================
export const zoningStatistics = {
  pendingApplications: zoningApplications.filter(app => app.status === statusTypes.PENDING).length,
  approvedClearances: zoningApplications.filter(app => app.status === statusTypes.APPROVED).length,
  rejectedApplications: zoningApplications.filter(app => app.status === statusTypes.REJECTED).length,
  revisionRequired: zoningApplications.filter(app => app.status === statusTypes.REVISION_REQUIRED).length,
  underReview: zoningApplications.filter(app => app.status === statusTypes.UNDER_REVIEW).length,
  averageProcessingTime: "7 days",
  totalApplications: zoningApplications.length,
  monthlyApplications: zoningApplications.filter(app => new Date(app.dateSubmitted) > lastMonth).length,
};

// ==================
// Recent Activities
// ==================
export const recentActivities = [
  {
    id: 1,
    action: "Application Approved",
    applicationId: "ZC-2025-003",
    date: currentDate.toISOString().split("T")[0],
    user: "Engr. De Guzman",
    details: "Final approval granted",
  },
  {
    id: 2,
    action: "Revision Requested",
    applicationId: "ZC-2025-004",
    date: currentDate.toISOString().split("T")[0],
    user: "Arch. Mendoza",
    details: "Environmental compliance documents needed",
  },
  {
    id: 3,
    action: "New Application",
    applicationId: "ZC-2025-001",
    date: "2025-08-15",
    user: "Front Desk Officer",
    details: "Application received with complete requirements",
  },
  {
    id: 4,
    action: "Technical Review",
    applicationId: "ZC-2025-005",
    date: "2025-08-12",
    user: "Engr. Santos",
    details: "Traffic impact study under evaluation",
  },
  {
    id: 5,
    action: "Document Verification",
    applicationId: "ZC-2025-002",
    date: "2025-08-12",
    user: "Records Section",
    details: "All submitted documents verified",
  },
];
