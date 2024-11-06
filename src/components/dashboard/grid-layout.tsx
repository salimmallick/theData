import { ReactNode } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  children: ReactNode;
  layouts: {
    lg: Array<{
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
      minW?: number;
      maxW?: number;
      minH?: number;
      maxH?: number;
    }>;
  };
  onLayoutChange?: (layout: any, layouts: any) => void;
}

export function GridLayout({ children, layouts, onLayoutChange }: GridLayoutProps) {
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={50}
      containerPadding={[24, 24]}
      margin={[24, 24]}
      onLayoutChange={onLayoutChange}
      isDraggable={true}
      isResizable={true}
      useCSSTransforms={true}
      compactType="vertical"
      preventCollision={false}
    >
      {children}
    </ResponsiveGridLayout>
  );
}