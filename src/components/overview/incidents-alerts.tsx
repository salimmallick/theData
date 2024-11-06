import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export function IncidentsAlerts() {
  const incidents = [
    {
      id: 1,
      title: "API Response Time Degradation",
      status: "critical",
      time: "5 minutes ago",
      description: "API latency increased by 200% in US-East region",
    },
    {
      id: 2,
      title: "Database Connection Errors",
      status: "warning",
      time: "15 minutes ago",
      description: "Intermittent connection failures in EU region",
    },
    {
      id: 3,
      title: "High Memory Usage",
      status: "info",
      time: "30 minutes ago",
      description: "Memory usage above 85% on production servers",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Active Incidents & Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-start space-x-4 rounded-lg border p-4"
            >
              <div className="shrink-0">
                {incident.status === "critical" ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : incident.status === "warning" ? (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{incident.title}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {incident.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {incident.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}