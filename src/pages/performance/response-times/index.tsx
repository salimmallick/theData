import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const responseTimeData = {
  metrics: [
    {
      time: "00:00",
      Average: 120,
      "95th": 245,
      "99th": 350,
    },
    {
      time: "04:00",
      Average: 115,
      "95th": 240,
      "99th": 345,
    },
    {
      time: "08:00",
      Average: 130,
      "95th": 255,
      "99th": 360,
    },
    {
      time: "12:00",
      Average: 125,
      "95th": 250,
      "99th": 355,
    },
    {
      time: "16:00",
      Average: 135,
      "95th": 260,
      "99th": 365,
    },
    {
      time: "20:00",
      Average: 125,
      "95th": 250,
      "99th": 355,
    },
  ]
};

export default function ResponseTimes() {
  const responseTimeOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Average', '95th Percentile', '99th Percentile']
    },
    xAxis: {
      type: 'category',
      data: responseTimeData.metrics.map(item => item.time)
    },
    yAxis: {
      type: 'value',
      name: 'Response Time (ms)',
      axisLabel: {
        formatter: '{value} ms'
      }
    },
    series: [
      {
        name: 'Average',
        type: 'line',
        data: responseTimeData.metrics.map(item => item.Average),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: '95th Percentile',
        type: 'line',
        data: responseTimeData.metrics.map(item => ['95th']),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: '99th Percentile',
        type: 'line',
        data: responseTimeData.metrics.map(item => item['99th']),
        smooth: true,
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Response Times</h1>
        <p className="mt-2 text-muted-foreground">
          Track and analyze service response times and latency.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125ms</div>
            <p className="text-xs text-muted-foreground">-15ms from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">95th Percentile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250ms</div>
            <p className="text-xs text-muted-foreground">-25ms from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slowest Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450ms</div>
            <p className="text-xs text-muted-foreground">/api/analytics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fastest Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45ms</div>
            <p className="text-xs text-muted-foreground">/api/health</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Response Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={responseTimeOption} style={{ height: '300px' }} />
        </CardContent>
      </Card>
    </div>
  );
}