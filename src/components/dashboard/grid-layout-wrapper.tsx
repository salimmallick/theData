import { ReactNode } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

interface GridLayoutWrapperProps {
  children: ReactNode;
  layouts: {
    lg: Layout[];
    md?: Layout[];
    sm?: Layout[];
  };
  onLayoutChange?: (currentLayout: Layout[], allLayouts: any) => void;
  className?: string;
}

export function GridLayoutWrapper({ 
  children, 
  layouts, 
  onLayoutChange,
  className = ''
}: GridLayoutWrapperProps) {
  return (
    <ResponsiveGridLayout
      className={`layout ${className}`}
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768 }}
      cols={{ lg: 12, md: 10, sm: 6 }}
      rowHeight={100}
      containerPadding={[16, 16]}
      margin={[16, 16]}
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