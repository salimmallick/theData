import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const serviceData = {
  metrics: [
    {
      time: "00:00",
      "API Gateway": 120,
      "Auth Service": 145,
      "Database": 180,
      "Cache": 45,
    },
    {
      time: "00:05",
      "API Gateway": 115,
      "Auth Service": 140,
      "Database": 190,
      "Cache": 43,
    },
    {
      time: "00:10",
      "API Gateway": 118,
      "Auth Service": 142,
      "Database": 195,
      "Cache": 44,
    },
    {
      time: "00:15",
      "API Gateway": 122,
      "Auth Service": 147,
      "Database": 185,
      "Cache": 46,
    },
  ]
};

export default function ServiceStatus() {
  const responseTimeOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['API Gateway', 'Auth Service', 'Database', 'Cache']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: serviceData.metrics.map(item => item.time)
    },
    yAxis: {
      type: 'value',
      name: 'Response Time (ms)'
    },
    series: [
      {
        name: 'API Gateway',
        type: 'line',
        data: serviceData.metrics.map(item => item['API Gateway']),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Auth Service',
        type: 'line',
        data: serviceData.metrics.map(item => item['Auth Service']),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Database',
        type: 'line',
        data: serviceData.metrics.map(item => item['Database']),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Cache',
        type: 'line',
        data: serviceData.metrics.map(item => item['Cache']),
        smooth: true,
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Service Status</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor the real-time status of all services and components.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Gateway</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="text-xs text-muted-foreground">100% uptime last 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auth Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="text-xs text-muted-foreground">99.9% uptime last 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">Degraded</div>
            <p className="text-xs text-muted-foreground">High latency detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cache</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="text-xs text-muted-foreground">100% uptime last 24h</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Service Response Times</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={responseTimeOption} style={{ height: '300px' }} />
        </CardContent>
      </Card>
    </div>
  );
}