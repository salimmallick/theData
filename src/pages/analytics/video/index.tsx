import { BaseWidget } from '@/components/dashboard/base-widget';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlaybackQualityMetrics } from '@/components/analytics/video/playback-quality';
import { StartupMetrics } from '@/components/analytics/video/startup-metrics';
import { StreamingQualityMetrics } from '@/components/analytics/video/streaming-quality';
import { AudienceInsights } from '@/components/analytics/video/audience-insights';
import { ContentEffectivenessMetrics } from '@/components/analytics/video/content-effectiveness';
import { UserEngagementTracking } from '@/components/analytics/video/user-engagement';
import { PredictiveAnalytics } from '@/components/analytics/video/predictive-analytics';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Sample data for video analytics
const videoData = {
  playbackQuality: {
    timestamps: ['00:00', '00:05', '00:10', '00:15', '00:20'],
    bitrate: [3500, 3200, 3800, 3600, 3400],
    buffering: [2.5, 3.1, 2.8, 2.2, 2.9],
    failures: [1, 2, 0, 1, 1]
  },
  startupMetrics: {
    timestamps: ['00:00', '00:05', '00:10', '00:15', '00:20'],
    startupTime: [2.5, 2.3, 2.8, 2.4, 2.6],
    firstFrame: [1.2, 1.1, 1.3, 1.2, 1.2],
    successRate: [98, 99, 97, 98, 99]
  },
  streamingQuality: {
    timestamps: ['00:00', '00:05', '00:10', '00:15', '00:20'],
    stability: [95, 94, 96, 93, 95],
    variance: [2.5, 3.1, 2.8, 3.2, 2.9],
    errorRate: [0.5, 0.8, 0.4, 0.6, 0.5]
  },
  audienceInsights: {
    demographics: {
      age: [
        { group: '18-24', value: 25 },
        { group: '25-34', value: 35 },
        { group: '35-44', value: 20 },
        { group: '45-54', value: 12 },
        { group: '55+', value: 8 }
      ],
      gender: [
        { group: 'Male', value: 55 },
        { group: 'Female', value: 43 },
        { group: 'Other', value: 2 }
      ],
      location: [
        { region: 'North America', value: 40 },
        { region: 'Europe', value: 30 },
        { region: 'Asia', value: 20 },
        { region: 'Others', value: 10 }
      ]
    },
    viewingHabits: [
      { time: '00:00', viewers: 1200 },
      { time: '06:00', viewers: 800 },
      { time: '12:00', viewers: 2500 },
      { time: '18:00', viewers: 3000 },
      { time: '23:00', viewers: 1800 }
    ]
  },
  contentEffectiveness: {
    completionRate: [
      { content: 'Video A', rate: 85, totalViews: 12000 },
      { content: 'Video B', rate: 78, totalViews: 8500 },
      { content: 'Video C', rate: 92, totalViews: 15000 },
      { content: 'Video D', rate: 88, totalViews: 10000 }
    ],
    shares: [
      { content: 'Video A', facebook: 1200, twitter: 800, other: 400 },
      { content: 'Video B', facebook: 900, twitter: 600, other: 300 },
      { content: 'Video C', facebook: 1500, twitter: 1000, other: 500 },
      { content: 'Video D', facebook: 1100, twitter: 700, other: 350 }
    ],
    feedback: [
      { term: 'Excellent', count: 450 },
      { term: 'Good', count: 320 },
      { term: 'Average', count: 180 },
      { term: 'Poor', count: 50 }
    ],
    retention: [
      { timestamp: '0:00', percentage: 100, dropoff: 0 },
      { timestamp: '1:00', percentage: 90, dropoff: 10 },
      { timestamp: '2:00', percentage: 85, dropoff: 5 },
      { timestamp: '3:00', percentage: 80, dropoff: 5 }
    ]
  },
  userEngagement: {
    interactions: [
      { date: '2024-01', likes: 1200, comments: 300, shares: 150 },
      { date: '2024-02', likes: 1400, comments: 350, shares: 180 },
      { date: '2024-03', likes: 1300, comments: 320, shares: 160 },
      { date: '2024-04', likes: 1500, comments: 380, shares: 200 }
    ],
    engagementRate: [
      { content: 'Video A', rate: 8.5, benchmark: 7.0 },
      { content: 'Video B', rate: 7.8, benchmark: 7.0 },
      { content: 'Video C', rate: 9.2, benchmark: 7.0 },
      { content: 'Video D', rate: 8.8, benchmark: 7.0 }
    ],
    sessionLength: [
      { duration: '0-5 min', count: 5000 },
      { duration: '5-15 min', count: 3000 },
      { duration: '15-30 min', count: 1500 },
      { duration: '30+ min', count: 500 }
    ],
    churnAnalysis: [
      { segment: 'New Users', rate: 15, risk: 25 },
      { segment: 'Casual', rate: 12, risk: 20 },
      { segment: 'Regular', rate: 8, risk: 15 },
      { segment: 'Power Users', rate: 5, risk: 10 }
    ]
  },
  predictiveAnalytics: {
    churnPrediction: [
      { segment: 'New Users', riskScore: 65, churnProbability: 45 },
      { segment: 'Casual Viewers', riskScore: 45, churnProbability: 30 },
      { segment: 'Regular Users', riskScore: 25, churnProbability: 15 },
      { segment: 'Power Users', riskScore: 15, churnProbability: 8 }
    ],
    contentRecommendations: [
      { category: 'Educational', relevanceScore: 85, engagementPotential: 78 },
      { category: 'Entertainment', relevanceScore: 92, engagementPotential: 88 },
      { category: 'News', relevanceScore: 75, engagementPotential: 70 },
      { category: 'Sports', relevanceScore: 88, engagementPotential: 85 }
    ],
    viewershipForecast: [
      { date: '2024-01', actual: 10000, predicted: 10500, confidenceLow: 9800, confidenceHigh: 11200 },
      { date: '2024-02', actual: 11000, predicted: 11500, confidenceLow: 10800, confidenceHigh: 12200 },
      { date: '2024-03', actual: 12000, predicted: 12500, confidenceLow: 11800, confidenceHigh: 13200 },
      { date: '2024-04', actual: 0, predicted: 13500, confidenceLow: 12800, confidenceHigh: 14200 }
    ],
    strategicInsights: [
      { metric: 'User Retention', currentValue: 75, targetValue: 85, trend: 'up' },
      { metric: 'Content Quality', currentValue: 82, targetValue: 90, trend: 'up' },
      { metric: 'Platform Stability', currentValue: 95, targetValue: 99, trend: 'stable' },
      { metric: 'Cost per View', currentValue: 65, targetValue: 75, trend: 'up' }
    ]
  }
};

