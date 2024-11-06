import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactECharts from 'echarts-for-react';

export function NetworkForecastWidget() {
  const chartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Expected Load', 'Capacity']
    },
    grid: {
      right: '5%'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: 'Network Load (Gbps)'
    },
    series: [
      {
        name: 'Expected Load',
        type: 'line',
        data: [5, 7, 8, 6, 9, 10, 8],
        smooth: true,
        areaStyle: {
          opacity: 0.3
        }
      },
      {
        name: 'Capacity',
        type: 'line',
        data: [10, 10, 10, 10, 10, 10, 10],
        lineStyle: {
          type: 'dashed'
        }
      }
    ]
  };

  return (
    <Card className="p-6 col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Network Demand Forecast</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Forecast expected network demand and compare against available capacity for proactive resource planning.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ReactECharts option={chartOption} style={{ height: '300px' }} />
    </Card>
  );
}