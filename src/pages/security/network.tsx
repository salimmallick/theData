import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const networkData = {
  firewallActivity: [
    { date: '2024-01', blocked: 15000, allowed: 85000, suspicious: 500 },
    { date: '2024-02', blocked: 18000, allowed: 82000, suspicious: 600 },
    { date: '2024-03', blocked: 16000, allowed: 84000, suspicious: 550 },
    { date: '2024-04', blocked: 17000, allowed: 83000, suspicious: 580 }
  ],
  threatDistribution: [
    { name: 'DDoS', value: 35 },
    { name: 'Port Scanning', value: 25 },
    { name: 'Malware', value: 20 },
    { name: 'Data Exfiltration', value: 15 },
    { name: 'Others', value: 5 }
  ],
  securityEvents: [
    { time: '00:00', critical: 5, high: 15, medium: 30, low: 50 },
    { time: '06:00', critical: 8, high: 20, medium: 35, low: 45 },
    { time: '12:00', critical: 6, high: 18, medium: 32, low: 48 },
    { time: '18:00', critical: 7, high: 16, medium: 33, low: 47 }
  ],
  networkSegments: {
    categories: ['DMZ', 'Internal', 'Cloud', 'Partner', 'Guest'],
    metrics: {
      vulnerabilities: [25, 15, 20, 18, 30],
      incidents: [10, 5, 8, 7, 12],
      compliance: [95, 98, 92, 90, 85]
    }
  }
};

export default function NetworkSecurity() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['network-security'] || {
    lg: [
      { i: 'firewall-activity', x: 0, y: 0, w: 12, h: 4 },
      { i: 'threat-distribution', x: 0, y: 4, w: 6, h: 4 },
      { i: 'security-events', x: 6, y: 4, w: 6, h: 4 },
      { i: 'network-segments', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('network-security', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('network-security-dashboard');
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
    pdf.save('network-security.pdf');
  };

  const firewallActivityOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Blocked', 'Allowed', 'Suspicious']
    },
    xAxis: {
      type: 'category',
      data: networkData.firewallActivity.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Blocked',
        type: 'bar',
        stack: 'total',
        data: networkData.firewallActivity.map(item => item.blocked),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Allowed',
        type: 'bar',
        stack: 'total',
        data: networkData.firewallActivity.map(item => item.allowed),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Suspicious',
        type: 'bar',
        stack: 'total',
        data: networkData.firewallActivity.map(item => item.suspicious),
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const threatDistributionOption = {
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
        data: networkData.threatDistribution
      }
    ]
  };

  const securityEventsOption = {
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
      data: networkData.securityEvents.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Critical',
        type: 'line',
        data: networkData.securityEvents.map(item => item.critical),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'High',
        type: 'line',
        data: networkData.securityEvents.map(item => item.high),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Medium',
        type: 'line',
        data: networkData.securityEvents.map(item => item.medium),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Low',
        type: 'line',
        data: networkData.securityEvents.map(item => item.low),
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  const networkSegmentsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Vulnerabilities', 'Incidents', 'Compliance']
    },
    xAxis: {
      type: 'category',
      data: networkData.networkSegments.categories
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Compliance %',
        position: 'right',
        max: 100,
        min: 0
      }
    ],
    series: [
      {
        name: 'Vulnerabilities',
        type: 'bar',
        data: networkData.networkSegments.metrics.vulnerabilities,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Incidents',
        type: 'bar',
        data: networkData.networkSegments.metrics.incidents,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Compliance',
        type: 'line',
        yAxisIndex: 1,
        data: networkData.networkSegments.metrics.compliance,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Network Security</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and analyze network security events, threats, and compliance across all segments.
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

      <div id="network-security-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="firewall-activity">
            <BaseWidget
              title="Firewall Activity"
              description="Overview of network traffic patterns and firewall actions."
              fullWidth
            >
              <ReactECharts option={firewallActivityOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="threat-distribution">
            <BaseWidget
              title="Threat Distribution"
              description="Distribution of different types of network security threats."
            >
              <ReactECharts option={threatDistributionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="security-events">
            <BaseWidget
              title="Security Events"
              description="Timeline of security events by severity level."
            >
              <ReactECharts option={securityEventsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="network-segments">
            <BaseWidget
              title="Network Segments Security"
              description="Security metrics across different network segments."
              fullWidth
            >
              <ReactECharts option={networkSegmentsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}