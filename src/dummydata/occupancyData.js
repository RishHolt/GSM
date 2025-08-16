export const occupancyData = [
  {
    id: "OCC-2025-001",
    buildingName: "Crystal Tower",
    owner: "Pacific Properties",
    address: "789 Business District",
    permitNo: "OP-2025-123",
    status: "Occupied",
    details: {
      type: "Commercial",
      units: 50,
      occupiedUnits: 45,
      families: 0,
      businesses: 40,
      inspections: [
        {
          date: "2025-07-15",
          inspector: "Sarah Lee",
          findings: "All compliant",
          remarks: "Annual inspection passed"
        }
      ]
    }
  },
  // More buildings...
];

export const occupancyStats = {
  totalOccupied: 150,
  vacant: 30,
  inspected: 175,
  nonCompliant: 5
};

export const complianceRate = [
  { month: "Jan", rate: 95 },
  { month: "Feb", rate: 96 },
  // More data...
];
