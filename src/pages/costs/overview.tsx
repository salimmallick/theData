import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const costData = {
  monthlyTrends: [
    { month: 'Jan', compute: 12000, storage: 5000, network: 3000, services: 4000 },
    { month: 'Feb', compute: 13000, storage: 5200, network: 3200, services: 4100 },
    { month: 'Mar', compute: 12500, storage: 5400, network: 3100, services: 4200 },
    { month: 'Apr', compute: 13500, storage: 5600, network: 3300, services: 4300 }
  ],
  budgetComparison: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    actual: [45000, 48000, 0, 0],
    forecast: [45000, 47000, 49000, 51000],
    budget: [50000, 50000, 50000, 50000]
  },
  costByService: [
    { name: 'Compute', value: 35 },
    { name: 'Storage', value: 25 },
    { name: 'Network', value: 15 },
    { name: 'Databases', value: 12 },
    { name: 'Analytics', value: 8 },
    { name: 'Others', value: 5 }
  ],
  savingsOpportunities: {
    categories: ['Reserved Instances', 'Right Sizing', 'Idle Resources', 'Storage Optimization'],
    potential: [25000, 15000, 10000, 8000],
    achieved: [15000, 8000, 5000, 3000]
  }
};

export default function CostOverview() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['cost-overview'] || {
    lg: [
      { i: 'monthly-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'budget-comparison', x: 0, y: 4, w: 6, h: 4 },
      { i: 'service-distribution', x: 6, y: 4, w: 6, h: 4 },
      { i: 'savings-opportunities', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('cost-overview', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('cost-overview-dashboard');
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
    pdf.save('cost-overview.pdf');
  };

  const monthlyTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Compute', 'Storage', 'Network', 'Services']
    },
    xAxis: {
      type: 'category',
      data: costData.monthlyTrends.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Compute',
        type: 'bar',
        stack: 'total',
        data: costData.monthlyTrends.map(item => item.compute),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Storage',
        type: 'bar',
        stack: 'total',
        data: costData.monthlyTrends.map(item => item.storage),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Network',
        type: 'bar',
        stack: 'total',
        data: costData.monthlyTrends.map(item => item.network),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Services',
        type: 'bar',
        stack: 'total',
        data: costData.monthlyTrends.map(item => item.services),
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };

  const budgetComparisonOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Actual', 'Forecast', 'Budget']
    },
    xAxis: {
      type: 'category',
      data: costData.budgetComparison.categories
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Actual',
        type: 'bar',
        data: costData.budgetComparison.actual,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Forecast',
        type: 'line',
        data: costData.budgetComparison.forecast,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Budget',
        type: 'line',
        data: costData.budgetComparison.budget,
        itemStyle: { color: '#22c55e' },
        lineStyle: { type: 'dashed' }
      }
    ]
  };

  const serviceDistributionOption = {
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
        data: costData.costByService
      }
    ]
  };

  const savingsOpportunitiesOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Potential Savings', 'Achieved Savings']
    },
    xAxis: {
      type: 'category',
      data: costData.savingsOpportunities.categories
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Potential Savings',
        type: 'bar',
        data: costData.savingsOpportunities.potential,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Achieved Savings',
        type: 'bar',
        data: costData.savingsOpportunities.achieved,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cost Overview</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and analyze cloud infrastructure costs and identify optimization opportunities.
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

      <div id="cost-overview-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="monthly-trends">
            <BaseWidget
              title="Monthly Cost Trends"
              description="Track monthly costs by resource category."
              fullWidth
            >
              <ReactECharts option={monthlyTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="budget-comparison">
            <BaseWidget
              title="Budget vs Actual"
              description="Compare actual costs against budget and forecast."
            >
              <ReactECharts option={budgetComparisonOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="service-distribution">
            <BaseWidget
              title="Cost Distribution"
              description="Distribution of costs across different services."
            >
              <ReactECharts option={serviceDistributionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="savings-opportunities">
            <BaseWidget
              title="Cost Optimization"
              description="Identify and track cost optimization opportunities."
              fullWidth
            >
              <ReactECharts option={savingsOpportunitiesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}