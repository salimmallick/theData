import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const incidentData = {
  metrics: [
    {
      time: "00:00",
      "Active Incidents": 2,
      "Resolved": 10,
    },
    {
      time: "00:05",
      "Active Incidents": 3,
      "Resolved": 11,
    },
    {
      time: "00:10",
      "Active Incidents": 3,
      "Resolved": 12,
    },
    {
      time: "00:15",
      "Active Incidents": 3,
      "Resolved": 12,
    },
  ]
};

export default function RealTimeIncidents() {
  const incidentTimelineOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Active Incidents', 'Resolved']
    },
    xAxis: {
      type: 'category',
      data: incidentData.metrics.map(item => item.time)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Active Incidents',
        type: 'bar',
        data: incidentData.metrics.map(item => item['Active Incidents']),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Resolved',
        type: 'line',
        data: incidentData.metrics.map(item => item.Resolved),
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Real-Time Incidents</h1>
        <p className="mt-2 text-muted-foreground">
          Track and manage active incidents in real-time.
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
            <CardTitle className="text-sm font-medium">Mean Time to Resolve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45m</div>
            <p className="text-xs text-muted-foreground">-5m from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams Engaged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Currently responding</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Incident Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={incidentTimelineOption} style={{ height: '300px' }} />
        </CardContent>
      </Card>
    </div>
  );
}