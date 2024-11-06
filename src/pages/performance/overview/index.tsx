import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const performanceData = [
  {
    date: "Jan 23",
    "Response Time": 145,
    "Error Rate": 2.3,
  },
  {
    date: "Feb 23",
    "Response Time": 139,
    "Error Rate": 2.1,
  },
  {
    date: "Mar 23",
    "Response Time": 134,
    "Error Rate": 2.0,
  },
  {
    date: "Apr 23",
    "Response Time": 133,
    "Error Rate": 1.8,
  },
  {
    date: "May 23",
    "Response Time": 127,
    "Error Rate": 1.7,
  },
  {
    date: "Jun 23",
    "Response Time": 125,
    "Error Rate": 1.5,
  },
];

const requestData = [
  {
    endpoint: "/api/users",
    requests: 450,
  },
  {
    endpoint: "/api/products",
    requests: 670,
  },
  {
    endpoint: "/api/orders",
    requests: 234,
  },
  {
    endpoint: "/api/auth",
    requests: 890,
  },
];

export default function PerformanceOverview() {
  const performanceTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Response Time', 'Error Rate']
    },
    xAxis: {
      type: 'category',
      data: performanceData.map(item => item.date)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Response Time (ms)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Error Rate (%)',
        position: 'right',
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: 'Response Time',
        type: 'line',
        data: performanceData.map(item => item['Response Time']),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Error Rate',
        type: 'line',
        yAxisIndex: 1,
        data: performanceData.map(item => item['Error Rate']),
        smooth: true,
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const requestDistributionOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: requestData.map(item => item.endpoint)
    },
    yAxis: {
      type: 'value',
      name: 'Requests/s'
    },
    series: [
      {
        type: 'bar',
        data: requestData.map(item => item.requests),
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor and analyze overall system performance metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125ms</div>
            <p className="text-xs text-muted-foreground">-12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5%</div>
            <p className="text-xs text-muted-foreground">-0.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">+0.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5k/s</div>
            <p className="text-xs text-muted-foreground">+300/s from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactECharts option={performanceTrendsOption} style={{ height: '300px' }} />
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Request Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactECharts option={requestDistributionOption} style={{ height: '300px' }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}