import ReactECharts from 'echarts-for-react';

interface PredictiveData {
  churnPrediction: Array<{
    segment: string;
    riskScore: number;
    churnProbability: number;
  }>;
  contentRecommendations: Array<{
    category: string;
    relevanceScore: number;
    engagementPotential: number;
  }>;
  viewershipForecast: Array<{
    date: string;
    actual: number;
    predicted: number;
    confidenceLow: number;
    confidenceHigh: number;
  }>;
  strategicInsights: Array<{
    metric: string;
    currentValue: number;
    targetValue: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

interface PredictiveAnalyticsProps {
  data: PredictiveData;
}

export function PredictiveAnalytics({ data }: PredictiveAnalyticsProps) {
  const churnPredictionOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Risk Score', 'Churn Probability']
    },
    xAxis: {
      type: 'category',
      data: data.churnPrediction.map(item => item.segment)
    },
    yAxis: {
      type: 'value',
      name: 'Percentage (%)',
      max: 100
    },
    series: [
      {
        name: 'Risk Score',
        type: 'bar',
        data: data.churnPrediction.map(item => item.riskScore),
        itemStyle: { color: '#ef4444' }
      },
      {
        name: 'Churn Probability',
        type: 'line',
        data: data.churnPrediction.map(item => item.churnProbability),
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const recommendationsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Relevance Score', 'Engagement Potential']
    },
    radar: {
      indicator: data.contentRecommendations.map(item => ({
        name: item.category,
        max: 100
      }))
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data.contentRecommendations.map(item => item.relevanceScore),
            name: 'Relevance Score',
            itemStyle: { color: '#3b82f6' }
          },
          {
            value: data.contentRecommendations.map(item => item.engagementPotential),
            name: 'Engagement Potential',
            itemStyle: { color: '#22c55e' }
          }
        ]
      }
    ]
  };

  const forecastOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Actual', 'Predicted', 'Confidence Interval']
    },
    xAxis: {
      type: 'category',
      data: data.viewershipForecast.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      name: 'Viewers'
    },
    series: [
      {
        name: 'Actual',
        type: 'line',
        data: data.viewershipForecast.map(item => item.actual),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Predicted',
        type: 'line',
        data: data.viewershipForecast.map(item => item.predicted),
        itemStyle: { color: '#22c55e' },
        lineStyle: { type: 'dashed' }
      },
      {
        name: 'Confidence Interval',
        type: 'line',
        data: data.viewershipForecast.map(item => item.confidenceHigh),
        lineStyle: { opacity: 0 },
        areaStyle: {
          color: '#22c55e',
          opacity: 0.1
        },
        stack: 'confidence'
      },
      {
        name: 'Confidence Interval',
        type: 'line',
        data: data.viewershipForecast.map(item => item.confidenceLow),
        lineStyle: { opacity: 0 },
        areaStyle: {
          color: '#22c55e',
          opacity: 0.1
        },
        stack: 'confidence'
      }
    ]
  };

  const strategicInsightsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: data.strategicInsights.map(item => item.metric)
    },
    yAxis: {
      type: 'value',
      name: 'Value',
      max: 100
    },
    series: [
      {
        name: 'Current Value',
        type: 'bar',
        data: data.strategicInsights.map(item => item.currentValue),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Target Value',
        type: 'line',
        data: data.strategicInsights.map(item => item.targetValue),
        itemStyle: { color: '#f59e0b' },
        lineStyle: { type: 'dashed' }
      }
    ]
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium mb-4">Churn Risk Analysis</h3>
        <ReactECharts option={churnPredictionOption} style={{ height: '300px' }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Content Recommendations</h3>
        <ReactECharts option={recommendationsOption} style={{ height: '300px' }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Viewership Forecast</h3>
        <ReactECharts option={forecastOption} style={{ height: '300px' }} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Strategic Insights</h3>
        <ReactECharts option={strategicInsightsOption} style={{ height: '300px' }} />
      </div>
    </div>
  );
}