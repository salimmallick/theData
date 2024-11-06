import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const costAlertData = {
  alertTrends: [
    { date: '2024-01', budget: 15, usage: 25, forecast: 20, anomaly: 10 },
    { date: '2024-02', budget: 12, usage: 22, forecast: 18, anomaly: 8 },
    { date: '2024-03', budget: 18, usage: 28, forecast: 22, anomaly: 12 },
    { date: '2024-04', budget: 14, usage: 24, forecast: 19, anomaly: 9 }
  ],
  serviceAlerts: [
    { name: 'Compute', value: 35 },
    { name: 'Storage', value: 25 },
    { name: 'Network', value: 20 },
    { name: 'Database', value: 15 },
    { name: 'Other', value: 5 }
  ],
  thresholdBreaches: [
    { date: '2024-01', minor: 25, major: 15, critical: 5 },
    { date: '2024-02', minor: 22, major: 12, critical: 3 },
    { date: '2024-03', minor: 28, major: 18, critical: 6 },
    { date: '2024-04', minor: 24, major: 14, critical: 4 }
  ],
  responseMetrics: {
    categories: ['Budget Alerts', 'Usage Alerts', 'Forecast Alerts', 'Anomaly Alerts'],
    metrics: {
      acknowledgmentTime: [10, 15, 20, 25],
      resolutionTime: [60, 90, 120, 150],
      automatedActions: [80, 70, 60, 50]
    }
  }
};

export default function CostAlerts() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['cost-alerts'] || {
    lg: [
      { i: 'alert-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'service-alerts', x: 0, y: 4, w: 6, h: 4 },
      { i: 'threshold-breaches', x: 6, y: 4, w: 6, h: 4 },
      { i: 'response-metrics', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('cost-alerts', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('cost-alerts-dashboard');
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
    pdf.save('cost-alerts.pdf');
  };

  const alertTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Budget Alerts', 'Usage Alerts', 'Forecast Alerts', 'Anomaly Alerts']
    },
    xAxis: {
      type: 'category',
      data: costAlertData.alertTrends.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Budget Alerts',
        type: 'bar',
        stack: 'total',
        data: costAlertData.alertTrends.map(item => item.budget),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Usage Alerts',
        type: 'bar',
        stack: 'total',
        data: costAlertData.alertTrends.map(item => item.usage),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Forecast Alerts',
        type: 'bar',
        stack: 'total',
        data: costAlertData.alertTrends.map(item => item.forecast),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Anomaly Alerts',
        type: 'bar',
        stack: 'total',
        data: costAlertData.alertTrends.map(item => item.anomaly),
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const serviceAlertsOption = {
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
        data: costAlertData.serviceAlerts
      }
    ]
  };

  const thresholdBreachesOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Minor', 'Major', 'Critical']
    },
    xAxis: {
      type: 'category',
      data: costAlertData.thresholdBreaches.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Minor',
        type: 'bar',
        data: costAlertData.thresholdBreaches.map(item => item.minor),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Major',
        type: 'bar',
        data: costAlertData.thresholdBreaches.map(item => item.major),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Critical',
        type: 'bar',
        data: costAlertData.thresholdBreaches.map(item => item.critical),
        itemStyle: { color: '#ef4444' }
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
      data: ['Acknowledgment Time (min)', 'Resolution Time (min)', 'Automated Actions (%)']
    },
    xAxis: {
      type: 'category',
      data: costAlertData.responseMetrics.categories
    },
    yAxis: [
      {
        type: 'value',
        name: 'Time (min)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Percentage',
        position: 'right',
        max: 100
      }
    ],
    series: [
      {
        name: 'Acknowledgment Time (min)',
        type: 'bar',
        data: costAlertData.responseMetrics.metrics.acknowledgmentTime,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Resolution Time (min)',
        type: 'bar',
        data: costAlertData.responseMetrics.metrics.resolutionTime,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Automated Actions (%)',
        type: 'line',
        yAxisIndex: 1,
        data: costAlertData.responseMetrics.metrics.automatedActions,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cost Alerts</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and manage cost-related alerts, thresholds, and automated responses.
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

      <div id="cost-alerts-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="alert-trends">
            <BaseWidget
              title="Alert Trends"
              description="Distribution of cost alerts by type over time."
              fullWidth
            >
              <ReactECharts option={alertTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="service-alerts">
            <BaseWidget
              title="Service Alerts"
              description="Distribution of alerts across different services."
            >
              <ReactECharts option={serviceAlertsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="threshold-breaches">
            <BaseWidget
              title="Threshold Breaches"
              description="Cost threshold violations by severity."
            >
              <ReactECharts option={thresholdBreachesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="response-metrics">
            <BaseWidget
              title="Response Metrics"
              description="Alert response times and automation effectiveness."
              fullWidth
            >
              <ReactECharts option={responseMetricsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}