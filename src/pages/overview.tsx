import { ExecutiveSummary } from '@/components/overview/executive-summary';
import { PerformanceOverview } from '@/components/overview/performance-overview';
import { UserEngagement } from '@/components/overview/user-engagement';
import { VideoPerformance } from '@/components/overview/video-performance';
import { NetworkPerformance } from '@/components/overview/network-performance';
import { IncidentsAlerts } from '@/components/overview/incidents-alerts';
import { CostManagement } from '@/components/overview/cost-management';
import { ObservabilityInsights } from '@/components/overview/observability-insights';
import { TrafficInsights } from '@/components/overview/traffic-insights';
import { CrossCategoryNav } from '@/components/overview/cross-category-nav';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { WidgetWrapper } from '@/components/dashboard/widget-wrapper';

export function Overview() {
  const exportDashboard = async () => {
    const dashboard = document.getElementById('dashboard');
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
    pdf.save('dashboard.pdf');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to theData.io platform. This is your central dashboard for monitoring and analyzing your application's performance.
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

      <div id="dashboard" className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <WidgetWrapper title="Performance Overview">
            <PerformanceOverview />
          </WidgetWrapper>
          <WidgetWrapper title="User Engagement">
            <UserEngagement />
          </WidgetWrapper>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <WidgetWrapper title="Video Performance">
            <VideoPerformance />
          </WidgetWrapper>
          <WidgetWrapper title="Network Performance">
            <NetworkPerformance />
          </WidgetWrapper>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <WidgetWrapper title="Incidents & Alerts">
            <IncidentsAlerts />
          </WidgetWrapper>
          <WidgetWrapper title="Cost Management">
            <CostManagement />
          </WidgetWrapper>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <WidgetWrapper title="Observability Insights">
            <ObservabilityInsights />
          </WidgetWrapper>
          <WidgetWrapper title="Traffic Insights">
            <TrafficInsights />
          </WidgetWrapper>
        </div>
      </div>

      <CrossCategoryNav />
    </div>
  );
}