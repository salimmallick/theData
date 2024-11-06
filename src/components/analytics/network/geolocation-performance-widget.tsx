import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const geoData = [
  { name: 'North America', latency: 45, packetLoss: 0.2, users: 5000 },
  { name: 'Europe', latency: 85, packetLoss: 0.4, users: 3000 },
  { name: 'Asia', latency: 120, packetLoss: 0.6, users: 4000 },
  { name: 'South America', latency: 150, packetLoss: 0.8, users: 1000 },
  { name: 'Africa', latency: 180, packetLoss: 1.0, users: 500 },
  { name: 'Oceania', latency: 100, packetLoss: 0.5, users: 800 }
];

export function GeolocationPerformanceWidget() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Latency', 'Packet Loss', 'Active Users']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: geoData.map(item => item.name)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Latency (ms)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Users',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Latency',
        type: 'bar',
        data: geoData.map(item => item.latency),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Packet Loss',
        type: 'line',
        data: geoData.map(item => item.packetLoss),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Active Users',
        type: 'bar',
        yAxisIndex: 1,
        data: geoData.map(item => item.users),
        itemStyle: { color: '#22c55e', opacity: 0.3 }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Regional Performance Distribution</h3>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}