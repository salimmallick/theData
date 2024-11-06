import { Card } from '../ui/card';
import ReactECharts from 'echarts-for-react';

const performanceData = [
  {
    date: "2024-01-01",
    responseTime: 120,
    errorRate: 0.8,
    uptime: 99.9,
  },
  {
    date: "2024-01-02",
    responseTime: 115,
    errorRate: 0.7,
    uptime: 100,
  },
  {
    date: "2024-01-03",
    responseTime: 118,
    errorRate: 0.9,
    uptime: 99.95,
  },
];

const resourceUtilization = [
  { name: "CPU", value: 65 },
  { name: "Memory", value: 78 },
  { name: "Storage", value: 45 },
  { name: "Network", value: 52 },
];

export function PerformanceOverview() {
  const areaChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Response Time', 'Error Rate', 'Uptime']
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
      data: performanceData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Response Time',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: performanceData.map(item => item.responseTime),
        smooth: true,
        lineStyle: { width: 2 },
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Error Rate',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: performanceData.map(item => item.errorRate),
        smooth: true,
        lineStyle: { width: 2 },
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Uptime',
        type: 'line',
        areaStyle: { opacity: 0.3 },
        data: performanceData.map(item => item.uptime),
        smooth: true,
        lineStyle: { width: 2 },
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  const pieChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: resourceUtilization
      }
    ]
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Performance Metrics</h3>
        <ReactECharts option={areaChartOption} style={{ height: '300px' }} />
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Resource Utilization</h3>
        <ReactECharts option={pieChartOption} style={{ height: '300px' }} />
      </Card>
    </div>
  );
}