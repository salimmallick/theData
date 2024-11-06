import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const operationalData = {
  costTrends: [
    { month: 'Jan', labor: 50000, tools: 15000, training: 5000, support: 10000 },
    { month: 'Feb', labor: 52000, tools: 14500, training: 5500, support: 11000 },
    { month: 'Mar', labor: 51000, tools: 15500, training: 4500, support: 10500 },
    { month: 'Apr', labor: 53000, tools: 16000, training: 6000, support: 11500 }
  ],
  teamDistribution: [
    { name: 'DevOps', value: 35 },
    { name: 'SRE', value: 25 },
    { name: 'Support', value: 20 },
    { name: 'Security', value: 15 },
    { name: 'Other', value: 5 }
  ],
  efficiencyMetrics: {
    categories: ['Incident Response', 'Deployment', 'Monitoring', 'Maintenance'],
    current: [85, 92, 88, 90],
    target: [95, 98, 95, 95]
  },
  costOptimization: [
    { date: '2024-01', actual: 80000, projected: 85000, savings: 5000 },
    { date: '2024-02', actual: 82000, projected: 88000, savings: 6000 },
    { date: '2024-03', actual: 81000, projected: 87000, savings: 6000 },
    { date: '2024-04', actual: 83000, projected: 90000, savings: 7000 }
  ]
};

export default function OperationalCosts() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['operational-costs'] || {
    lg: [
      { i: 'cost-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'team-distribution', x: 0, y: 4, w: 6, h: 4 },
      { i: 'efficiency-metrics', x: 6, y: 4, w: 6, h: 4 },
      { i: 'cost-optimization', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('operational-costs', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('operational-costs-dashboard');
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
    pdf.save('operational-costs.pdf');
  };

  const costTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Labor', 'Tools', 'Training', 'Support']
    },
    xAxis: {
      type: 'category',
      data: operationalData.costTrends.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Labor',
        type: 'bar',
        stack: 'total',
        data: operationalData.costTrends.map(item => item.labor),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Tools',
        type: 'bar',
        stack: 'total',
        data: operationalData.costTrends.map(item => item.tools),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Training',
        type: 'bar',
        stack: 'total',
        data: operationalData.costTrends.map(item => item.training),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Support',
        type: 'bar',
        stack: 'total',
        data: operationalData.costTrends.map(item => item.support),
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };

  const teamDistributionOption = {
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
        data: operationalData.teamDistribution
      }
    ]
  };

  const efficiencyMetricsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Current', 'Target']
    },
    radar: {
      indicator: operationalData.efficiencyMetrics.categories.map(category => ({
        name: category,
        max: 100
      }))
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: operationalData.efficiencyMetrics.current,
            name: 'Current',
            itemStyle: { color: '#3b82f6' }
          },
          {
            value: operationalData.efficiencyMetrics.target,
            name: 'Target',
            itemStyle: { color: '#22c55e' }
          }
        ]
      }
    ]
  };

  const costOptimizationOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Actual Cost', 'Projected Cost', 'Savings']
    },
    xAxis: {
      type: 'category',
      data: operationalData.costOptimization.map(item => item.date)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Cost',
        position: 'left',
        axisLabel: {
          formatter: (value: number) => `$${value.toLocaleString()}`
        }
      },
      {
        type: 'value',
        name: 'Savings',
        position: 'right',
        axisLabel: {
          formatter: (value: number) => `$${value.toLocaleString()}`
        }
      }
    ],
    series: [
      {
        name: 'Actual Cost',
        type: 'bar',
        data: operationalData.costOptimization.map(item => item.actual),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Projected Cost',
        type: 'line',
        data: operationalData.costOptimization.map(item => item.projected),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Savings',
        type: 'bar',
        yAxisIndex: 1,
        data: operationalData.costOptimization.map(item => item.savings),
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Operational Costs</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and optimize operational costs across teams, tools, and processes.
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

      <div id="operational-costs-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="cost-trends">
            <BaseWidget
              title="Cost Trends"
              description="Track operational costs by category over time."
              fullWidth
            >
              <ReactECharts option={costTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="team-distribution">
            <BaseWidget
              title="Team Cost Distribution"
              description="Operational costs distribution across teams."
            >
              <ReactECharts option={teamDistributionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="efficiency-metrics">
            <BaseWidget
              title="Efficiency Metrics"
              description="Current vs target operational efficiency metrics."
            >
              <ReactECharts option={efficiencyMetricsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="cost-optimization">
            <BaseWidget
              title="Cost Optimization"
              description="Track cost optimization progress and savings."
              fullWidth
            >
              <ReactECharts option={costOptimizationOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}