import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard-layout';
import { Overview } from './pages/overview';

// Analytics Routes
import NetworkAnalytics from './pages/analytics/network';
import ProductAnalytics from './pages/analytics/product';
import UserBehaviorAnalytics from './pages/analytics/user-behavior';
import VideoAnalytics from './pages/analytics/video';

// Performance Routes
import PerformanceOverview from './pages/performance/overview';
import ResponseTimes from './pages/performance/response-times';
import ErrorRates from './pages/performance/errors';
import ServiceHealth from './pages/performance/health';

// Real-Time Routes
import RealTimeNOC from './pages/real-time';
import RealTimeMonitoring from './pages/real-time/monitoring';
import RealTimeIncidents from './pages/real-time/incidents';
import RealTimeAlerts from './pages/real-time/alerts';
import ServiceStatus from './pages/real-time/status';

// Observability Routes
import ObservabilityOverview from './pages/observability/overview';
import Infrastructure from './pages/observability/infrastructure';
import APM from './pages/observability/apm';
import Database from './pages/observability/database';
import Logs from './pages/observability/logs';

// Security Routes
import SecurityOverview from './pages/security/overview';
import DeviceSecurity from './pages/security/device';
import APISecurity from './pages/security/api';
import NetworkSecurity from './pages/security/network';
import DatabaseSecurity from './pages/security/database';
import UserAccess from './pages/security/access';
import ThreatIntelligence from './pages/security/threats';
import IncidentResponse from './pages/security/incidents';
import Compliance from './pages/security/compliance';

// Cost Management Routes
import CostOverview from './pages/costs/overview';
import InfrastructureCosts from './pages/costs/infrastructure';
import ApplicationCosts from './pages/costs/application';
import OperationalCosts from './pages/costs/operational';
import ThirdPartyCosts from './pages/costs/third-party';
import Budgeting from './pages/costs/budgeting';

// Alerts & Incidents Routes
import AlertManagement from './pages/alerts/management';
import IncidentManagement from './pages/alerts/incidents';
import Notifications from './pages/alerts/notifications';
import CostAlerts from './pages/alerts/costs';
import AlertsTraining from './pages/alerts/training';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <Overview />,
      },
      // Performance & Availability
      {
        path: '/performance',
        children: [
          {
            path: '',
            element: <PerformanceOverview />,
          },
          {
            path: 'response-times',
            element: <ResponseTimes />,
          },
          {
            path: 'errors',
            element: <ErrorRates />,
          },
          {
            path: 'health',
            element: <ServiceHealth />,
          },
        ],
      },
      // Real-Time NOC
      {
        path: '/real-time',
        children: [
          {
            path: '',
            element: <RealTimeNOC />,
          },
          {
            path: 'monitoring',
            element: <RealTimeMonitoring />,
          },
          {
            path: 'incidents',
            element: <RealTimeIncidents />,
          },
          {
            path: 'alerts',
            element: <RealTimeAlerts />,
          },
          {
            path: 'status',
            element: <ServiceStatus />,
          },
        ],
      },
      // Analytics
      {
        path: '/analytics',
        children: [
          {
            path: 'network',
            element: <NetworkAnalytics />,
          },
          {
            path: 'product',
            element: <ProductAnalytics />,
          },
          {
            path: 'user-behavior',
            element: <UserBehaviorAnalytics />,
          },
          {
            path: 'video',
            element: <VideoAnalytics />,
          },
        ],
      },
      // Observability
      {
        path: '/observability',
        children: [
          {
            path: 'overview',
            element: <ObservabilityOverview />,
          },
          {
            path: 'infrastructure',
            element: <Infrastructure />,
          },
          {
            path: 'apm',
            element: <APM />,
          },
          {
            path: 'database',
            element: <Database />,
          },
          {
            path: 'logs',
            element: <Logs />,
          },
        ],
      },
      // Security
      {
        path: '/security',
        children: [
          {
            path: 'overview',
            element: <SecurityOverview />,
          },
          {
            path: 'device',
            element: <DeviceSecurity />,
          },
          {
            path: 'api',
            element: <APISecurity />,
          },
          {
            path: 'network',
            element: <NetworkSecurity />,
          },
          {
            path: 'database',
            element: <DatabaseSecurity />,
          },
          {
            path: 'access',
            element: <UserAccess />,
          },
          {
            path: 'threats',
            element: <ThreatIntelligence />,
          },
          {
            path: 'incidents',
            element: <IncidentResponse />,
          },
          {
            path: 'compliance',
            element: <Compliance />,
          },
        ],
      },
      // Cost Management
      {
        path: '/costs',
        children: [
          {
            path: 'overview',
            element: <CostOverview />,
          },
          {
            path: 'infrastructure',
            element: <InfrastructureCosts />,
          },
          {
            path: 'application',
            element: <ApplicationCosts />,
          },
          {
            path: 'operational',
            element: <OperationalCosts />,
          },
          {
            path: 'third-party',
            element: <ThirdPartyCosts />,
          },
          {
            path: 'budgeting',
            element: <Budgeting />,
          },
        ],
      },
      // Alerts & Incidents
      {
        path: '/alerts',
        children: [
          {
            path: 'management',
            element: <AlertManagement />,
          },
          {
            path: 'incidents',
            element: <IncidentManagement />,
          },
          {
            path: 'notifications',
            element: <Notifications />,
          },
          {
            path: 'costs',
            element: <CostAlerts />,
          },
          {
            path: 'training',
            element: <AlertsTraining />,
          },
        ],
      },
    ],
  },
]);