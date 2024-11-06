import {
  Activity,
  AlertCircle,
  BarChart3,
  Book,
  CircleDollarSign,
  Eye,
  HelpCircle,
  Home,
  Lock,
  Settings,
  Timer,
  User,
  Zap,
} from 'lucide-react';
import { NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    title: 'Overview',
    path: '/',
    icon: Home,
  },
  {
    title: 'Performance & Availability',
    path: '/performance',
    icon: Activity,
  },
  {
    title: 'Real-Time NOC',
    path: '/real-time',
    icon: Zap,
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    items: [
      {
        title: 'Network Analytics',
        path: '/analytics/network',
      },
      {
        title: 'Product Analytics',
        path: '/analytics/product',
      },
      {
        title: 'User Behavior',
        path: '/analytics/user-behavior',
      },
      {
        title: 'Video Analytics',
        path: '/analytics/video',
      },
    ],
  },
  {
    title: 'Observability',
    path: '/observability',
    icon: Eye,
    items: [
      {
        title: 'Overview',
        path: '/observability/overview',
      },
      {
        title: 'Infrastructure',
        path: '/observability/infrastructure',
      },
      {
        title: 'APM',
        path: '/observability/apm',
      },
      {
        title: 'Database',
        path: '/observability/database',
      },
      {
        title: 'Logs',
        path: '/observability/logs',
      },
    ],
  },
  {
    title: 'Security',
    path: '/security',
    icon: Lock,
    items: [
      {
        title: 'Overview',
        path: '/security/overview',
      },
      {
        title: 'Device Security',
        path: '/security/device',
      },
      {
        title: 'API Security',
        path: '/security/api',
      },
      {
        title: 'Network Security',
        path: '/security/network',
      },
      {
        title: 'Database Security',
        path: '/security/database',
      },
      {
        title: 'User Access',
        path: '/security/access',
      },
      {
        title: 'Threat Intelligence',
        path: '/security/threats',
      },
      {
        title: 'Incident Response',
        path: '/security/incidents',
      },
      {
        title: 'Compliance',
        path: '/security/compliance',
      },
    ],
  },
  {
    title: 'Cost Management',
    path: '/costs',
    icon: CircleDollarSign,
    items: [
      {
        title: 'Overview',
        path: '/costs/overview',
      },
      {
        title: 'Infrastructure',
        path: '/costs/infrastructure',
      },
      {
        title: 'Application',
        path: '/costs/application',
      },
      {
        title: 'Operational',
        path: '/costs/operational',
      },
      {
        title: 'Third-Party Services',
        path: '/costs/third-party',
      },
      {
        title: 'Budgeting',
        path: '/costs/budgeting',
      },
    ],
  },
  {
    title: 'Alerts & Incidents',
    path: '/alerts',
    icon: AlertCircle,
    items: [
      {
        title: 'Alert Management',
        path: '/alerts/management',
      },
      {
        title: 'Incident Management',
        path: '/alerts/incidents',
      },
      {
        title: 'Notifications',
        path: '/alerts/notifications',
      },
      {
        title: 'Cost Alerts',
        path: '/alerts/costs',
      },
      {
        title: 'Training',
        path: '/alerts/training',
      },
    ],
  },
  {
    title: 'User Insights',
    path: '/insights',
    icon: User,
  },
  {
    title: 'Learn',
    path: '/learn',
    icon: Book,
  },
  {
    title: 'Help',
    path: '/help',
    icon: HelpCircle,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];