import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const alertData = {
  metrics: [
    {
      time: "00:00",
      Critical: 1,
      Warning: 7,
      Info: 9,
    },
    {
      time: "00:05",
      Critical: 2,
      Warning: 5,
      Info: 12,
    },
    {
      time: "00:10",
      Critical: 2,
      Warning: 6,
      Info: 10,
    },
    {
      time: "00:15",
      Critical: 2,
      Warning: 5,
      Info: 12,
    },
  ]
};

export default function RealTimeAlerts() {
  const alertFrequencyOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Critical', 'Warning', 'Info']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: alertData.metrics.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Critical',
        type: 'bar',
        stack: 'total',
        data: alertData.metrics.map(item => item.Critical),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Warning',
        type: 'bar',
        stack: 'total',
        data: alertData.metrics.map(item => item.Warning),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Info',
        type: 'bar',
        stack: 'total',
        data: alertData.metrics.map(item => item.Info),
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Real-Time Alerts</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor and manage active alerts across all services.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">2</div>
            <p className="text-xs text-muted-foreground">+1 in last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">5</div>
            <p className="text-xs text-muted-foreground">-2 in last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Info Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">12</div>
            <p className="text-xs text-muted-foreground">+3 in last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19</div>
            <p className="text-xs text-muted-foreground">+2 in last hour</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Alert Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={alertFrequencyOption} style={{ height: '300px' }} />
        </CardContent>
      </Card>
    </div>
  );
}