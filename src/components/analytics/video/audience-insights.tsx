import ReactECharts from 'echarts-for-react';

interface AudienceInsightsProps {
  data?: {
    demographics: {
      age: { group: string; value: number }[];
      gender: { group: string; value: number }[];
      location: { region: string; value: number }[];
    };
    viewingHabits: {
      time: string;
      viewers: number;
    }[];
  };
}

export function AudienceInsights({ data }: AudienceInsightsProps) {
  // Use default data if none provided
  const defaultData = {
    demographics: {
      age: [
        { group: '18-24', value: 25 },
        { group: '25-34', value: 35 },
        { group: '35-44', value: 20 },
        { group: '45-54', value: 12 },
        { group: '55+', value: 8 }
      ],
      gender: [
        { group: 'Male', value: 55 },
        { group: 'Female', value: 43 },
        { group: 'Other', value: 2 }
      ],
      location: [
        { region: 'North America', value: 40 },
        { region: 'Europe', value: 30 },
        { region: 'Asia', value: 20 },
        { region: 'Others', value: 10 }
      ]
    },
    viewingHabits: [
      { time: '00:00', viewers: 1200 },
      { time: '06:00', viewers: 800 },
      { time: '12:00', viewers: 2500 },
      { time: '18:00', viewers: 3000 },
      { time: '23:00', viewers: 1800 }
    ]
  };

  const chartData = data || defaultData;

  const demographicsOption = {
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
        name: 'Age Distribution',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: '{b}: {c}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        data: chartData.demographics.age.map(item => ({
          name: item.group,
          value: item.value
        }))
      }
    ]
  };

  const viewingHabitsOption = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: chartData.viewingHabits.map(item => item.time)
    },
    yAxis: {
      type: 'value',
      name: 'Viewers'
    },
    series: [
      {
        name: 'Active Viewers',
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: chartData.viewingHabits.map(item => item.viewers),
        itemStyle: { color: '#3b82f6' }
      }
    ]
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium mb-4">Demographics</h3>
        <ReactECharts option={demographicsOption} style={{ height: '300px' }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Viewing Habits</h3>
        <ReactECharts option={viewingHabitsOption} style={{ height: '300px' }} />
      </div>
    </div>
  );
}