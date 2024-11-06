import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function APM() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Application Performance Monitoring</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor application performance, traces, and dependencies.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Metrics</CardTitle>
            <CardDescription>Key application performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Application metrics will be displayed here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traces</CardTitle>
            <CardDescription>Distributed tracing data</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Trace data will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}