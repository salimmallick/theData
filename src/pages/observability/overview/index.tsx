import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ObservabilityOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Observability Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor and analyze system health, performance, and reliability metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>System health data will be displayed here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Performance data will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}