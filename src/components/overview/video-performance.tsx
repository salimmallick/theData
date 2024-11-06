import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import ReactECharts from 'echarts-for-react';

const videoMetrics = [
  {
    date: "2024-01-01",
    totalViews: 25000,
    averageBitrate: 2.5,
    playbackFailures: 120,
  },
  {
    date: "2024-01-02",
    totalViews: 27500,
    averageBitrate: 2.7,
    playbackFailures: 95,
  },
  {
    date: "2024-01-03",
    totalViews: 29000,
    averageBitrate: 2.6,
    playbackFailures: 85,
  },
];

export function VideoPerformance() {
  const areaChartOption = {
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
      boundaryGap: false,
      data: videoMetrics.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Total Views',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: videoMetrics.map(item => item.totalViews),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: videoMetrics.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Playback Failures',
        type: 'bar',
        data: videoMetrics.map(item => item.playbackFailures),
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  return (
    <Card className="border shadow-sm dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Video Performance</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Monitor video streaming performance metrics including views, bitrate, and playback issues</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-4">Viewing Trends</h3>
            <ReactECharts option={areaChartOption} style={{ height: '300px' }} />
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-4">Playback Issues</h3>
            <ReactECharts option={barChartOption} style={{ height: '300px' }} />
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}