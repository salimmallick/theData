import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const webVitalsData = [
  {
    metric: 'LCP',
    value: 2.4,
    threshold: 2.5,
    unit: 's',
    status: 'good'
  },
  {
    metric: 'FID',
    value: 85,
    threshold: 100,
    unit: 'ms',
    status: 'good'
  },
  {
    metric: 'CLS',
    value: 0.12,
    threshold: 0.1,
    unit: '',
    status: 'needs improvement'
  },
  {
    metric: 'TTFB',
    value: 0.8,
    threshold: 0.9,
    unit: 's',
    status: 'good'
  }
];

export function CoreWebVitalsWidget() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#22c55e';
      case 'needs improvement':
        return '#f59e0b';
      case 'poor':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const data = webVitalsData[params[0].dataIndex];
        return `${data.metric}<br/>
                Value: ${data.value}${data.unit}<br/>
                Threshold: ${data.threshold}${data.unit}<br/>
                Status: ${data.status}`;
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
      data: webVitalsData.map(item => item.metric)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `${value}${value > 1 ? 'ms' : 's'}`
      }
    },
    series: [
      {
        name: 'Value',
        type: 'bar',
        data: webVitalsData.map(item => ({
          value: item.value,
          itemStyle: {
            color: getStatusColor(item.status)
          }
        })),
        label: {
          show: true,
          position: 'top',
          formatter: (params: any) => {
            const data = webVitalsData[params.dataIndex];
            return `${params.value}${data.unit}`;
          }
        }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Core Web Vitals Overview</h3>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}