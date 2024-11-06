import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const errorData = {
  metrics: [
    {
      time: "00:00",
      "Error Rate": 1.8,
    },
    {
      time: "04:00",
      "Error Rate": 1.6,
    },
    {
      time: "08:00",
      "Error Rate": 1.7,
    },
    {
      time: "12:00",
      "Error Rate": 1.5,
    },
    {
      time: "16:00",
      "Error Rate": 1.4,
    },
    {
      time: "20:00",
      "Error Rate": 1.5,
    },
  ]
};

const errorTypes = [
  {
    type: "400 Bad Request",
    count: 45,
  },
  {
    type: "401 Unauthorized",
    count: 23,
  },
  {
    type: "403 Forbidden",
    count: 15,
  },
  {
    type: "404 Not Found",
    count: 15,
  },
  {
    type: "500 Server Error",
    count: 35,
  },
  {
    type: "503 Service Unavailable",
    count: 12,
  },
];

export default function ErrorRates() {
  const errorRateOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: errorData.metrics.map(item => item.time)
    },
    yAxis: {
      type: 'value',
      name: 'Error Rate (%)',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'Error Rate',
        type: 'line',
        data: errorData.metrics.map(item => item["Error Rate"]),
        smooth: true,
        areaStyle: { opacity: 0.3 },
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const errorTypesOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: errorTypes.map(item => item.type)
    },
    yAxis: {
      type: 'value',
      name: 'Count'
    },
    series: [
      {
        type: 'bar',
        data: errorTypes.map(item => ({
          value: item.count,
          itemStyle: { color: '#ef4444' }
        })),
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Error Rates</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor and analyze error rates across services.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5%</div>
            <p className="text-xs text-muted-foreground">-0.2% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">4xx Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-muted-foreground">67% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">5xx Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">33% of total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Error Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactECharts option={errorRateOption} style={{ height: '300px' }} />
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Errors by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactECharts option={errorTypesOption} style={{ height: '300px' }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}