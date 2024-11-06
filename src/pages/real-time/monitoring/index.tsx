import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const monitoringData = {
  metrics: [
    {
      time: "00:00",
      "CPU Usage": 45,
      "Memory Usage": 62,
    },
    {
      time: "00:05",
      "CPU Usage": 52,
      "Memory Usage": 65,
    },
    {
      time: "00:10",
      "CPU Usage": 48,
      "Memory Usage": 63,
    },
    {
      time: "00:15",
      "CPU Usage": 51,
      "Memory Usage": 64,
    },
    {
      time: "00:20",
      "CPU Usage": 46,
      "Memory Usage": 62,
    },
  ]
};

const requestData = [
  {
    service: "API Gateway",
    requests: 450,
  },
  {
    service: "Auth Service",
    requests: 670,
  },
  {
    service: "Database",
    requests: 234,
  },
  {
    service: "Cache",
    requests: 890,
  },
];

export default function RealTimeMonitoring() {
  const resourceUsageOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['CPU Usage', 'Memory Usage']
    },
    xAxis: {
      type: 'category',
      data: monitoringData.metrics.map(item => item.time)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'CPU Usage',
        type: 'line',
        data: monitoringData.metrics.map(item => item['CPU Usage']),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Memory Usage',
        type: 'line',
        data: monitoringData.metrics.map(item => item['Memory Usage']),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  const requestRateOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: requestData.map(item => item.service)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}/s'
      }
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
        <h1 className="text-3xl font-bold">Real-Time Monitoring</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor system performance and health metrics in real-time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">46%</div>
            <p className="text-xs text-muted-foreground">-2% from 5min ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62%</div>
            <p className="text-xs text-muted-foreground">+1% from 5min ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4GB/s</div>
            <p className="text-xs text-muted-foreground">+0.2GB/s from 5min ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+123 from 5min ago</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>System Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactECharts option={resourceUsageOption} style={{ height: '300px' }} />
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Request Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactECharts option={requestRateOption} style={{ height: '300px' }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}