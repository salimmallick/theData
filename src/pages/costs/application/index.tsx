import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const applicationCostData = {
  costTrends: [
    { date: '2024-01', compute: 12000, storage: 5000, network: 3000, services: 4000 },
    { date: '2024-02', compute: 13000, storage: 5200, network: 3200, services: 4100 },
    { date: '2024-03', compute: 12500, storage: 5400, network: 3100, services: 4200 },
    { date: '2024-04', compute: 13500, storage: 5600, network: 3300, services: 4300 }
  ],
  resourceUtilization: [
    { name: 'API Services', value: 35 },
    { name: 'Databases', value: 25 },
    { name: 'Caching', value: 15 },
    { name: 'Processing', value: 15 },
    { name: 'Others', value: 10 }
  ],
  costByEnvironment: {
    environments: ['Production', 'Staging', 'Development', 'Testing'],
    metrics: {
      current: [45000, 15000, 10000, 5000],
      previous: [42000, 14000, 9000, 4500]
    }
  },
  optimizationOpportunities: [
    { date: '2024-01', identified: 25000, implemented: 15000 },
    { date: '2024-02', identified: 28000, implemented: 18000 },
    { date: '2024-03', identified: 30000, implemented: 20000 },
    { date: '2024-04', identified: 32000, implemented: 22000 }
  ]
};

export default function ApplicationCosts() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['application-costs'] || {
    lg: [
      { i: 'cost-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'resource-utilization', x: 0, y: 4, w: 6, h: 4 },
      { i: 'environment-costs', x: 6, y: 4, w: 6, h: 4 },
      { i: 'optimization-opportunities', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('application-costs', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('application-costs-dashboard');
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
    pdf.save('application-costs.pdf');
  };

  const costTrendsOption = {
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
      data: applicationCostData.costTrends.map(item => item.date)
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
        data: applicationCostData.costTrends.map(item => item.compute),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Storage',
        type: 'bar',
        stack: 'total',
        data: applicationCostData.costTrends.map(item => item.storage),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Network',
        type: 'bar',
        stack: 'total',
        data: applicationCostData.costTrends.map(item => item.network),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Services',
        type: 'bar',
        stack: 'total',
        data: applicationCostData.costTrends.map(item => item.services),
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };

  const resourceUtilizationOption = {
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
        data: applicationCostData.resourceUtilization
      }
    ]
  };

  const environmentCostsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Current Month', 'Previous Month']
    },
    xAxis: {
      type: 'category',
      data: applicationCostData.costByEnvironment.environments
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Current Month',
        type: 'bar',
        data: applicationCostData.costByEnvironment.metrics.current,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Previous Month',
        type: 'bar',
        data: applicationCostData.costByEnvironment.metrics.previous,
        itemStyle: { color: '#94a3b8' }
      }
    ]
  };

  const optimizationOpportunitiesOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Identified Savings', 'Implemented Savings']
    },
    xAxis: {
      type: 'category',
      data: applicationCostData.optimizationOpportunities.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Identified Savings',
        type: 'line',
        data: applicationCostData.optimizationOpportunities.map(item => item.identified),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Implemented Savings',
        type: 'line',
        data: applicationCostData.optimizationOpportunities.map(item => item.implemented),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Application Costs</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and analyze application-related costs across different resources and environments.
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

      <div id="application-costs-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="cost-trends">
            <BaseWidget
              title="Cost Trends"
              description="Monthly cost breakdown by resource category."
              fullWidth
            >
              <ReactECharts option={costTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="resource-utilization">
            <BaseWidget
              title="Resource Utilization"
              description="Distribution of costs across different application resources."
            >
              <ReactECharts option={resourceUtilizationOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="environment-costs">
            <BaseWidget
              title="Environment Costs"
              description="Cost comparison across different environments."
            >
              <ReactECharts option={environmentCostsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="optimization-opportunities">
            <BaseWidget
              title="Cost Optimization"
              description="Track identified and implemented cost optimization opportunities."
              fullWidth
            >
              <ReactECharts option={optimizationOpportunitiesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}