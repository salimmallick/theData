import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const apiData = {
  endpoints: {
    categories: ['Auth', 'Users', 'Products', 'Orders', 'Analytics'],
    requests: [15000, 12000, 8000, 5000, 3000],
    errors: [150, 80, 120, 60, 40]
  },
  authentication: {
    success: 95,
    failed: 5,
    methods: [
      { name: 'OAuth2', value: 45 },
      { name: 'API Keys', value: 30 },
      { name: 'JWT', value: 15 },
      { name: 'Basic Auth', value: 10 }
    ]
  },
  vulnerabilities: [
    { date: '2024-01', critical: 5, high: 12, medium: 25, low: 40 },
    { date: '2024-02', critical: 3, high: 10, medium: 22, low: 38 },
    { date: '2024-03', critical: 4, high: 8, medium: 20, low: 35 },
    { date: '2024-04', critical: 2, high: 7, medium: 18, low: 32 }
  ]
};

export default function APISecurity() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['api-security'] || {
    lg: [
      { i: 'api-traffic', x: 0, y: 0, w: 12, h: 4 },
      { i: 'auth-methods', x: 0, y: 4, w: 6, h: 4 },
      { i: 'vulnerabilities', x: 6, y: 4, w: 6, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('api-security', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('api-security-dashboard');
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
    pdf.save('api-security.pdf');
  };

  const apiTrafficOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Requests', 'Errors']
    },
    xAxis: {
      type: 'category',
      data: apiData.endpoints.categories
    },
    yAxis: [
      {
        type: 'value',
        name: 'Requests',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Errors',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Requests',
        type: 'bar',
        data: apiData.endpoints.requests,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Errors',
        type: 'line',
        yAxisIndex: 1,
        data: apiData.endpoints.errors,
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const authMethodsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
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
        data: apiData.authentication.methods
      }
    ]
  };

  const vulnerabilitiesOption = {
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
      data: apiData.vulnerabilities.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Critical',
        type: 'bar',
        stack: 'total',
        data: apiData.vulnerabilities.map(item => item.critical),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'High',
        type: 'bar',
        stack: 'total',
        data: apiData.vulnerabilities.map(item => item.high),
        itemStyle: { color: '#f97316' }
      },
      {
        name: 'Medium',
        type: 'bar',
        stack: 'total',
        data: apiData.vulnerabilities.map(item => item.medium),
        itemStyle: { color: '#facc15' }
      },
      {
        name: 'Low',
        type: 'bar',
        stack: 'total',
        data: apiData.vulnerabilities.map(item => item.low),
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Security</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and secure API endpoints, authentication, and detect vulnerabilities.
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

      <div id="api-security-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="api-traffic">
            <BaseWidget
              title="API Traffic & Errors"
              description="Monitor API endpoint usage and error rates."
              fullWidth
            >
              <ReactECharts option={apiTrafficOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="auth-methods">
            <BaseWidget
              title="Authentication Methods"
              description="Distribution of API authentication methods in use."
            >
              <ReactECharts option={authMethodsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="vulnerabilities">
            <BaseWidget
              title="API Vulnerabilities"
              description="Trend of API vulnerabilities by severity level."
            >
              <ReactECharts option={vulnerabilitiesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}