export default function VideoAnalytics() {
  const handleExportDashboard = async () => {
    const dashboard = document.getElementById('video-analytics-dashboard');
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
    pdf.save('video-analytics.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Video Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor video streaming performance, quality metrics, and viewer engagement.
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={handleExportDashboard}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div id="video-analytics-dashboard" className="space-y-6">
        <BaseWidget
          title="Playback Quality Metrics"
          description="Monitor video playback quality including bitrate, buffering, and failures."
          fullWidth
        >
          <PlaybackQualityMetrics data={videoData.playbackQuality} />
        </BaseWidget>

        <div className="grid grid-cols-2 gap-6">
          <BaseWidget
            title="Startup Experience"
            description="Track video startup performance and initial playback metrics."
          >
            <StartupMetrics data={videoData.startupMetrics} />
          </BaseWidget>

          <BaseWidget
            title="Streaming Quality"
            description="Monitor stream stability, quality variance, and error rates."
          >
            <StreamingQualityMetrics data={videoData.streamingQuality} />
          </BaseWidget>
        </div>

        <BaseWidget
          title="Audience Insights"
          description="Analyze viewer demographics and engagement patterns."
          fullWidth
        >
          <AudienceInsights data={videoData.audienceInsights} />
        </BaseWidget>

        <BaseWidget
          title="Content Effectiveness"
          description="Track content performance and viewer engagement metrics."
          fullWidth
        >
          <ContentEffectivenessMetrics data={videoData.contentEffectiveness} />
        </BaseWidget>

        <BaseWidget
          title="User Engagement"
          description="Monitor user interactions and engagement patterns."
          fullWidth
        >
          <UserEngagementTracking data={videoData.userEngagement} />
        </BaseWidget>

        <BaseWidget
          title="Predictive Analytics & Recommendations"
          description="AI-driven insights, predictions, and strategic recommendations."
          fullWidth
        >
          <PredictiveAnalytics data={videoData.predictiveAnalytics} />
        </BaseWidget>
      </div>
    </div>
  );
}