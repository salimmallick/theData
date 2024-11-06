import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const alertData = {
  alertTrends: [
    { date: '2024-01', critical: 15, high: 25, medium: 45, low: 65 },
    { date: '2024-02', critical: 12, high: 22, medium: 42, low: 62 },
    { date: '2024-03', critical: 18, high: 28, medium: 48, low: 68 },
    { date: '2024-04', critical: 14, high: 24, medium: 44, low: 64 }
  ],
  responseMetrics: {
    categories: ['Critical', 'High', 'Medium', 'Low'],
    metrics: {
      responseTime: [5, 15, 30, 60],
      resolutionTime: [30, 120, 240, 480],
      escalationRate: [80, 60, 40, 20]
    }
  },
  alertSources: [
    { name: 'Infrastructure', value: 35 },
    { name: 'Applications', value: 25 },
    { name: 'Security', value: 20 },
    { name: 'Network', value: 15 },
    { name: 'Database', value: 5 }
  ],
  alertStatus: [
    { date: '2024-01', active: 25, acknowledged: 35, resolved: 85 },
    { date: '2024-02', active: 22, acknowledged: 38, resolved: 82 },
    { date: '2024-03', active: 28, acknowledged: 32, resolved: 88 },
    { date: '2024-04', active: 24, acknowledged: 36, resolved: 84 }
  ]
};

export default function AlertManagement() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['alert-management'] || {
    lg: [
      { i: 'alert-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'response-metrics', x: 0, y: 4, w: 6, h: 4 },
      { i: 'alert-sources', x: 6, y: 4, w: 6, h: 4 },
      { i: 'alert-status', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('alert-management', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('alert-management-dashboard');
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
    pdf.save('alert-management.pdf');
  };

  const alertTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Critical', 'High', 'Medium', 'Low']
    },
    xAxis: {
      type: 'category',
      data: alertData.alertTrends.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Critical',
        type: 'bar',
        stack: 'total',
        data: alertData.alertTrends.map(item => item.critical),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'High',
        type: 'bar',
        stack: 'total',
        data: alertData.alertTrends.map(item => item.high),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Medium',
        type: 'bar',
        stack: 'total',
        data: alertData.alertTrends.map(item => item.medium),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Low',
        type: 'bar',
        stack: 'total',
        data: alertData.alertTrends.map(item => item.low),
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  const responseMetricsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Response Time (min)', 'Resolution Time (min)', 'Escalation Rate (%)']
    },
    xAxis: {
      type: 'category',
      data: alertData.responseMetrics.categories
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Response Time (min)',
        type: 'bar',
        data: alertData.responseMetrics.metrics.responseTime,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Resolution Time (min)',
        type: 'bar',
        data: alertData.responseMetrics.metrics.resolutionTime,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Escalation Rate (%)',
        type: 'line',
        data: alertData.responseMetrics.metrics.escalationRate,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const alertSourcesOption = {
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
        data: alertData.alertSources
      }
    ]
  };

  const alertStatusOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Active', 'Acknowledged', 'Resolved']
    },
    xAxis: {
      type: 'category',
      data: alertData.alertStatus.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Active',
        type: 'line',
        stack: 'Total',
        data: alertData.alertStatus.map(item => item.active),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Acknowledged',
        type: 'line',
        stack: 'Total',
        data: alertData.alertStatus.map(item => item.acknowledged),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Resolved',
        type: 'line',
        stack: 'Total',
        data: alertData.alertStatus.map(item => item.resolved),
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alert Management</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and manage alerts across your infrastructure and applications.
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

      <div id="alert-management-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="alert-trends">
            <BaseWidget
              title="Alert Trends"
              description="Distribution of alerts by severity over time."
              fullWidth
            >
              <ReactECharts option={alertTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="response-metrics">
            <BaseWidget
              title="Response Metrics"
              description="Alert response and resolution time metrics."
            >
              <ReactECharts option={responseMetricsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="alert-sources">
            <BaseWidget
              title="Alert Sources"
              description="Distribution of alerts by source system."
            >
              <ReactECharts option={alertSourcesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="alert-status">
            <BaseWidget
              title="Alert Status"
              description="Tracking of alert lifecycle states."
              fullWidth
            >
              <ReactECharts option={alertStatusOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}