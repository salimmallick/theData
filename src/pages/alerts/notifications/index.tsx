import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const notificationData = {
  deliveryStats: [
    { date: '2024-01', email: 1200, sms: 800, slack: 1500, push: 900 },
    { date: '2024-02', email: 1300, sms: 850, slack: 1600, push: 950 },
    { date: '2024-03', email: 1250, sms: 820, slack: 1550, push: 920 },
    { date: '2024-04', email: 1400, sms: 880, slack: 1650, push: 980 }
  ],
  channelPerformance: {
    channels: ['Email', 'SMS', 'Slack', 'Push Notifications'],
    metrics: {
      deliveryRate: [98.5, 99.2, 99.8, 99.0],
      responseTime: [45, 15, 10, 20],
      readRate: [85, 90, 95, 88]
    }
  },
  notificationTypes: [
    { name: 'Critical Alerts', value: 25 },
    { name: 'System Updates', value: 20 },
    { name: 'Performance Alerts', value: 30 },
    { name: 'Security Alerts', value: 15 },
    { name: 'Other', value: 10 }
  ],
  userEngagement: [
    { date: '2024-01', delivered: 4400, read: 3960, acted: 2200 },
    { date: '2024-02', delivered: 4700, read: 4230, acted: 2350 },
    { date: '2024-03', delivered: 4540, read: 4086, acted: 2270 },
    { date: '2024-04', delivered: 4910, read: 4419, acted: 2455 }
  ]
};

export default function Notifications() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['notifications'] || {
    lg: [
      { i: 'delivery-stats', x: 0, y: 0, w: 12, h: 4 },
      { i: 'channel-performance', x: 0, y: 4, w: 6, h: 4 },
      { i: 'notification-types', x: 6, y: 4, w: 6, h: 4 },
      { i: 'user-engagement', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('notifications', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('notifications-dashboard');
    if (!dashboard) return;

    const canvas = await html2canvas(dashboard, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: dashboard.scrollWidth,
      windowHeight: dashboard.scrollHeight
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('notifications.pdf');
  };

  const deliveryStatsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Email', 'SMS', 'Slack', 'Push Notifications']
    },
    xAxis: {
      type: 'category',
      data: notificationData.deliveryStats.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'bar',
        stack: 'total',
        data: notificationData.deliveryStats.map(item => item.email),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'SMS',
        type: 'bar',
        stack: 'total',
        data: notificationData.deliveryStats.map(item => item.sms),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Slack',
        type: 'bar',
        stack: 'total',
        data: notificationData.deliveryStats.map(item => item.slack),
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Push Notifications',
        type: 'bar',
        stack: 'total',
        data: notificationData.deliveryStats.map(item => item.push),
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };

  const channelPerformanceOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Delivery Rate (%)', 'Response Time (s)', 'Read Rate (%)']
    },
    radar: {
      indicator: notificationData.channelPerformance.channels.map(channel => ({
        name: channel,
        max: 100
      }))
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            name: 'Delivery Rate (%)',
            value: notificationData.channelPerformance.metrics.deliveryRate,
            itemStyle: { color: '#3b82f6' }
          },
          {
            name: 'Response Time (s)',
            value: notificationData.channelPerformance.metrics.responseTime,
            itemStyle: { color: '#22c55e' }
          },
          {
            name: 'Read Rate (%)',
            value: notificationData.channelPerformance.metrics.readRate,
            itemStyle: { color: '#f59e0b' }
          }
        ]
      }
    ]
  };

  const notificationTypesOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
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
        data: notificationData.notificationTypes
      }
    ]
  };

  const userEngagementOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Delivered', 'Read', 'Acted Upon']
    },
    xAxis: {
      type: 'category',
      data: notificationData.userEngagement.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Delivered',
        type: 'line',
        data: notificationData.userEngagement.map(item => item.delivered),
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Read',
        type: 'line',
        data: notificationData.userEngagement.map(item => item.read),
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Acted Upon',
        type: 'line',
        data: notificationData.userEngagement.map(item => item.acted),
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications & Communication</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor notification delivery, performance, and user engagement across different channels.
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={exportDashboard}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div id="notifications-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="delivery-stats">
            <BaseWidget
              title="Notification Delivery"
              description="Notification delivery statistics by channel."
              fullWidth
            >
              <ReactECharts option={deliveryStatsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="channel-performance">
            <BaseWidget
              title="Channel Performance"
              description="Performance metrics across different notification channels."
            >
              <ReactECharts option={channelPerformanceOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="notification-types">
            <BaseWidget
              title="Notification Types"
              description="Distribution of notifications by category."
            >
              <ReactECharts option={notificationTypesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="user-engagement">
            <BaseWidget
              title="User Engagement"
              description="Track notification engagement and response rates."
              fullWidth
            >
              <ReactECharts option={userEngagementOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}