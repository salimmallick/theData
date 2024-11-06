import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const ttiData = [
  {
    timestamp: '00:00',
    tti: 3.2,
    fcp: 1.8,
    fmp: 2.5
  },
  {
    timestamp: '00:05',
    tti: 3.0,
    fcp: 1.7,
    fmp: 2.3
  },
  {
    timestamp: '00:10',
    tti: 3.4,
    fcp: 1.9,
    fmp: 2.6
  },
  {
    timestamp: '00:15',
    tti: 3.1,
    fcp: 1.8,
    fmp: 2.4
  }
];

export function TimeToInteractiveWidget() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Time to Interactive', 'First Contentful Paint', 'First Meaningful Paint']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ttiData.map(item => item.timestamp)
    },
    yAxis: {
      type: 'value',
      name: 'Time (s)'
    },
    series: [
      {
        name: 'Time to Interactive',
        type: 'line',
        data: ttiData.map(item => item.tti),
        smooth: true,
        itemStyle: { color: '#3b82f6' },
        areaStyle: { opacity: 0.2 }
      },
      {
        name: 'First Contentful Paint',
        type: 'line',
        data: ttiData.map(item => item.fcp),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'First Meaningful Paint',
        type: 'line',
        data: ttiData.map(item => item.fmp),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Time to Interactive Analysis</h3>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}