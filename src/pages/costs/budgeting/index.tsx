import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const budgetData = {
  budgetVsActual: [
    { month: 'Jan', budget: 50000, actual: 48000, forecast: 49000 },
    { month: 'Feb', budget: 50000, actual: 51000, forecast: 52000 },
    { month: 'Mar', budget: 50000, actual: 49000, forecast: 50000 },
    { month: 'Apr', budget: 50000, actual: 52000, forecast: 53000 }
  ],
  departmentAllocation: [
    { name: 'Infrastructure', value: 40 },
    { name: 'Development', value: 25 },
    { name: 'Operations', value: 20 },
    { name: 'Security', value: 15 }
  ],
  varianceAnalysis: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    metrics: {
      positive: [5000, 3000, 4000, 2000],
      negative: [-3000, -4000, -2000, -5000]
    }
  },
  budgetTrends: [
    { date: '2024-01', planned: 150000, allocated: 145000, utilized: 142000 },
    { date: '2024-02', planned: 155000, allocated: 150000, utilized: 148000 },
    { date: '2024-03', planned: 160000, allocated: 155000, utilized: 153000 },
    { date: '2024-04', planned: 165000, allocated: 160000, utilized: 158000 }
  ]
};

export default function Budgeting() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['budgeting'] || {
    lg: [
      { i: 'budget-vs-actual', x: 0, y: 0, w: 12, h: 4 },
      { i: 'department-allocation', x: 0, y: 4, w: 6, h: 4 },
      { i: 'variance-analysis', x: 6, y: 4, w: 6, h: 4 },
      { i: 'budget-trends', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('budgeting', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('budgeting-dashboard');
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
    pdf.save('budgeting.pdf');
  };

  const budgetVsActualOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Budget', 'Actual', 'Forecast']
    },
    xAxis: {
      type: 'category',
      data: budgetData.budgetVsActual.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Budget',
        type: 'line',
        data: budgetData.budgetVsActual.map(item => item.budget),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Actual',
        type: 'bar',
        data: budgetData.budgetVsActual.map(item => item.actual),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Forecast',
        type: 'line',
        data: budgetData.budgetVsActual.map(item => item.forecast),
        lineStyle: { type: 'dashed' },
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const departmentAllocationOption = {
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
        data: budgetData.departmentAllocation
      }
    ]
  };

  const varianceAnalysisOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Positive Variance', 'Negative Variance']
    },
    xAxis: {
      type: 'category',
      data: budgetData.varianceAnalysis.categories
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${Math.abs(value).toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Positive Variance',
        type: 'bar',
        stack: 'total',
        data: budgetData.varianceAnalysis.metrics.positive,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Negative Variance',
        type: 'bar',
        stack: 'total',
        data: budgetData.varianceAnalysis.metrics.negative,
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const budgetTrendsOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Planned', 'Allocated', 'Utilized']
    },
    xAxis: {
      type: 'category',
      data: budgetData.budgetTrends.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Planned',
        type: 'line',
        data: budgetData.budgetTrends.map(item => item.planned),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Allocated',
        type: 'line',
        data: budgetData.budgetTrends.map(item => item.allocated),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Utilized',
        type: 'line',
        data: budgetData.budgetTrends.map(item => item.utilized),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budgeting</h1>
          <p className="mt-2 text-muted-foreground">
            Plan, track, and analyze budget allocation and utilization across departments.
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

      <div id="budgeting-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="budget-vs-actual">
            <BaseWidget
              title="Budget vs Actual"
              description="Compare budgeted amounts against actual spending and forecasts."
              fullWidth
            >
              <ReactECharts option={budgetVsActualOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="department-allocation">
            <BaseWidget
              title="Department Allocation"
              description="Budget allocation across different departments."
            >
              <ReactECharts option={departmentAllocationOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="variance-analysis">
            <BaseWidget
              title="Variance Analysis"
              description="Analysis of budget variances by quarter."
            >
              <ReactECharts option={varianceAnalysisOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="budget-trends">
            <BaseWidget
              title="Budget Trends"
              description="Track budget planning, allocation, and utilization over time."
              fullWidth
            >
              <ReactECharts option={budgetTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}