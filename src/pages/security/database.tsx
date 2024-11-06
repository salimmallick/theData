import { BaseWidget } from '@/components/dashboard/base-widget';
import { GridLayoutWrapper } from '@/components/dashboard/grid-layout-wrapper';
import { useLayoutStore } from '@/store/layout-store';
import ReactECharts from 'echarts-for-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const databaseData = {
  accessPatterns: [
    { time: '00:00', reads: 1200, writes: 300, failed: 15 },
    { time: '06:00', reads: 1500, writes: 400, failed: 20 },
    { time: '12:00', reads: 1800, writes: 450, failed: 18 },
    { time: '18:00', reads: 1300, writes: 350, failed: 16 }
  ],
  vulnerabilities: {
    categories: ['SQL Injection', 'Access Control', 'Data Encryption', 'Backup/Recovery', 'Configuration'],
    current: [25, 15, 10, 8, 12],
    resolved: [20, 12, 8, 7, 10]
  },
  permissions: [
    { name: 'Admin', value: 5 },
    { name: 'Write', value: 15 },
    { name: 'Read', value: 45 },
    { name: 'Read-Only', value: 35 }
  ],
  monitoring: {
    dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    metrics: {
      cpu: [65, 68, 70, 72, 68, 65, 67],
      memory: [75, 78, 80, 82, 78, 75, 77],
      connections: [250, 280, 300, 320, 290, 260, 270]
    }
  }
};

export default function DatabaseSecurity() {
  const { layouts, updateLayout } = useLayoutStore();
  const pageLayouts = layouts['database-security'] || {
    lg: [
      { i: 'access-patterns', x: 0, y: 0, w: 12, h: 4 },
      { i: 'vulnerabilities', x: 0, y: 4, w: 6, h: 4 },
      { i: 'permissions', x: 6, y: 4, w: 6, h: 4 },
      { i: 'monitoring', x: 0, y: 8, w: 12, h: 4 }
    ]
  };

  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    updateLayout('database-security', allLayouts);
  };

  const exportDashboard = async () => {
    const dashboard = document.getElementById('database-security-dashboard');
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
    pdf.save('database-security.pdf');
  };

  const accessPatternsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Read Operations', 'Write Operations', 'Failed Operations']
    },
    xAxis: {
      type: 'category',
      data: databaseData.accessPatterns.map(item => item.time)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Operations',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Failed',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Read Operations',
        type: 'bar',
        data: databaseData.accessPatterns.map(item => item.reads),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Write Operations',
        type: 'bar',
        data: databaseData.accessPatterns.map(item => item.writes),
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Failed Operations',
        type: 'line',
        yAxisIndex: 1,
        data: databaseData.accessPatterns.map(item => item.failed),
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const vulnerabilitiesOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Current', 'Resolved']
    },
    xAxis: {
      type: 'category',
      data: databaseData.vulnerabilities.categories
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Current',
        type: 'bar',
        data: databaseData.vulnerabilities.current,
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Resolved',
        type: 'bar',
        data: databaseData.vulnerabilities.resolved,
        itemStyle: { color: '#22c55e' }
      }
    ]
  };

  const permissionsOption = {
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
        data: databaseData.permissions
      }
    ]
  };

  const monitoringOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['CPU Usage', 'Memory Usage', 'Active Connections']
    },
    xAxis: {
      type: 'category',
      data: databaseData.monitoring.dates
    },
    yAxis: [
      {
        type: 'value',
        name: 'Usage %',
        max: 100,
        position: 'left'
      },
      {
        type: 'value',
        name: 'Connections',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'CPU Usage',
        type: 'line',
        data: databaseData.monitoring.metrics.cpu,
        smooth: true,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Memory Usage',
        type: 'line',
        data: databaseData.monitoring.metrics.memory,
        smooth: true,
        itemStyle: { color: '#22c55e' }
      },
      {
        name: 'Active Connections',
        type: 'line',
        yAxisIndex: 1,
        data: databaseData.monitoring.metrics.connections,
        smooth: true,
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Database Security</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor database access patterns, vulnerabilities, and performance metrics.
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

      <div id="database-security-dashboard">
        <GridLayoutWrapper
          layouts={pageLayouts}
          onLayoutChange={handleLayoutChange}
        >
          <div key="access-patterns">
            <BaseWidget
              title="Database Access Patterns"
              description="Monitor database operations and identify suspicious activities."
              fullWidth
            >
              <ReactECharts option={accessPatternsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="vulnerabilities">
            <BaseWidget
              title="Security Vulnerabilities"
              description="Track current and resolved database security vulnerabilities."
            >
              <ReactECharts option={vulnerabilitiesOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="permissions">
            <BaseWidget
              title="Access Permissions"
              description="Distribution of database access permissions across users."
            >
              <ReactECharts option={permissionsOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>

          <div key="monitoring">
            <BaseWidget
              title="Database Performance Monitoring"
              description="Monitor database performance metrics and resource utilization."
              fullWidth
            >
              <ReactECharts option={monitoringOption} style={{ height: '300px' }} />
            </BaseWidget>
          </div>
        </GridLayoutWrapper>
      </div>
    </div>
  );
}