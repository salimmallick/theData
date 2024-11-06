import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactECharts from 'echarts-for-react';

export function RootCauseAnalysisWidget() {
  const chartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    series: [
      {
        type: 'tree',
        data: [{
          name: 'High Latency',
          children: [
            {
              name: 'Network Congestion',
              children: [
                { name: 'Peak Hours Traffic' },
                { name: 'Limited Bandwidth' }
              ]
            },
            {
              name: 'Server Issues',
              children: [
                { name: 'High CPU Usage' },
                { name: 'Memory Leaks' }
              ]
            },
            {
              name: 'DNS Resolution',
              children: [
                { name: 'DNS Server Down' },
                { name: 'Cache Issues' }
              ]
            }
          ]
        }],
        top: '5%',
        left: '20%',
        bottom: '5%',
        right: '20%',
        symbolSize: 10,
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  };

  return (
    <Card className="p-6 col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Root Cause Analysis</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Analyze and visualize the root causes of network performance issues using a hierarchical tree diagram.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ReactECharts option={chartOption} style={{ height: '400px' }} />
    </Card>
  );
}