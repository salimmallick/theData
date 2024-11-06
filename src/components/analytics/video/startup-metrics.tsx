import ReactECharts from 'echarts-for-react';

interface StartupMetricsProps {
  data?: {
    startupTime: number[];
    firstFrame: number[];
    successRate: number[];
    timestamps: string[];
  };
}

export function StartupMetrics({ data }: StartupMetricsProps) {
  // Use default data if none provided
  const defaultData = {
    timestamps: ['00:00', '00:05', '00:10', '00:15', '00:20'],
    startupTime: [2.5, 2.3, 2.8, 2.4, 2.6],
    firstFrame: [1.2, 1.1, 1.3, 1.2, 1.2],
    successRate: [98, 99, 97, 98, 99]
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
      data: ['Startup Time (s)', 'First Frame (s)', 'Success Rate (%)']
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
        name: 'Time (s)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Success Rate',
        min: 0,
        max: 100,
        position: 'right',
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: 'Startup Time (s)',
        type: 'line',
        data: chartData.startupTime,
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'First Frame (s)',
        type: 'line',
        data: chartData.firstFrame,
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Success Rate (%)',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.successRate,
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
}