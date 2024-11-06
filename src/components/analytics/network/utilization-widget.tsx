import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactECharts from 'echarts-for-react';

export function NetworkUtilizationWidget() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Bandwidth Usage', 'Active Connections', 'Load Time']
    },
    grid: {
      right: '20%'
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '00:05', '00:10', '00:15']
    },
    yAxis: [
      {
        type: 'value',
        name: 'Bandwidth (Mbps)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Connections',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Bandwidth Usage',
        type: 'line',
        areaStyle: {},
        data: [450, 500, 480, 520],
        smooth: true
      },
      {
        name: 'Active Connections',
        type: 'line',
        yAxisIndex: 1,
        data: [1200, 1300, 1250, 1400],
        smooth: true
      },
      {
        name: 'Load Time',
        type: 'line',
        data: [250, 230, 240, 235],
        smooth: true
      }
    ]
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Network Utilization Overview</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Track bandwidth usage, active connections, and load times to assess overall network capacity and resource utilization.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}