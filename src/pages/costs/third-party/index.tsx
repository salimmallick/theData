import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const thirdPartyData = {
  costTrends: [
    { month: 'Jan', saas: 25000, apis: 15000, hosting: 10000, other: 5000 },
    { month: 'Feb', saas: 26000, apis: 14500, hosting: 10500, other: 5500 },
    { month: 'Mar', saas: 24500, apis: 15500, hosting: 11000, other: 5000 },
    { month: 'Apr', saas: 27000, apis: 16000, hosting: 10000, other: 6000 }
  ],
  serviceDistribution: [
    { name: 'SaaS Tools', value: 45 },
    { name: 'API Services', value: 25 },
    { name: 'Hosting', value: 20 },
    { name: 'Other Services', value: 10 }
  ],
  utilizationMetrics: {
    categories: ['User Adoption', 'Feature Usage', 'API Calls', 'Storage'],
    services: [
      { name: 'Current Usage', data: [85, 78, 92, 65] },
      { name: 'License Coverage', data: [100, 90, 100, 80] }
    ]
  },
  costEfficiency: [
    { date: '2024-01', cost: 55000, value: 75, efficiency: 85 },
    { date: '2024-02', cost: 56500, value: 78, efficiency: 86 },
    { date: '2024-03', cost: 56000, value: 80, efficiency: 88 },
    { date: '2024-04', cost: 59000, value: 82, efficiency: 87 }
  ]
};

export default function ThirdPartyCosts() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['third-party-costs'] || {
    lg: [
      { i: 'cost-trends', x: 0, y: 0, w: 12, h: 4 },
      { i: 'service-distribution', x: 0, y: 4, w: 6, h: 4 },
      { i: 'utilization-metrics', x: 6, y: 4, w: 6, h: 4 },
      { i: 'cost-efficiency', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('third-party-costs', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('third-party-costs-dashboard');
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
    pdf.save('third-party-costs.pdf');
  };

  const costTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['SaaS', 'APIs', 'Hosting', 'Other']
    },
    xAxis: {
      type: 'category',
      data: thirdPartyData.costTrends.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'SaaS',
        type: 'bar',
        stack: 'total',
        data: thirdPartyData.costTrends.map(item => item.saas),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'APIs',
        type: 'bar',
        stack: 'total',
        data: thirdPartyData.costTrends.map(item => item.apis),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Hosting',
        type: 'bar',
        stack: 'total',
        data: thirdPartyData.costTrends.map(item => item.hosting),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Other',
        type: 'bar',
        stack: 'total',
        data: thirdPartyData.costTrends.map(item => item.other),
        itemStyle: { color: '#8b5cf6' }
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
        data: thirdPartyData.serviceDistribution
      }
    ]
  };

  const utilizationMetricsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: thirdPartyData.utilizationMetrics.services.map(s => s.name)
    },
    radar: {
      indicator: thirdPartyData.utilizationMetrics.categories.map(category => ({
        name: category,
        max: 100
      }))
    },
    series: [
      {
        type: 'radar',
        data: thirdPartyData.utilizationMetrics.services.map(service => ({
          value: service.data,
          name: service.name
        }))
      }
    ]
  };

  const costEfficiencyOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Total Cost', 'Business Value', 'Cost Efficiency']
    },
    xAxis: {
      type: 'category',
      data: thirdPartyData.costEfficiency.map(item => item.date)
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
        name: 'Score',
        min: 0,
        max: 100,
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Total Cost',
        type: 'bar',
        data: thirdPartyData.costEfficiency.map(item => item.cost),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Business Value',
        type: 'line',
        yAxisIndex: 1,
        data: thirdPartyData.costEfficiency.map(item => item.value),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Cost Efficiency',
        type: 'line',
        yAxisIndex: 1,
        data: thirdPartyData.costEfficiency.map(item => item.efficiency),
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Third-Party Costs</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and optimize costs for third-party services, APIs, and tools.
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

      <div id="third-party-costs-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="cost-trends">
            <BaseWidget
              title="Cost Trends"
              description="Track third-party service costs over time."
              fullWidth
            >
              <ReactECharts option={costTrendsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="service-distribution">
            <BaseWidget
              title="Service Distribution"
              description="Cost distribution across different service categories."
            >
              <ReactECharts option={serviceDistributionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="utilization-metrics">
            <BaseWidget
              title="Utilization Metrics"
              description="Service utilization and license coverage analysis."
            >
              <ReactECharts option={utilizationMetricsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="cost-efficiency">
            <BaseWidget
              title="Cost Efficiency"
              description="Analyze cost efficiency and business value metrics."
              fullWidth
            >
              <ReactECharts option={costEfficiencyOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}