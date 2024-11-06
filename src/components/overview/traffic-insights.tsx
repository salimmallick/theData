import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import ReactECharts from 'echarts-for-react';

const trafficData = [
  {
    time: "00:00",
    currentTraffic: 1200,
    peakTraffic: 2000,
  },
  {
    time: "00:05",
    currentTraffic: 1500,
    peakTraffic: 2000,
  },
  {
    time: "00:10",
    currentTraffic: 1800,
    peakTraffic: 2000,
  },
];

export function TrafficInsights() {
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
      data: ['Current Traffic', 'Peak Traffic']
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
      data: trafficData.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Current Traffic',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: trafficData.map(item => item.currentTraffic),
        smooth: true,
        itemStyle: { color: '#8b5cf6' }
      },
      {
        name: 'Peak Traffic',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: trafficData.map(item => item.peakTraffic),
        smooth: true,
        itemStyle: { color: '#6366f1' }
      }
    ]
  };

  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Traffic Insights</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Monitor real-time traffic patterns and geographic distribution</p>
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