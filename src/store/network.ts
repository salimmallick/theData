import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface NetworkState {
  layouts: {
    lg: Layout[];
  };
  filters: {
    timeRange: string;
    region: string;
    deviceType: string;
    protocol: string;
    trafficType: string;
  };
  updateLayouts: (newLayouts: { lg: Layout[] }) => void;
  updateFilters: (newFilters: Partial<NetworkState['filters']>) => void;
}

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set) => ({
      layouts: {
        lg: [
          { i: 'network-performance', x: 0, y: 0, w: 12, h: 6 },
          { i: 'network-quality', x: 0, y: 6, w: 6, h: 6 },
          { i: 'network-path', x: 6, y: 6, w: 6, h: 6 },
          { i: 'network-utilization', x: 0, y: 12, w: 12, h: 6 },
        ],
      },
      filters: {
        timeRange: 'last24h',
        region: 'all',
        deviceType: 'all',
        protocol: 'all',
        trafficType: 'all',
      },
      updateLayouts: (newLayouts) => set({ layouts: newLayouts }),
      updateFilters: (newFilters) => 
        set((state) => ({ 
          filters: { ...state.filters, ...newFilters } 
        })),
    }),
    {
      name: 'network-analytics',
    }
  )
);