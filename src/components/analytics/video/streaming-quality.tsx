import ReactECharts from 'echarts-for-react';

interface StreamingQualityProps {
  data?: {
    stability: number[];
    variance: number[];
    errorRate: number[];
    timestamps: string[];
  };
}

export function StreamingQualityMetrics({ data }: StreamingQualityProps) {
  // Use default data if none provided
  const defaultData = {
    timestamps: ['00:00', '00:05', '00:10', '00:15', '00:20'],
    stability: [95, 94, 96, 93, 95],
    variance: [2.5, 3.1, 2.8, 3.2, 2.9],
    errorRate: [0.5, 0.8, 0.4, 0.6, 0.5]
  };

  const chartData = data || defaultData;

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Stream Stability', 'Quality Variance', 'Error Rate']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.timestamps
    },
    yAxis: [
      {
        type: 'value',
        name: 'Percentage',
        min: 0,
        max: 100,
        position: 'left',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      {
        type: 'value',
        name: 'Error Rate',
        min: 0,
        max: 5,
        position: 'right',
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: 'Stream Stability',
        type: 'line',
        data: chartData.stability,
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Quality Variance',
        type: 'line',
        data: chartData.variance,
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Error Rate',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.errorRate,
        smooth: true,
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
}