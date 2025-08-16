// Module Imports
import Dashboard from './pages/Dashboard'
import GeneralSettings from './pages/settings/General'
import SecuritySettings from './pages/settings/Security'

// Zoning Module
import ZoningDashboard from './pages/zoning/Dashboard'
import ZoningDetail from './pages/zoning/ApplicationDetail'
import ZoningReports from './pages/zoning/Reports'

// Housing Module
import HousingDashboard from './pages/housing/Dashboard'
import BeneficiaryDetail from './pages/housing/BeneficiaryDetail'
import HousingReports from './pages/housing/Reports'

// Subdivision Module
import SubdivisionDashboard from './pages/subdivision/Dashboard'
import ProjectDetail from './pages/subdivision/ProjectDetail'
import SubdivisionReports from './pages/subdivision/Reports'

// Occupancy Module
import OccupancyDashboard from './pages/occupancy/Dashboard'
import BuildingDetail from './pages/occupancy/BuildingDetail'
import OccupancyReports from './pages/occupancy/Reports'

// Infrastructure Module
import InfrastructureDashboard from './pages/infrastructure/Dashboard'
import InfrastructureDetail from './pages/infrastructure/ProjectDetail'
import InfrastructureReports from './pages/infrastructure/Reports'

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  // Zoning Routes
  {
    path: '/zoning',
    element: <ZoningDashboard />,
  },
  {
    path: '/zoning/application/:id',
    element: <ZoningDetail />,
  },
  {
    path: '/zoning/reports',
    element: <ZoningReports />,
  },
  // Housing Routes
  {
    path: '/housing',
    element: <HousingDashboard />,
  },
  {
    path: '/housing/beneficiary/:id',
    element: <BeneficiaryDetail />,
  },
  {
    path: '/housing/reports',
    element: <HousingReports />,
  },
  // Subdivision Routes
  {
    path: '/subdivision',
    element: <SubdivisionDashboard />,
  },
  {
    path: '/subdivision/project/:id',
    element: <ProjectDetail />,
  },
  {
    path: '/subdivision/reports',
    element: <SubdivisionReports />,
  },
  // Occupancy Routes
  {
    path: '/occupancy',
    element: <OccupancyDashboard />,
  },
  {
    path: '/occupancy/building/:id',
    element: <BuildingDetail />,
  },
  {
    path: '/occupancy/reports',
    element: <OccupancyReports />,
  },
  // Infrastructure Routes
  {
    path: '/infrastructure',
    element: <InfrastructureDashboard />,
  },
  {
    path: '/infrastructure/project/:id',
    element: <InfrastructureDetail />,
  },
  {
    path: '/infrastructure/reports',
    element: <InfrastructureReports />,
  },
  {
    path: '/settings/general',
    element: <GeneralSettings />,
  },
  {
    path: '/settings/security',
    element: <SecuritySettings />,
  },
]

export default routes