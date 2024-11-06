import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import ReactECharts from 'echarts-for-react';

const networkMetrics = [
  {
    time: "00:00",
    latency: 45,
    packetLoss: 0.2,
    loadTime: 250,
  },
  {
    time: "00:05",
    latency: 42,
    packetLoss: 0.15,
    loadTime: 245,
  },
  {
    time: "00:10",
    latency: 48,
    packetLoss: 0.25,
    loadTime: 260,
  },
];

export function NetworkPerformance() {
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
      data: ['Latency', 'Packet Loss', 'Load Time']
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
      data: networkMetrics.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Latency',
        type: 'line',
        data: networkMetrics.map(item => item.latency),
        smooth: true,
        lineStyle: { width: 2 },
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Packet Loss',
        type: 'line',
        data: networkMetrics.map(item => item.packetLoss),
        smooth: true,
        lineStyle: { width: 2 },
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Load Time',
        type: 'line',
        data: networkMetrics.map(item => item.loadTime),
        smooth: true,
        lineStyle: { width: 2 },
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Network Performance</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Monitor real-time network performance metrics including latency, packet loss, and load times</p>
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