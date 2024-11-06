import ReactECharts from 'echarts-for-react';

interface EngagementData {
  interactions: Array<{
    date: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
  engagementRate: Array<{
    content: string;
    rate: number;
    benchmark: number;
  }>;
  sessionLength: Array<{
    duration: string;
    count: number;
  }>;
  churnAnalysis: Array<{
    segment: string;
    rate: number;
    risk: number;
  }>;
}

interface UserEngagementTrackingProps {
  data: EngagementData;
}

export function UserEngagementTracking({ data }: UserEngagementTrackingProps) {
  const interactionsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Likes', 'Comments', 'Shares']
    },
    xAxis: {
      type: 'category',
      data: data.interactions.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Likes',
        type: 'line',
        data: data.interactions.map(item => item.likes),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Comments',
        type: 'line',
        data: data.interactions.map(item => item.comments),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Shares',
        type: 'line',
        data: data.interactions.map(item => item.shares),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const engagementRateOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: data.engagementRate.map(item => item.content)
    },
    yAxis: {
      type: 'value',
      name: 'Rate (%)',
      max: 15
    },
    series: [
      {
        name: 'Engagement Rate',
        type: 'bar',
        data: data.engagementRate.map(item => item.rate),
        itemStyle: { color: '#3b82f6' },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      },
      {
        name: 'Benchmark',
        type: 'line',
        data: data.engagementRate.map(item => item.benchmark),
        itemStyle: { color: '#ef4444' },
        lineStyle: { type: 'dashed' }
      }
    ]
  };

  const sessionLengthOption = {
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
        data: data.sessionLength.map(item => ({
          name: item.duration,
          value: item.count
        }))
      }
    ]
  };

  const churnAnalysisOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Churn Rate', 'Risk Score']
    },
    xAxis: {
      type: 'category',
      data: data.churnAnalysis.map(item => item.segment)
    },
    yAxis: {
      type: 'value',
      name: 'Percentage (%)',
      max: 30
    },
    series: [
      {
        name: 'Churn Rate',
        type: 'bar',
        data: data.churnAnalysis.map(item => item.rate),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Risk Score',
        type: 'line',
        data: data.churnAnalysis.map(item => item.risk),
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <ReactECharts option={interactionsOption} style={{ height: '300px' }} />
      </div>
      <div>
        <ReactECharts option={engagementRateOption} style={{ height: '300px' }} />
      </div>
      <div>
        <ReactECharts option={sessionLengthOption} style={{ height: '300px' }} />
      </div>
      <div className="col-span-2">
        <ReactECharts option={churnAnalysisOption} style={{ height: '300px' }} />
      </div>
    </div>
  );
}