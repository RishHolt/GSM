export const beneficiaries = [
  {
    id: "BEN-2025-001",
    name: "Maria Garcia",
    familySize: 4,
    address: "Block 1 Lot 5, Barangay 1",
    status: "Verified",
    housingProject: "Green Residences",
    details: {
      age: 35,
      householdMembers: [
        { name: "Juan Garcia", relation: "Spouse", age: 37 },
        { name: "Ana Garcia", relation: "Child", age: 10 }
      ],
      socioEconomic: {
        incomeLevel: "Low Income",
        employmentStatus: "Employed",
        monthlyIncome: "15000"
      },
      documents: [
        { type: "Valid ID", status: "Verified" },
        { type: "Proof of Residence", status: "Verified" }
      ]
    }
  },
  // More beneficiaries...
];

export const beneficiaryStats = {
  totalBeneficiaries: 250,
  verified: 180,
  pendingVerification: 45,
  resettledFamilies: 120
};

export const beneficiaryByBarangay = [
  { barangay: "Barangay 1", count: 45 },
  { barangay: "Barangay 2", count: 32 },
  // More data...
];
