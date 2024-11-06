import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactECharts from 'echarts-for-react';

export function AnomalyDetectionWidget() {
  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Network Traffic', 'Anomalies']
    },
    grid: {
      right: '5%'
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: 'Traffic (Mbps)'
    },
    series: [
      {
        name: 'Network Traffic',
        type: 'line',
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        }
      },
      {
        name: 'Anomalies',
        type: 'scatter',
        data: [
          [1, 932],
          [4, 1290],
          [5, 1330]
        ],
        symbolSize: 20,
        itemStyle: {
          color: '#ff4d4f'
        }
      }
    ]
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Anomaly Detection</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Detect and highlight unusual patterns in network performance metrics using machine learning algorithms.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ReactECharts option={chartOption} style={{ height: '300px' }} />
    </Card>
  );
}