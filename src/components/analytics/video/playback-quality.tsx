import ReactECharts from 'echarts-for-react';

interface PlaybackQualityProps {
  data?: {
    bitrate: number[];
    buffering: number[];
    failures: number[];
    timestamps: string[];
  };
}

export function PlaybackQualityMetrics({ data }: PlaybackQualityProps) {
  // Use default data if none provided
  const defaultData = {
    timestamps: ['00:00', '00:05', '00:10', '00:15', '00:20'],
    bitrate: [3500, 3200, 3800, 3600, 3400],
    buffering: [2.5, 3.1, 2.8, 2.2, 2.9],
    failures: [1, 2, 0, 1, 1]
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
      data: ['Bitrate (kbps)', 'Buffering (%)', 'Playback Failures']
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
        name: 'Bitrate',
        position: 'left',
        axisLabel: {
          formatter: '{value} kbps'
        }
      },
      {
        type: 'value',
        name: 'Percentage',
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
        name: 'Bitrate (kbps)',
        type: 'line',
        data: chartData.bitrate,
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Buffering (%)',
        type: 'line',
        yAxisIndex: 1,
        data: chartData.buffering,
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Playback Failures',
        type: 'bar',
        data: chartData.failures,
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
}