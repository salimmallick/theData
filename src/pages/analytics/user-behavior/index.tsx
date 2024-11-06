import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const behaviorData = {
  userJourney: {
    nodes: [
      { name: 'Landing Page', value: 10000 },
      { name: 'Product List', value: 8500 },
      { name: 'Product Detail', value: 6000 },
      { name: 'Add to Cart', value: 3000 },
      { name: 'Checkout', value: 2000 },
      { name: 'Purchase', value: 1500 }
    ],
    links: [
      { source: 'Landing Page', target: 'Product List', value: 8500 },
      { source: 'Product List', target: 'Product Detail', value: 6000 },
      { source: 'Product Detail', target: 'Add to Cart', value: 3000 },
      { source: 'Add to Cart', target: 'Checkout', value: 2000 },
      { source: 'Checkout', target: 'Purchase', value: 1500 }
    ]
  },
  sessionMetrics: [
    { date: '2024-01', avgDuration: 320, bounceRate: 35, conversion: 2.8 },
    { date: '2024-02', avgDuration: 340, bounceRate: 33, conversion: 3.1 },
    { date: '2024-03', avgDuration: 360, bounceRate: 31, conversion: 3.4 },
    { date: '2024-04', avgDuration: 380, bounceRate: 29, conversion: 3.7 }
  ],
  featureUsage: [
    { name: 'Search', value: 35 },
    { name: 'Filters', value: 25 },
    { name: 'Sorting', value: 15 },
    { name: 'Wishlist', value: 15 },
    { name: 'Reviews', value: 10 }
  ],
  userSegments: {
    categories: ['New Users', 'Returning', 'Power Users', 'Inactive'],
    metrics: {
      count: [2500, 3500, 1500, 1000],
      engagement: [60, 75, 90, 20],
      retention: [40, 65, 85, 15]
    }
  }
};

export default function UserBehaviorAnalytics() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['user-behavior'] || {
    lg: [
      { i: 'user-journey', x: 0, y: 0, w: 12, h: 4 },
      { i: 'session-metrics', x: 0, y: 4, w: 6, h: 4 },
      { i: 'feature-usage', x: 6, y: 4, w: 6, h: 4 },
      { i: 'user-segments', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('user-behavior', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('user-behavior-dashboard');
    if (!dashboard) return;

    const canvas = await html2canvas(dashboard, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: dashboard.scrollWidth,
      windowHeight: dashboard.scrollHeight
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('user-behavior-analytics.pdf');
  };

  const userJourneyOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} users'
    },
    series: [{
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      data: behaviorData.userJourney.nodes,
      links: behaviorData.userJourney.links,
      lineStyle: {
        color: 'gradient',
        curveness: 0.5
      }
    }]
  };

  const sessionMetricsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Avg Duration (s)', 'Bounce Rate (%)', 'Conversion Rate (%)']
    },
    xAxis: {
      type: 'category',
      data: behaviorData.sessionMetrics.map(item => item.date)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Duration/Rate',
        position: 'left'
      }
    ],
    series: [
      {
        name: 'Avg Duration (s)',
        type: 'line',
        data: behaviorData.sessionMetrics.map(item => item.avgDuration),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Bounce Rate (%)',
        type: 'line',
        data: behaviorData.sessionMetrics.map(item => item.bounceRate),
        smooth: true,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Conversion Rate (%)',
        type: 'line',
        data: behaviorData.sessionMetrics.map(item => item.conversion),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  const featureUsageOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: behaviorData.featureUsage
      }
    ]
  };

  const userSegmentsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['User Count', 'Engagement Score', 'Retention Rate']
    },
    xAxis: {
      type: 'category',
      data: behaviorData.userSegments.categories
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Score/Rate (%)',
        position: 'right',
        max: 100
      }
    ],
    series: [
      {
        name: 'User Count',
        type: 'bar',
        data: behaviorData.userSegments.metrics.count,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Engagement Score',
        type: 'line',
        yAxisIndex: 1,
        data: behaviorData.userSegments.metrics.engagement,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Retention Rate',
        type: 'line',
        yAxisIndex: 1,
        data: behaviorData.userSegments.metrics.retention,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Behavior Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Analyze user journeys, engagement patterns, and feature usage across your application.
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={exportDashboard}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div id="user-behavior-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="user-journey">
            <BaseWidget
              title="User Journey Flow"
              description="Visualize user navigation paths and conversion funnel."
              fullWidth
            >
              <ReactECharts option={userJourneyOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="session-metrics">
            <BaseWidget
              title="Session Metrics"
              description="Track key session metrics and conversion rates."
            >
              <ReactECharts option={sessionMetricsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="feature-usage">
            <BaseWidget
              title="Feature Usage"
              description="Distribution of feature usage across the application."
            >
              <ReactECharts option={featureUsageOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="user-segments">
            <BaseWidget
              title="User Segments"
              description="Analysis of user segments and their engagement metrics."
              fullWidth
            >
              <ReactECharts option={userSegmentsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}