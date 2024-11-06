import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import ReactECharts from 'echarts-for-react';

const observabilityData = [
  {
    time: "00:00",
    errorRate: 0.5,
    systemHealth: 98,
    logVolume: 1200,
  },
  {
    time: "00:05",
    errorRate: 0.8,
    systemHealth: 97,
    logVolume: 1500,
  },
  {
    time: "00:10",
    errorRate: 0.3,
    systemHealth: 99,
    logVolume: 1100,
  },
];

export function ObservabilityInsights() {
  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['System Health', 'Error Rate', 'Log Volume']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: observabilityData.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'System Health',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: observabilityData.map(item => item.systemHealth),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Error Rate',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: observabilityData.map(item => item.errorRate),
        smooth: true,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Log Volume',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: observabilityData.map(item => item.logVolume),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Observability Insights</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Monitor system health, error rates, and logging patterns</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <ReactECharts option={chartOption} style={{ height: '300px' }} />
      </CardContent>
    </Card>
  );
}