import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
}

interface LayoutState {
  layouts: {
    [key: string]: {
      lg: Layout[];
      md?: Layout[];
      sm?: Layout[];
    };
  };
  updateLayout: (page: string, newLayouts: { lg: Layout[]; md?: Layout[]; sm?: Layout[] }) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layouts: {},
      updateLayout: (page, newLayouts) =>
        set((state) => ({
          layouts: {
            ...state.layouts,
            [page]: newLayouts,
          },
        })),
    }),
    {
      name: 'dashboard-layouts',
    }
  )
);