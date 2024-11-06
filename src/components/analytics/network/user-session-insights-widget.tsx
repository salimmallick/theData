import { Card } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';

const sessionData = {
  nodes: [
    { name: 'Landing', value: 1000 },
    { name: 'Product List', value: 800 },
    { name: 'Product Detail', value: 600 },
    { name: 'Cart', value: 400 },
    { name: 'Checkout', value: 300 },
    { name: 'Order Complete', value: 200 }
  ],
  links: [
    { source: 'Landing', target: 'Product List', value: 800 },
    { source: 'Product List', target: 'Product Detail', value: 600 },
    { source: 'Product Detail', target: 'Cart', value: 400 },
    { source: 'Cart', target: 'Checkout', value: 300 },
    { source: 'Checkout', target: 'Order Complete', value: 200 }
  ]
};

export function UserSessionInsightsWidget() {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} users'
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency'
        },
        data: sessionData.nodes,
        links: sessionData.links,
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        }
      }
    ]
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">User Journey Flow</h3>
      <ReactECharts option={option} style={{ height: '400px' }} />
    </Card>
  );
}