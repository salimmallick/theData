import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const threatData = {
  threatTrends: [
    { date: '2024-01', malware: 150, phishing: 200, ddos: 50, ransomware: 30 },
    { date: '2024-02', malware: 180, phishing: 180, ddos: 45, ransomware: 35 },
    { date: '2024-03', malware: 160, phishing: 220, ddos: 55, ransomware: 25 },
    { date: '2024-04', malware: 200, phishing: 190, ddos: 60, ransomware: 40 }
  ],
  geographicDistribution: [
    { name: 'North America', value: 35 },
    { name: 'Europe', value: 28 },
    { name: 'Asia Pacific', value: 22 },
    { name: 'South America', value: 10 },
    { name: 'Africa', value: 5 }
  ],
  threatSeverity: {
    categories: ['Critical', 'High', 'Medium', 'Low'],
    active: [15, 45, 80, 120],
    mitigated: [12, 38, 65, 100]
  },
  indicators: [
    { date: '2024-01', newIoCs: 250, activeIoCs: 1200, expiredIoCs: 180 },
    { date: '2024-02', newIoCs: 280, activeIoCs: 1300, expiredIoCs: 200 },
    { date: '2024-03', newIoCs: 260, activeIoCs: 1350, expiredIoCs: 220 },
    { date: '2024-04', newIoCs: 300, activeIoCs: 1400, expiredIoCs: 240 }
  ]
};

export default function ThreatIntelligence() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['threat-intelligence'] || {
    lg: [
      { i: 'threat-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'geographic-distribution', x: 0, y: 4, w: 6, h: 4 },
      { i: 'threat-severity', x: 6, y: 4, w: 6, h: 4 },
      { i: 'threat-indicators', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('threat-intelligence', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('threat-intelligence-dashboard');
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
    pdf.save('threat-intelligence.pdf');
  };

  const threatTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Malware', 'Phishing', 'DDoS', 'Ransomware']
    },
    xAxis: {
      type: 'category',
      data: threatData.threatTrends.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Malware',
        type: 'line',
        data: threatData.threatTrends.map(item => item.malware),
        smooth: true,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Phishing',
        type: 'line',
        data: threatData.threatTrends.map(item => item.phishing),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'DDoS',
        type: 'line',
        data: threatData.threatTrends.map(item => item.ddos),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Ransomware',
        type: 'line',
        data: threatData.threatTrends.map(item => item.ransomware),
        smooth: true,
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };

  const geographicDistributionOption = {
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
        data: threatData.geographicDistribution
      }
    ]
  };

  const threatSeverityOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Active', 'Mitigated']
    },
    xAxis: {
      type: 'category',
      data: threatData.threatSeverity.categories
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Active',
        type: 'bar',
        data: threatData.threatSeverity.active,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Mitigated',
        type: 'bar',
        data: threatData.threatSeverity.mitigated,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  const threatIndicatorsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['New IoCs', 'Active IoCs', 'Expired IoCs']
    },
    xAxis: {
      type: 'category',
      data: threatData.indicators.map(item => item.date)
    },
    yAxis: [
      {
        type: 'value',
        name: 'IoCs',
        position: 'left'
      }
    ],
    series: [
      {
        name: 'New IoCs',
        type: 'bar',
        data: threatData.indicators.map(item => item.newIoCs),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Active IoCs',
        type: 'line',
        data: threatData.indicators.map(item => item.activeIoCs),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Expired IoCs',
        type: 'line',
        data: threatData.indicators.map(item => item.expiredIoCs),
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Threat Intelligence</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and analyze security threats, trends, and indicators of compromise.
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

      <div id="threat-intelligence-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="threat-trends">
            <BaseWidget
              title="Threat Trends"
              description="Monitor trends of different types of security threats over time."
              fullWidth
            >
              <ReactECharts option={threatTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="geographic-distribution">
            <BaseWidget
              title="Geographic Distribution"
              description="Distribution of threats across different geographic regions."
            >
              <ReactECharts option={geographicDistributionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="threat-severity">
            <BaseWidget
              title="Threat Severity"
              description="Active and mitigated threats by severity level."
            >
              <ReactECharts option={threatSeverityOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="threat-indicators">
            <BaseWidget
              title="Threat Indicators"
              description="Track Indicators of Compromise (IoCs) and their lifecycle."
              fullWidth
            >
              <ReactECharts option={threatIndicatorsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}