import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const securityScoreData = {
  overall: 85,
  categories: [
    { name: 'Network Security', score: 88 },
    { name: 'Application Security', score: 82 },
    { name: 'Data Security', score: 90 },
    { name: 'Identity & Access', score: 85 },
    { name: 'Cloud Security', score: 80 }
  ]
};

const threatData = [
  { date: '2024-01-01', threats: 120, blocked: 118 },
  { date: '2024-01-02', threats: 150, blocked: 145 },
  { date: '2024-01-03', threats: 130, blocked: 128 },
  { date: '2024-01-04', threats: 160, blocked: 155 }
];

const complianceData = {
  standards: ['GDPR', 'HIPAA', 'PCI DSS', 'SOC 2', 'ISO 27001'],
  scores: [95, 88, 92, 85, 90]
};

export default function SecurityOverview() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['security-overview'] || {
    lg: [
      { i: 'security-score', x: 0, y: 0, w: 6, h: 4 },
      { i: 'threat-analysis', x: 6, y: 0, w: 6, h: 4 },
      { i: 'compliance-status', x: 0, y: 4, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('security-overview', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('security-dashboard');
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
    pdf.save('security-overview.pdf');
  };

  const securityScoreOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#ff6e76'],
              [0.7, '#fddd60'],
              [1, '#7cffb2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 20
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: '{value}',
          color: 'auto'
        },
        data: [{
          value: securityScoreData.overall,
          name: 'Security Score'
        }]
      }
    ]
  };

  const threatAnalysisOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Threats Detected', 'Threats Blocked']
    },
    xAxis: {
      type: 'category',
      data: threatData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Threats Detected',
        type: 'line',
        data: threatData.map(item => item.threats),
        smooth: true,
        itemStyle: { color: '#ff4d4f' }
      },
      {
        name: 'Threats Blocked',
        type: 'line',
        data: threatData.map(item => item.blocked),
        smooth: true,
        itemStyle: { color: '#52c41a' }
      }
    ]
  };

  const complianceOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: complianceData.standards
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    series: [
      {
        type: 'bar',
        data: complianceData.scores.map(score => ({
          value: score,
          itemStyle: {
            color: score >= 90 ? '#52c41a' : score >= 80 ? '#faad14' : '#ff4d4f'
          }
        })),
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Overview</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and analyze your security posture across all systems and applications.
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

      <div id="security-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="security-score">
            <BaseWidget
              title="Security Score"
              description="Overall security posture score based on multiple security controls and metrics."
            >
              <ReactECharts option={securityScoreOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="threat-analysis">
            <BaseWidget
              title="Threat Analysis"
              description="Real-time analysis of detected and blocked security threats."
            >
              <ReactECharts option={threatAnalysisOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="compliance-status">
            <BaseWidget
              title="Compliance Status"
              description="Current compliance status across various security standards and regulations."
              fullWidth
            >
              <ReactECharts option={complianceOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}