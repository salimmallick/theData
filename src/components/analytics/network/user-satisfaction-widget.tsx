import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const satisfactionData = {
  nps: {
    current: 45,
    trend: [35, 38, 42, 45, 43, 45],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  satisfaction: {
    categories: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    values: [30, 45, 15, 7, 3]
  }
};

export function UserSatisfactionWidget() {
  const gaugeOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: -100,
        max: 100,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#ef4444'],
              [0.5, '#f59e0b'],
              [0.75, '#3b82f6'],
              [1, '#22c55e']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 20
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: function(value: number) {
            return value.toFixed(0);
          },
          color: 'auto'
        },
        data: [
          {
            value: satisfactionData.nps.current,
            name: 'NPS Score'
          }
        ]
      }
    ]
  };

  const trendOption = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: satisfactionData.nps.labels
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100
    },
    series: [
      {
        data: satisfactionData.nps.trend,
        type: 'line',
        smooth: true,
        areaStyle: {
          opacity: 0.3
        },
        itemStyle: {
          color: '#3b82f6'
        }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">User Satisfaction Overview</h3>
      <div className="grid grid-cols-2 gap-6">
        <ReactECharts option={gaugeOption} style={{ height: '400px' }} />
        <ReactECharts option={trendOption} style={{ height: '400px' }} />
      </div>
    </Card>
  );
}