import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const deviceData = {
  deviceTypes: {
    categories: ['Mobile', 'Desktop', 'IoT', 'Servers', 'Network'],
    vulnerabilities: [25, 18, 35, 15, 22],
    patches: [20, 15, 28, 12, 18]
  },
  osDistribution: [
    { name: 'Windows', value: 45 },
    { name: 'Linux', value: 30 },
    { name: 'macOS', value: 15 },
    { name: 'iOS', value: 5 },
    { name: 'Android', value: 5 }
  ],
  securityTrends: [
    { date: '2024-01', vulnerabilities: 120, patched: 100 },
    { date: '2024-02', vulnerabilities: 150, patched: 135 },
    { date: '2024-03', vulnerabilities: 130, patched: 125 },
    { date: '2024-04', vulnerabilities: 160, patched: 150 }
  ]
};

export default function DeviceSecurity() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['device-security'] || {
    lg: [
      { i: 'device-vulnerabilities', x: 0, y: 0, w: 12, h: 4 },
      { i: 'os-distribution', x: 0, y: 4, w: 6, h: 4 },
      { i: 'security-trends', x: 6, y: 4, w: 6, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('device-security', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('device-security-dashboard');
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
    pdf.save('device-security.pdf');
  };

  const deviceVulnerabilitiesOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Vulnerabilities', 'Patched']
    },
    xAxis: {
      type: 'category',
      data: deviceData.deviceTypes.categories
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Vulnerabilities',
        type: 'bar',
        data: deviceData.deviceTypes.vulnerabilities,
        itemStyle: { color: '#ff4d4f' }
      },
      {
        name: 'Patched',
        type: 'bar',
        data: deviceData.deviceTypes.patches,
        itemStyle: { color: '#52c41a' }
      }
    ]
  };

  const osDistributionOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
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
        data: deviceData.osDistribution
      }
    ]
  };

  const securityTrendsOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Vulnerabilities', 'Patched']
    },
    xAxis: {
      type: 'category',
      data: deviceData.securityTrends.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Vulnerabilities',
        type: 'line',
        data: deviceData.securityTrends.map(item => item.vulnerabilities),
        smooth: true,
        itemStyle: { color: '#ff4d4f' }
      },
      {
        name: 'Patched',
        type: 'line',
        data: deviceData.securityTrends.map(item => item.patched),
        smooth: true,
        itemStyle: { color: '#52c41a' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Device Security</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and manage security across all connected devices and endpoints.
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

      <div id="device-security-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="device-vulnerabilities">
            <BaseWidget
              title="Device Vulnerabilities"
              description="Overview of vulnerabilities and patches across different device types."
              fullWidth
            >
              <ReactECharts option={deviceVulnerabilitiesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="os-distribution">
            <BaseWidget
              title="OS Distribution"
              description="Distribution of operating systems across all devices."
            >
              <ReactECharts option={osDistributionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="security-trends">
            <BaseWidget
              title="Security Trends"
              description="Historical trends of vulnerabilities and patches."
            >
              <ReactECharts option={securityTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}