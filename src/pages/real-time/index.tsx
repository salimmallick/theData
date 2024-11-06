import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const systemMetricsData = [
  {
    time: "00:00",
    "CPU Usage": 45,
    "Memory Usage": 62,
    "Network Load": 34,
  },
  {
    time: "00:05",
    "CPU Usage": 52,
    "Memory Usage": 65,
    "Network Load": 38,
  },
  {
    time: "00:10",
    "CPU Usage": 48,
    "Memory Usage": 63,
    "Network Load": 36,
  },
];

export default function RealTimeNOC() {
  const systemMetricsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['CPU Usage', 'Memory Usage', 'Network Load']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: systemMetricsData.map(item => item.time)
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
        data: systemMetricsData.map(item => item['CPU Usage']),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Memory Usage',
        type: 'line',
        data: systemMetricsData.map(item => item['Memory Usage']),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Network Load',
        type: 'line',
        data: systemMetricsData.map(item => item['Network Load']),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Real-Time NOC</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor system performance and incidents in real-time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 in last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">-5% from 5min ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145ms</div>
            <p className="text-xs text-muted-foreground">+10ms from 5min ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.8%</div>
            <p className="text-xs text-muted-foreground">-0.2% from 5min ago</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>System Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={systemMetricsOption} style={{ height: '300px' }} />
        </CardContent>
      </Card>
    </div>
  );
}