import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const accessData = {
  userActivity: [
    { time: '00:00', successful: 850, failed: 25, suspicious: 5 },
    { time: '06:00', successful: 1200, failed: 35, suspicious: 8 },
    { time: '12:00', successful: 1500, failed: 40, suspicious: 10 },
    { time: '18:00', successful: 1100, failed: 30, suspicious: 6 }
  ],
  roleDistribution: [
    { name: 'Admin', value: 5 },
    { name: 'Manager', value: 15 },
    { name: 'Developer', value: 30 },
    { name: 'Analyst', value: 25 },
    { name: 'User', value: 25 }
  ],
  accessPatterns: {
    resources: ['Database', 'API', 'Files', 'Applications', 'Networks'],
    patterns: [
      { name: 'Read', data: [80, 90, 85, 95, 70] },
      { name: 'Write', data: [40, 50, 45, 60, 30] },
      { name: 'Delete', data: [10, 15, 12, 20, 8] },
      { name: 'Admin', data: [5, 8, 6, 10, 4] }
    ]
  },
  mfaAdoption: {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [
      { name: 'SMS', data: [30, 35, 38, 40, 42, 45] },
      { name: 'Authenticator App', data: [20, 25, 30, 35, 40, 45] },
      { name: 'Hardware Token', data: [5, 8, 10, 12, 15, 18] },
      { name: 'Biometric', data: [2, 5, 8, 12, 15, 20] }
    ]
  }
};

export default function UserAccess() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['user-access'] || {
    lg: [
      { i: 'user-activity', x: 0, y: 0, w: 12, h: 4 },
      { i: 'role-distribution', x: 0, y: 4, w: 6, h: 4 },
      { i: 'access-patterns', x: 6, y: 4, w: 6, h: 4 },
      { i: 'mfa-adoption', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('user-access', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('user-access-dashboard');
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
    pdf.save('user-access-security.pdf');
  };

  const userActivityOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Successful', 'Failed', 'Suspicious']
    },
    xAxis: {
      type: 'category',
      data: accessData.userActivity.map(item => item.time)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Access Attempts',
        position: 'left'
      }
    ],
    series: [
      {
        name: 'Successful',
        type: 'bar',
        data: accessData.userActivity.map(item => item.successful),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Failed',
        type: 'bar',
        data: accessData.userActivity.map(item => item.failed),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Suspicious',
        type: 'line',
        data: accessData.userActivity.map(item => item.suspicious),
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const roleDistributionOption = {
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
        data: accessData.roleDistribution
      }
    ]
  };

  const accessPatternsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: accessData.accessPatterns.patterns.map(p => p.name)
    },
    radar: {
      indicator: accessData.accessPatterns.resources.map(r => ({ name: r, max: 100 }))
    },
    series: [
      {
        type: 'radar',
        data: accessData.accessPatterns.patterns.map(p => ({
          name: p.name,
          value: p.data
        }))
      }
    ]
  };

  const mfaAdoptionOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: accessData.mfaAdoption.data.map(d => d.name)
    },
    xAxis: {
      type: 'category',
      data: accessData.mfaAdoption.dates
    },
    yAxis: {
      type: 'value',
      name: 'Adoption %',
      max: 100
    },
    series: accessData.mfaAdoption.data.map(d => ({
      name: d.name,
      type: 'line',
      data: d.data,
      smooth: true,
      areaStyle: { opacity: 0.1 }
    }))
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Access Security</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor user access patterns, role distribution, and authentication methods.
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

      <div id="user-access-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="user-activity">
            <BaseWidget
              title="User Activity"
              description="Monitor user access attempts and identify suspicious activities."
              fullWidth
            >
              <ReactECharts option={userActivityOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="role-distribution">
            <BaseWidget
              title="Role Distribution"
              description="Distribution of user roles across the system."
            >
              <ReactECharts option={roleDistributionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="access-patterns">
            <BaseWidget
              title="Access Patterns"
              description="Resource access patterns by permission type."
            >
              <ReactECharts option={accessPatternsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="mfa-adoption">
            <BaseWidget
              title="MFA Adoption Trends"
              description="Multi-factor authentication adoption across different methods."
              fullWidth
            >
              <ReactECharts option={mfaAdoptionOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}