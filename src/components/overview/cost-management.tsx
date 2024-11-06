import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import ReactECharts from 'echarts-for-react';

const costData = [
  {
    month: "Jan",
    totalSpend: 12500,
    budget: 15000,
  },
  {
    month: "Feb",
    totalSpend: 13200,
    budget: 15000,
  },
  {
    month: "Mar",
    totalSpend: 14100,
    budget: 15000,
  },
];

export function CostManagement() {
  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Total Spend', 'Budget']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: costData.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Total Spend',
        type: 'bar',
        data: costData.map(item => item.totalSpend),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Budget',
        type: 'bar',
        data: costData.map(item => item.budget),
        itemStyle: { color: '#94a3b8' }
      }
    ]
  };

  const lineChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: costData.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `$${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: 'Total Spend',
        type: 'line',
        data: costData.map(item => item.totalSpend),
        smooth: true,
        itemStyle: { color: '#22c55e' },
        areaStyle: { opacity: 0.3 }
      }
    ]
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Cost Management</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Track and analyze costs across your infrastructure and services</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-4">Monthly Spend vs Budget</h3>
            <ReactECharts option={barChartOption} style={{ height: '300px' }} />
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-4">Cost Trends</h3>
            <ReactECharts option={lineChartOption} style={{ height: '300px' }} />
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}