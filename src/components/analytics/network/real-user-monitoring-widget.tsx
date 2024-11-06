import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const rumData = [
  {
    timestamp: '00:00',
    pageLoadTime: 2.1,
    sslConnectTime: 0.3,
    userCount: 1200
  },
  {
    timestamp: '00:05',
    pageLoadTime: 2.3,
    sslConnectTime: 0.28,
    userCount: 1350
  },
  {
    timestamp: '00:10',
    pageLoadTime: 2.0,
    sslConnectTime: 0.25,
    userCount: 1400
  },
  {
    timestamp: '00:15',
    pageLoadTime: 2.2,
    sslConnectTime: 0.27,
    userCount: 1320
  }
];

export function RealUserMonitoringWidget() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Page Load Time', 'SSL Connect Time', 'Active Users']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: rumData.map(item => item.timestamp)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Time (s)',
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
        name: 'Page Load Time',
        type: 'line',
        data: rumData.map(item => item.pageLoadTime),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'SSL Connect Time',
        type: 'line',
        data: rumData.map(item => item.sslConnectTime),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Active Users',
        type: 'bar',
        yAxisIndex: 1,
        data: rumData.map(item => item.userCount),
        itemStyle: { color: '#94a3b8', opacity: 0.3 }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Real User Performance</h3>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}