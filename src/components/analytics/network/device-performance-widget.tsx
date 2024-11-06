import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const deviceData = {
  categories: ['Mobile', 'Desktop', 'Tablet', 'Smart TV', 'Gaming Console'],
  metrics: [
    {
      name: 'Load Time',
      data: [3.5, 2.1, 2.8, 4.2, 3.1]
    },
    {
      name: 'Error Rate',
      data: [1.2, 0.8, 1.0, 1.5, 1.3]
    },
    {
      name: 'User Count',
      data: [15000, 12000, 5000, 2000, 1000]
    }
  ]
};

export function DevicePerformanceWidget() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Load Time', 'Error Rate', 'User Count']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: deviceData.categories
    },
    yAxis: [
      {
        type: 'value',
        name: 'Time (s) / Rate (%)',
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
        name: 'Load Time',
        type: 'bar',
        data: deviceData.metrics[0].data,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Error Rate',
        type: 'line',
        data: deviceData.metrics[1].data,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'User Count',
        type: 'bar',
        yAxisIndex: 1,
        data: deviceData.metrics[2].data,
        itemStyle: { color: '#22c55e', opacity: 0.3 }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Device Performance Metrics</h3>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}