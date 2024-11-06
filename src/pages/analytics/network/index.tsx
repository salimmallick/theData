import { WidgetWrapper } from '@/components/dashboard/widget-wrapper';
import { NetworkPerformanceWidget } from '@/components/analytics/network/performance-widget';
import { NetworkQualityWidget } from '@/components/analytics/network/quality-widget';
import { NetworkPathWidget } from '@/components/analytics/network/path-widget';
import { NetworkUtilizationWidget } from '@/components/analytics/network/utilization-widget';
import { CoreWebVitalsWidget } from '@/components/analytics/network/core-web-vitals-widget';
import { RealUserMonitoringWidget } from '@/components/analytics/network/real-user-monitoring-widget';
import { CDNPerformanceWidget } from '@/components/analytics/network/cdn-performance-widget';
import { TimeToInteractiveWidget } from '@/components/analytics/network/time-to-interactive-widget';
import { UserSessionInsightsWidget } from '@/components/analytics/network/user-session-insights-widget';
import { GeolocationPerformanceWidget } from '@/components/analytics/network/geolocation-performance-widget';
import { DevicePerformanceWidget } from '@/components/analytics/network/device-performance-widget';
import { UserSatisfactionWidget } from '@/components/analytics/network/user-satisfaction-widget';
import { PredictivePerformanceWidget } from '@/components/analytics/network/predictive-performance-widget';
import { AnomalyDetectionWidget } from '@/components/analytics/network/anomaly-detection-widget';
import { NetworkForecastWidget } from '@/components/analytics/network/network-forecast-widget';
import { RootCauseAnalysisWidget } from '@/components/analytics/network/root-cause-analysis-widget';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function NetworkAnalytics() {
  const exportDashboard = async () => {
    const dashboard = document.getElementById('network-dashboard');
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
    pdf.save('network-analytics.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Network Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and analyze network performance, quality, and user experience metrics.
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

      <div id="network-dashboard" className="space-y-6">
        {/* Full-width Network Performance Overview */}
        <div className="grid gap-6">
          <WidgetWrapper title="Network Performance Overview">
            <NetworkPerformanceWidget />
          </WidgetWrapper>
        </div>

        {/* Quality & Path Analysis */}
        <div className="grid gap-6 md:grid-cols-2">
          <WidgetWrapper title="Network Quality">
            <NetworkQualityWidget />
          </WidgetWrapper>
          <WidgetWrapper title="Network Path">
            <NetworkPathWidget />
          </WidgetWrapper>
        </div>

        {/* Full-width Network Utilization */}
        <div className="grid gap-6">
          <WidgetWrapper title="Network Utilization">
            <NetworkUtilizationWidget />
          </WidgetWrapper>
        </div>

        {/* Core Web Vitals & RUM */}
        <div className="grid gap-6 md:grid-cols-2">
          <WidgetWrapper title="Core Web Vitals">
            <CoreWebVitalsWidget />
          </WidgetWrapper>
          <WidgetWrapper title="Real User Monitoring">
            <RealUserMonitoringWidget />
          </WidgetWrapper>
        </div>

        {/* Full-width User Session Insights */}
        <div className="grid gap-6">
          <WidgetWrapper title="User Session Insights">
            <UserSessionInsightsWidget />
          </WidgetWrapper>
        </div>

        {/* Geolocation & Device Performance */}
        <div className="grid gap-6 md:grid-cols-2">
          <WidgetWrapper title="Geolocation Performance">
            <GeolocationPerformanceWidget />
          </WidgetWrapper>
          <WidgetWrapper title="Device Performance">
            <DevicePerformanceWidget />
          </WidgetWrapper>
        </div>

        {/* Full-width User Satisfaction */}
        <div className="grid gap-6">
          <WidgetWrapper title="User Satisfaction Index">
            <UserSatisfactionWidget />
          </WidgetWrapper>
        </div>

        {/* CDN & TTI */}
        <div className="grid gap-6 md:grid-cols-2">
          <WidgetWrapper title="CDN Performance">
            <CDNPerformanceWidget />
          </WidgetWrapper>
          <WidgetWrapper title="Time to Interactive">
            <TimeToInteractiveWidget />
          </WidgetWrapper>
        </div>

        {/* Full-width Predictive Performance */}
        <div className="grid gap-6">
          <WidgetWrapper title="Predictive Performance Analysis">
            <PredictivePerformanceWidget />
          </WidgetWrapper>
        </div>

        {/* Anomaly Detection & Network Forecast */}
        <div className="grid gap-6 md:grid-cols-2">
          <WidgetWrapper title="Anomaly Detection">
            <AnomalyDetectionWidget />
          </WidgetWrapper>
          <WidgetWrapper title="Network Forecast">
            <NetworkForecastWidget />
          </WidgetWrapper>
        </div>

        {/* Full-width Root Cause Analysis */}
        <div className="grid gap-6">
          <WidgetWrapper title="Root Cause Analysis">
            <RootCauseAnalysisWidget />
          </WidgetWrapper>
        </div>
      </div>
    </div>
  );
}