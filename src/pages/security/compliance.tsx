import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const complianceData = {
  standards: {
    frameworks: ['GDPR', 'HIPAA', 'PCI DSS', 'SOC 2', 'ISO 27001'],
    scores: [95, 88, 92, 85, 90],
    requirements: [120, 150, 180, 200, 220],
    compliant: [115, 132, 165, 170, 198]
  },
  controls: [
    { name: 'Access Control', implemented: 95, required: 100 },
    { name: 'Data Protection', implemented: 88, required: 95 },
    { name: 'Network Security', implemented: 92, required: 100 },
    { name: 'Incident Response', implemented: 85, required: 90 },
    { name: 'Business Continuity', implemented: 90, required: 100 }
  ],
  auditHistory: [
    { date: '2024-01', findings: 25, resolved: 22, open: 3 },
    { date: '2024-02', findings: 20, resolved: 18, open: 2 },
    { date: '2024-03', findings: 18, resolved: 15, open: 3 },
    { date: '2024-04', findings: 15, resolved: 12, open: 3 }
  ],
  riskAssessment: {
    categories: ['High', 'Medium', 'Low'],
    current: [5, 15, 25],
    previous: [8, 18, 22]
  }
};

export default function Compliance() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['compliance'] || {
    lg: [
      { i: 'compliance-overview', x: 0, y: 0, w: 12, h: 4 },
      { i: 'control-status', x: 0, y: 4, w: 6, h: 4 },
      { i: 'audit-findings', x: 6, y: 4, w: 6, h: 4 },
      { i: 'risk-assessment', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('compliance', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('compliance-dashboard');
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
    pdf.save('compliance-dashboard.pdf');
  };

  const complianceOverviewOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Requirements', 'Compliant']
    },
    xAxis: {
      type: 'category',
      data: complianceData.standards.frameworks
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Score',
        min: 0,
        max: 100,
        position: 'right',
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: 'Requirements',
        type: 'bar',
        data: complianceData.standards.requirements,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Compliant',
        type: 'bar',
        data: complianceData.standards.compliant,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Score',
        type: 'line',
        yAxisIndex: 1,
        data: complianceData.standards.scores,
        itemStyle: { color: '#f59e0b' },
        label: {
          show: true,
          formatter: '{c}%'
        }
      }
    ]
  };

  const controlStatusOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Implemented', 'Required']
    },
    radar: {
      indicator: complianceData.controls.map(control => ({
        name: control.name,
        max: 100
      }))
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: complianceData.controls.map(control => control.implemented),
            name: 'Implemented',
            itemStyle: { color: '#22c55e' }
          },
          {
            value: complianceData.controls.map(control => control.required),
            name: 'Required',
            itemStyle: { color: '#3b82f6' }
          }
        ]
      }
    ]
  };

  const auditFindingsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Total Findings', 'Resolved', 'Open']
    },
    xAxis: {
      type: 'category',
      data: complianceData.auditHistory.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Total Findings',
        type: 'line',
        data: complianceData.auditHistory.map(item => item.findings),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Resolved',
        type: 'line',
        data: complianceData.auditHistory.map(item => item.resolved),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Open',
        type: 'line',
        data: complianceData.auditHistory.map(item => item.open),
        smooth: true,
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const riskAssessmentOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Current Period', 'Previous Period']
    },
    xAxis: {
      type: 'category',
      data: complianceData.riskAssessment.categories
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Current Period',
        type: 'bar',
        data: complianceData.riskAssessment.current.map((value, index) => ({
          value,
          itemStyle: {
            color: index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#22c55e'
          }
        }))
      },
      {
        name: 'Previous Period',
        type: 'bar',
        data: complianceData.riskAssessment.previous.map((value, index) => ({
          value,
          itemStyle: {
            color: index === 0 ? '#fee2e2' : index === 1 ? '#fef3c7' : '#dcfce7'
          }
        }))
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor compliance status, audit findings, and risk assessment across security frameworks.
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

      <div id="compliance-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="compliance-overview">
            <BaseWidget
              title="Compliance Overview"
              description="Overview of compliance status across different security frameworks."
              fullWidth
            >
              <ReactECharts option={complianceOverviewOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="control-status">
            <BaseWidget
              title="Control Status"
              description="Implementation status of security controls across different domains."
            >
              <ReactECharts option={controlStatusOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="audit-findings">
            <BaseWidget
              title="Audit Findings"
              description="Track and monitor audit findings and their resolution status."
            >
              <ReactECharts option={auditFindingsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="risk-assessment">
            <BaseWidget
              title="Risk Assessment"
              description="Compare current and previous risk levels across different categories."
              fullWidth
            >
              <ReactECharts option={riskAssessmentOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}