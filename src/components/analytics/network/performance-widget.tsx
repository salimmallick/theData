import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactECharts from 'echarts-for-react';

export function NetworkPerformanceWidget() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      right: '20%'
    },
    legend: {
      data: ['Latency', 'Throughput']
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '00:05', '00:10', '00:15']
    },
    yAxis: [
      {
        type: 'value',
        name: 'Latency (ms)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Throughput (Mbps)',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Latency',
        type: 'line',
        data: [45, 42, 48, 43],
        smooth: true,
        yAxisIndex: 0
      },
      {
        name: 'Throughput',
        type: 'line',
        data: [250, 280, 260, 290],
        smooth: true,
        yAxisIndex: 1
      }
    ]
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Latency and Throughput Analysis</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Monitor network latency and throughput metrics over time to identify performance bottlenecks and optimize data flow.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}