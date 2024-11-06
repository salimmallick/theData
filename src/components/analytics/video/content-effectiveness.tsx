import ReactECharts from 'echarts-for-react';

interface ContentData {
  completionRate: Array<{
    content: string;
    rate: number;
    totalViews: number;
  }>;
  shares: Array<{
    content: string;
    facebook: number;
    twitter: number;
    other: number;
  }>;
  feedback: Array<{
    term: string;
    count: number;
  }>;
  retention: Array<{
    timestamp: string;
    percentage: number;
    dropoff: number;
  }>;
}

interface ContentEffectivenessMetricsProps {
  data: ContentData;
}

export function ContentEffectivenessMetrics({ data }: ContentEffectivenessMetricsProps) {
  const completionRateOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: data.completionRate.map(item => item.content)
    },
    yAxis: {
      type: 'value',
      name: 'Completion Rate (%)',
      max: 100
    },
    series: [
      {
        name: 'Completion Rate',
        type: 'bar',
        data: data.completionRate.map(item => item.rate),
        itemStyle: { color: '#3b82f6' },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      }
    ]
  };

  const sharesOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Facebook', 'Twitter', 'Other']
    },
    xAxis: {
      type: 'category',
      data: data.shares.map(item => item.content)
    },
    yAxis: {
      type: 'value',
      name: 'Shares'
    },
    series: [
      {
        name: 'Facebook',
        type: 'bar',
        stack: 'total',
        data: data.shares.map(item => item.facebook),
        itemStyle: { color: '#1877f2' }
      },
      {
        name: 'Twitter',
        type: 'bar',
        stack: 'total',
        data: data.shares.map(item => item.twitter),
        itemStyle: { color: '#1da1f2' }
      },
      {
        name: 'Other',
        type: 'bar',
        stack: 'total',
        data: data.shares.map(item => item.other),
        itemStyle: { color: '#94a3b8' }
      }
    ]
  };

  const feedbackOption = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c}'
        },
        data: data.feedback.map(item => ({
          name: item.term,
          value: item.count
        }))
      }
    ]
  };

  const retentionOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: data.retention.map(item => item.timestamp)
    },
    yAxis: {
      type: 'value',
      name: 'Retention (%)',
      max: 100
    },
    series: [
      {
        name: 'Retention',
        type: 'line',
        data: data.retention.map(item => item.percentage),
        smooth: true,
        areaStyle: { opacity: 0.3 },
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <ReactECharts option={completionRateOption} style={{ height: '300px' }} />
      </div>
      <div>
        <ReactECharts option={sharesOption} style={{ height: '300px' }} />
      </div>
      <div>
        <ReactECharts option={feedbackOption} style={{ height: '300px' }} />
      </div>
      <div className="col-span-2">
        <ReactECharts option={retentionOption} style={{ height: '300px' }} />
      </div>
    </div>
  );
}