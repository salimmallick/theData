import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const incidentData = {
  incidentTrends: [
    { date: '2024-01', critical: 5, high: 12, medium: 25, low: 40 },
    { date: '2024-02', critical: 3, high: 10, medium: 22, low: 38 },
    { date: '2024-03', critical: 4, high: 8, medium: 20, low: 35 },
    { date: '2024-04', critical: 2, high: 7, medium: 18, low: 32 }
  ],
  responseMetrics: {
    mttr: [
      { severity: 'Critical', time: 1.5 },
      { severity: 'High', time: 4 },
      { severity: 'Medium', time: 12 },
      { severity: 'Low', time: 24 }
    ],
    resolutionRate: [
      { date: '2024-01', rate: 92 },
      { date: '2024-02', rate: 94 },
      { date: '2024-03', rate: 95 },
      { date: '2024-04', rate: 96 }
    ]
  },
  incidentTypes: [
    { name: 'Security Breach', value: 30 },
    { name: 'System Outage', value: 25 },
    { name: 'Data Loss', value: 20 },
    { name: 'Configuration Error', value: 15 },
    { name: 'Others', value: 10 }
  ],
  teamPerformance: {
    teams: ['SOC', 'Network', 'Application', 'Database', 'Cloud'],
    metrics: {
      responseTime: [15, 20, 18, 22, 25],
      resolutionRate: [95, 92, 94, 90, 93],
      incidents: [50, 45, 40, 35, 30]
    }
  }
};

export default function IncidentResponse() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['incident-response'] || {
    lg: [
      { i: 'incident-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'response-metrics', x: 0, y: 4, w: 6, h: 4 },
      { i: 'incident-types', x: 6, y: 4, w: 6, h: 4 },
      { i: 'team-performance', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('incident-response', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('incident-response-dashboard');
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
    pdf.save('incident-response.pdf');
  };

  const incidentTrendsOption = {
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
      data: incidentData.incidentTrends.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Critical',
        type: 'bar',
        stack: 'total',
        data: incidentData.incidentTrends.map(item => item.critical),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'High',
        type: 'bar',
        stack: 'total',
        data: incidentData.incidentTrends.map(item => item.high),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Medium',
        type: 'bar',
        stack: 'total',
        data: incidentData.incidentTrends.map(item => item.medium),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Low',
        type: 'bar',
        stack: 'total',
        data: incidentData.incidentTrends.map(item => item.low),
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
    xAxis: {
      type: 'category',
      data: incidentData.responseMetrics.mttr.map(item => item.severity)
    },
    yAxis: {
      type: 'value',
      name: 'Hours'
    },
    series: [
      {
        type: 'bar',
        data: incidentData.responseMetrics.mttr.map(item => ({
          value: item.time,
          itemStyle: {
            color: item.severity === 'Critical' ? '#ef4444' :
                  item.severity === 'High' ? '#f59e0b' :
                  item.severity === 'Medium' ? '#3b82f6' : '#22c55e'
          }
        })),
        label: {
          show: true,
          position: 'top',
          formatter: '{c} hrs'
        }
      }
    ]
  };

  const incidentTypesOption = {
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
        data: incidentData.incidentTypes
      }
    ]
  };

  const teamPerformanceOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Response Time (min)', 'Resolution Rate (%)', 'Incidents']
    },
    xAxis: {
      type: 'category',
      data: incidentData.teamPerformance.teams
    },
    yAxis: [
      {
        type: 'value',
        name: 'Time/Rate',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Incidents',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Response Time (min)',
        type: 'bar',
        data: incidentData.teamPerformance.metrics.responseTime,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Resolution Rate (%)',
        type: 'line',
        data: incidentData.teamPerformance.metrics.resolutionRate,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Incidents',
        type: 'bar',
        yAxisIndex: 1,
        data: incidentData.teamPerformance.metrics.incidents,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Incident Response</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and manage security incidents, response times, and team performance.
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

      <div id="incident-response-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="incident-trends">
            <BaseWidget
              title="Incident Trends"
              description="Monitor incident trends by severity level over time."
              fullWidth
            >
              <ReactECharts option={incidentTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="response-metrics">
            <BaseWidget
              title="Response Metrics"
              description="Mean Time to Resolve (MTTR) by incident severity."
            >
              <ReactECharts option={responseMetricsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="incident-types">
            <BaseWidget
              title="Incident Types"
              description="Distribution of incidents by category."
            >
              <ReactECharts option={incidentTypesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="team-performance">
            <BaseWidget
              title="Team Performance"
              description="Response metrics by team and incident category."
              fullWidth
            >
              <ReactECharts option={teamPerformanceOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}