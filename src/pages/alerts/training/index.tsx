import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const trainingData = {
  completionStats: [
    { date: '2024-01', basic: 85, advanced: 65, expert: 45, simulation: 55 },
    { date: '2024-02', basic: 88, advanced: 68, expert: 48, simulation: 58 },
    { date: '2024-03', basic: 90, advanced: 70, expert: 50, simulation: 60 },
    { date: '2024-04', basic: 92, advanced: 72, expert: 52, simulation: 62 }
  ],
  performanceMetrics: {
    categories: ['Incident Response', 'Alert Triage', 'Root Cause Analysis', 'Communication'],
    teams: [
      { name: 'SOC Team', scores: [85, 88, 82, 90] },
      { name: 'NOC Team', scores: [82, 85, 80, 88] },
      { name: 'DevOps Team', scores: [80, 82, 85, 85] }
    ]
  },
  simulationResults: [
    { name: 'Critical Incidents', success: 92, partialSuccess: 5, failure: 3 },
    { name: 'Major Incidents', success: 88, partialSuccess: 8, failure: 4 },
    { name: 'Minor Incidents', success: 95, partialSuccess: 3, failure: 2 }
  ],
  skillGaps: {
    categories: ['Technical Skills', 'Process Knowledge', 'Tool Proficiency', 'Communication'],
    current: [75, 82, 78, 85],
    required: [85, 90, 88, 92],
    inProgress: [80, 85, 82, 88]
  }
};

export default function AlertsTraining() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['alerts-training'] || {
    lg: [
      { i: 'completion-stats', x: 0, y: 0, w: 12, h: 4 },
      { i: 'performance-metrics', x: 0, y: 4, w: 6, h: 4 },
      { i: 'simulation-results', x: 6, y: 4, w: 6, h: 4 },
      { i: 'skill-gaps', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('alerts-training', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('alerts-training-dashboard');
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
    pdf.save('alerts-training.pdf');
  };

  const completionStatsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Basic Training', 'Advanced Training', 'Expert Training', 'Simulations']
    },
    xAxis: {
      type: 'category',
      data: trainingData.completionStats.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'Basic Training',
        type: 'line',
        data: trainingData.completionStats.map(item => item.basic),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Advanced Training',
        type: 'line',
        data: trainingData.completionStats.map(item => item.advanced),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Expert Training',
        type: 'line',
        data: trainingData.completionStats.map(item => item.expert),
        smooth: true,
        itemStyle: { color: '#8b5cf6' }
      },
      {
        name: 'Simulations',
        type: 'line',
        data: trainingData.completionStats.map(item => item.simulation),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const performanceMetricsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: trainingData.performanceMetrics.teams.map(team => team.name)
    },
    radar: {
      indicator: trainingData.performanceMetrics.categories.map(category => ({
        name: category,
        max: 100
      }))
    },
    series: [
      {
        type: 'radar',
        data: trainingData.performanceMetrics.teams.map(team => ({
          name: team.name,
          value: team.scores
        }))
      }
    ]
  };

  const simulationResultsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Success', 'Partial Success', 'Failure']
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: trainingData.simulationResults.map(item => item.name)
    },
    series: [
      {
        name: 'Success',
        type: 'bar',
        stack: 'total',
        data: trainingData.simulationResults.map(item => item.success),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Partial Success',
        type: 'bar',
        stack: 'total',
        data: trainingData.simulationResults.map(item => item.partialSuccess),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Failure',
        type: 'bar',
        stack: 'total',
        data: trainingData.simulationResults.map(item => item.failure),
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const skillGapsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Current Level', 'Required Level', 'In Progress']
    },
    xAxis: {
      type: 'category',
      data: trainingData.skillGaps.categories
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'Current Level',
        type: 'bar',
        data: trainingData.skillGaps.current,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Required Level',
        type: 'line',
        data: trainingData.skillGaps.required,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'In Progress',
        type: 'bar',
        data: trainingData.skillGaps.inProgress,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training & Simulation</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor training progress, simulation results, and identify skill gaps in alert management.
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

      <div id="alerts-training-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="completion-stats">
            <BaseWidget
              title="Training Completion"
              description="Track completion rates across different training levels."
              fullWidth
            >
              <ReactECharts option={completionStatsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="performance-metrics">
            <BaseWidget
              title="Team Performance"
              description="Performance metrics across different alert management skills."
            >
              <ReactECharts option={performanceMetricsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="simulation-results">
            <BaseWidget
              title="Simulation Results"
              description="Success rates in incident response simulations."
            >
              <ReactECharts option={simulationResultsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="skill-gaps">
            <BaseWidget
              title="Skill Gap Analysis"
              description="Identify and track progress in closing skill gaps."
              fullWidth
            >
              <ReactECharts option={skillGapsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}