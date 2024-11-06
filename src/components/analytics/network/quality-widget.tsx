import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactECharts from 'echarts-for-react';

export function NetworkQualityWidget() {
  const gaugeOption = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#ff6e76'],
            [0.7, '#fddd60'],
            [1, '#7cffb2']
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
        fontSize: 30
      },
      detail: {
        fontSize: 50,
        offsetCenter: [0, '0%'],
        valueAnimation: true,
        formatter: '{value}',
        color: 'auto'
      },
      data: [{
        value: 85,
        name: 'Score'
      }]
    }]
  };

  const radarOption = {
    radar: {
      indicator: [
        { name: 'Latency', max: 100 },
        { name: 'Packet Loss', max: 100 },
        { name: 'Jitter', max: 100 },
        { name: 'DNS', max: 100 },
        { name: 'SSL', max: 100 }
      ]
    },
    series: [{
      type: 'radar',
      data: [{
        value: [85, 90, 88, 95, 92],
        name: 'Network Quality'
      }],
      areaStyle: {}
    }]
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Network Quality Score</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Comprehensive network quality assessment combining latency, packet loss, jitter, DNS performance, and SSL metrics into a single score.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ReactECharts option={gaugeOption} style={{ height: '200px' }} />
        <ReactECharts option={radarOption} style={{ height: '200px' }} />
      </div>
    </Card>
  );
}