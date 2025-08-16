import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/Header'
import sidebarItems from './components/sidebar/sidebarItems'

// Module Imports
import Dashboard from './pages/Dashboard'
import GeneralSettings from './pages/settings/General'
import SecuritySettings from './pages/settings/Security'

// Zoning Module
import ZoningDashboard from './pages/zoning/Dashboard'
import ApplicationDetail from './pages/zoning/ApplicationDetail'
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
import InfrastructureReports from './pages/infrastructure/InfrastructureReports'

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  // Helper to find breadcrumb path from sidebarItems
  function getBreadcrumb() {
    const path = location.pathname;
    
    // Handle detail pages
    if (path.includes('/applications/')) {
      return ['Zoning Clearance', path.includes('/new') ? 'New Application' : 'Application Details'];
    }
    if (path.includes('/beneficiary/')) {
      return ['Housing Registry', 'Beneficiary Details'];
    }
    if (path.includes('/project/')) {
      return path.includes('/infrastructure/') 
        ? ['Infrastructure', 'Project Details']
        : ['Subdivision Review', 'Project Details'];
    }
    if (path.includes('/building/')) {
      return ['Occupancy Monitoring', 'Building Details'];
    }

    // Handle regular pages
    for (const item of sidebarItems) {
      if (item.path === path) return [item.label];
      if (item.subItems) {
        const sub = item.subItems.find(sub => sub.path === path);
        if (sub) return [item.label, sub.label];
      }
    }
    return ['Dashboard'];
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 dark:from-slate-800 via-blue-50 dark:via-slate-800 to-indigo-50 dark:to-slate-800 min-h-screen transition-colors duration-200">
      <div className='flex h-screen overflow-hidden'>
        <Sidebar collapsed={sidebarCollapsed} />
        <div className='flex flex-col flex-1'>
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            breadcrumb={getBreadcrumb()}
          />
          <main className="flex-1 dark:bg-slate-800 p-8 overflow-auto">
            <Routes>
              {/* Main Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Zoning Routes */}
              <Route path="/zoning" element={<ZoningDashboard />} />
              <Route path="/zoning/applications/new" element={<ApplicationDetail />} />
              <Route path="/zoning/applications/:id" element={<ApplicationDetail />} />
              <Route path="/zoning/reports" element={<ZoningReports />} />

              {/* Housing Routes */}
              <Route path="/housing" element={<HousingDashboard />} />
              <Route path="/housing/beneficiary/:id" element={<BeneficiaryDetail />} />
              <Route path="/housing/reports" element={<HousingReports />} />

              {/* Subdivision Routes */}
              <Route path="/subdivision" element={<SubdivisionDashboard />} />
              <Route path="/subdivision/project/:id" element={<ProjectDetail />} />
              <Route path="/subdivision/reports" element={<SubdivisionReports />} />

              {/* Occupancy Routes */}
              <Route path="/occupancy" element={<OccupancyDashboard />} />
              <Route path="/occupancy/building/:id" element={<BuildingDetail />} />
              <Route path="/occupancy/reports" element={<OccupancyReports />} />

              {/* Infrastructure Routes */}
              <Route path="/infrastructure" element={<InfrastructureDashboard />} />
              <Route path="/infrastructure/project/:id" element={<InfrastructureDetail />} />
              <Route path="/infrastructure/reports" element={<InfrastructureReports />} />

              {/* Settings Routes */}
              <Route path="/settings/general" element={<GeneralSettings />} />
              <Route path="/settings/security" element={<SecuritySettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App