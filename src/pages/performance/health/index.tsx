import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const healthData = {
  metrics: [
    {
      date: "Jan 23",
      Healthy: 42,
      Degraded: 3,
      Failed: 1,
    },
    {
      date: "Feb 23",
      Healthy: 43,
      Degraded: 2,
      Failed: 1,
    },
    {
      date: "Mar 23",
      Healthy: 44,
      Degraded: 2,
      Failed: 0,
    },
    {
      date: "Apr 23",
      Healthy: 45,
      Degraded: 2,
      Failed: 0,
    },
  ]
};

export default function ServiceHealth() {
  const healthTrendsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Healthy', 'Degraded', 'Failed']
    },
    xAxis: {
      type: 'category',
      data: healthData.metrics.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Healthy',
        type: 'bar',
        stack: 'total',
        data: healthData.metrics.map(item => item.Healthy),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Degraded',
        type: 'bar',
        stack: 'total',
        data: healthData.metrics.map(item => item.Degraded),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Failed',
        type: 'bar',
        stack: 'total',
        data: healthData.metrics.map(item => item.Failed),
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Service Health</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor the health and status of all services.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+2 from last check</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Degraded Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">-1 from last check</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No change</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+1 new service</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Service Health Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={healthTrendsOption} style={{ height: '300px' }} />
        </CardContent>
      </Card>
    </div>
  );
}