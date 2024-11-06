import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const cdnData = [
  {
    timestamp: '00:00',
    latency: 45,
    cacheHitRate: 92,
    waitTime: 120
  },
  {
    timestamp: '00:05',
    latency: 42,
    cacheHitRate: 94,
    waitTime: 115
  },
  {
    timestamp: '00:10',
    latency: 48,
    cacheHitRate: 91,
    waitTime: 125
  },
  {
    timestamp: '00:15',
    latency: 44,
    cacheHitRate: 93,
    waitTime: 118
  }
];

export function CDNPerformanceWidget() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['CDN Latency', 'Cache Hit Rate', 'Wait Time']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: cdnData.map(item => item.timestamp)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Time (ms)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Cache Hit Rate (%)',
        position: 'right',
        max: 100,
        min: 80
      }
    ],
    series: [
      {
        name: 'CDN Latency',
        type: 'line',
        data: cdnData.map(item => item.latency),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Cache Hit Rate',
        type: 'line',
        yAxisIndex: 1,
        data: cdnData.map(item => item.cacheHitRate),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Wait Time',
        type: 'line',
        data: cdnData.map(item => item.waitTime),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">CDN Performance Metrics</h3>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}