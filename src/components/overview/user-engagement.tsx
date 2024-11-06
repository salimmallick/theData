import { Card } from '../ui/card';
import ReactECharts from 'echarts-for-react';

const userEngagementData = [
  {
    date: "2024-01-01",
    dailyActiveUsers: 12500,
    sessionDuration: 15,
    retentionRate: 85,
  },
  {
    date: "2024-01-02",
    dailyActiveUsers: 13200,
    sessionDuration: 16,
    retentionRate: 86,
  },
  {
    date: "2024-01-03",
    dailyActiveUsers: 14100,
    sessionDuration: 14,
    retentionRate: 84,
  },
];

export function UserEngagement() {
  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
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
      data: userEngagementData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Daily Active Users',
        type: 'bar',
        data: userEngagementData.map(item => item.dailyActiveUsers),
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  const lineChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Retention Rate', 'Session Duration']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: userEngagementData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Retention Rate',
        type: 'line',
        data: userEngagementData.map(item => item.retentionRate),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Session Duration',
        type: 'line',
        data: userEngagementData.map(item => item.sessionDuration),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Daily Active Users</h3>
        <ReactECharts option={barChartOption} style={{ height: '300px' }} />
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">User Retention & Session Duration</h3>
        <ReactECharts option={lineChartOption} style={{ height: '300px' }} />
      </Card>
    </div>
  );
}