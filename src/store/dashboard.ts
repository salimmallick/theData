import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minH?: number;
  minW?: number;
}

interface DashboardState {
  layouts: {
    lg: Layout[];
  };
  updateLayouts: (newLayouts: { lg: Layout[] }) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      layouts: {
        lg: [
          { i: 'executive-summary', x: 0, y: 0, w: 12, h: 3, minH: 3 },
          { i: 'performance-overview', x: 0, y: 3, w: 12, h: 7, minH: 7 },
          { i: 'user-engagement', x: 0, y: 10, w: 12, h: 7, minH: 7 },
          { i: 'video-performance', x: 0, y: 17, w: 12, h: 7, minH: 7 },
          { i: 'network-performance', x: 0, y: 24, w: 12, h: 7, minH: 7 },
          { i: 'incidents-alerts', x: 0, y: 31, w: 12, h: 7, minH: 7 },
          { i: 'cost-management', x: 0, y: 38, w: 12, h: 7, minH: 7 },
          { i: 'observability-insights', x: 0, y: 45, w: 12, h: 7, minH: 7 },
          { i: 'traffic-insights', x: 0, y: 52, w: 12, h: 7, minH: 7 },
        ],
      },
      updateLayouts: (newLayouts) => set({ layouts: newLayouts }),
    }),
    {
      name: 'dashboard-layouts',
    }
  )
);