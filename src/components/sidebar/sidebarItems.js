import { LayoutDashboard, Settings, MapPin, Home, Building, Construction, Map } from 'lucide-react'

const sidebarItems = [
  {
    id: "dashboard",
    label: "Main Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    id: "zoning",
    label: "Zoning Clearance",
    icon: MapPin,
    subItems: [
      {
        id: "zoning-dashboard",
        label: "Dashboard",
        path: "/zoning"
      },
      {
        id: "zoning-application-new",
        label: "New Application",
        path: "/zoning/applications/new"
      },
      {
        id: "zoning-reports",
        label: "Reports & Analytics",
        path: "/zoning/reports"
      }
    ]
  },
  {
    id: "housing",
    label: "Housing Registry",
    icon: Home,
    subItems: [
      {
        id: "housing-dashboard",
        label: "Dashboard",
        path: "/housing"
      },
      {
        id: "housing-reports",
        label: "Reports",
        path: "/housing/reports"
      }
    ]
  },
  {
    id: "subdivision",
    label: "Subdivision Review",
    icon: Map,
    subItems: [
      {
        id: "subdivision-dashboard",
        label: "Dashboard",
        path: "/subdivision"
      },
      {
        id: "subdivision-reports",
        label: "Reports",
        path: "/subdivision/reports"
      }
    ]
  },
  {
    id: "occupancy",
    label: "Occupancy Monitoring",
    icon: Building,
    subItems: [
      {
        id: "occupancy-dashboard",
        label: "Dashboard",
        path: "/occupancy"
      },
      {
        id: "occupancy-reports",
        label: "Reports",
        path: "/occupancy/reports"
      }
    ]
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    icon: Construction,
    subItems: [
      {
        id: "infrastructure-dashboard",
        label: "Dashboard",
        path: "/infrastructure"
      },
      {
        id: "infrastructure-reports",
        label: "Reports",
        path: "/infrastructure/reports"
      }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    subItems: [
      {
        id: "general",
        label: "General",
        path: "/settings/general"
      },
      {
        id: "security",
        label: "Security",
        path: "/settings/security"
      }
    ]
  }
];

export default sidebarItems;