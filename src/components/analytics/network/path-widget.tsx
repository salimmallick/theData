import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ReactECharts from 'echarts-for-react';

export function NetworkPathWidget() {
  const option = {
    tooltip: {},
    series: [{
      type: 'graph',
      layout: 'force',
      animation: false,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}'
      },
      draggable: true,
      data: [
        {
          id: '0',
          name: 'Client',
          symbolSize: 60,
          category: 0,
        },
        {
          id: '1',
          name: 'Router 1',
          symbolSize: 50,
          category: 1,
        },
        {
          id: '2',
          name: 'Router 2',
          symbolSize: 50,
          category: 1,
        },
        {
          id: '3',
          name: 'CDN',
          symbolSize: 60,
          category: 2,
        },
        {
          id: '4',
          name: 'Server',
          symbolSize: 60,
          category: 3,
        }
      ],
      edges: [
        {
          source: '0',
          target: '1',
          label: {
            show: true,
            formatter: '15ms'
          }
        },
        {
          source: '1',
          target: '2',
          label: {
            show: true,
            formatter: '10ms'
          }
        },
        {
          source: '2',
          target: '3',
          label: {
            show: true,
            formatter: '10ms'
          }
        },
        {
          source: '3',
          target: '4',
          label: {
            show: true,
            formatter: '10ms'
          }
        }
      ],
      categories: [
        { name: 'Client' },
        { name: 'Router' },
        { name: 'CDN' },
        { name: 'Server' }
      ]
    }]
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Network Path Analysis</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Visualize network paths and measure latency at each hop to identify problematic network segments and optimize routing.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  );
}