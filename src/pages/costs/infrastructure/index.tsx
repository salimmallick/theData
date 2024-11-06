import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const infrastructureData = {
  costTrends: [
    { month: 'Jan', compute: 25000, storage: 15000, network: 10000 },
    { month: 'Feb', compute: 27000, storage: 16000, network: 11000 },
    { month: 'Mar', compute: 26000, storage: 15500, network: 10500 },
    { month: 'Apr', compute: 28000, storage: 16500, network: 11500 }
  ],
  resourceUtilization: [
    { name: 'Used', value: 75 },
    { name: 'Reserved', value: 15 },
    { name: 'Idle', value: 10 }
  ],
  costByRegion: {
    regions: ['US East', 'US West', 'EU', 'Asia', 'Other'],
    costs: [35000, 28000, 25000, 20000, 12000]
  },
  optimizationOpportunities: [
    { category: 'Right Sizing', potential: 12000, achieved: 8000 },
    { category: 'Reserved Instances', potential: 15000, achieved: 10000 },
    { category: 'Storage Optimization', potential: 8000, achieved: 5000 },
    { category: 'Network Optimization', potential: 5000, achieved: 3000 }
  ]
};

export default function InfrastructureCosts() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['infrastructure-costs'] || {
    lg: [
      { i: 'cost-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'resource-utilization', x: 0, y: 4, w: 6, h: 4 },
      { i: 'regional-costs', x: 6, y: 4, w: 6, h: 4 },
      { i: 'optimization', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('infrastructure-costs', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('infrastructure-costs-dashboard');
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
    pdf.save('infrastructure-costs.pdf');
  };

  const costTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Compute', 'Storage', 'Network']
    },
    xAxis: {
      type: 'category',
      data: infrastructureData.costTrends.map(item => item.month)
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
        data: infrastructureData.costTrends.map(item => item.compute),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Storage',
        type: 'bar',
        stack: 'total',
        data: infrastructureData.costTrends.map(item => item.storage),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Network',
        type: 'bar',
        stack: 'total',
        data: infrastructureData.costTrends.map(item => item.network),
        itemStyle: { color: '#f59e0b' }
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
        data: infrastructureData.resourceUtilization
      }
    ]
  };

  const regionalCostsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: infrastructureData.costByRegion.regions
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        type: 'bar',
        data: infrastructureData.costByRegion.costs,
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  const optimizationOption = {
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
      data: infrastructureData.optimizationOpportunities.map(item => item.category)
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
        data: infrastructureData.optimizationOpportunities.map(item => item.potential),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Achieved Savings',
        type: 'bar',
        data: infrastructureData.optimizationOpportunities.map(item => item.achieved),
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Infrastructure Costs</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and optimize infrastructure costs across compute, storage, and network resources.
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

      <div id="infrastructure-costs-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="cost-trends">
            <BaseWidget
              title="Cost Trends"
              description="Track infrastructure costs by resource type over time."
              fullWidth
            >
              <ReactECharts option={costTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="resource-utilization">
            <BaseWidget
              title="Resource Utilization"
              description="Current resource utilization and allocation status."
            >
              <ReactECharts option={resourceUtilizationOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="regional-costs">
            <BaseWidget
              title="Regional Cost Distribution"
              description="Infrastructure costs by geographic region."
            >
              <ReactECharts option={regionalCostsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="optimization">
            <BaseWidget
              title="Cost Optimization"
              description="Track cost optimization opportunities and achievements."
              fullWidth
            >
              <ReactECharts option={optimizationOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}