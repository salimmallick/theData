import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Infrastructure() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Infrastructure Monitoring</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor and manage infrastructure resources and performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>CPU, memory, and storage metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Resource usage data will be displayed here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Health</CardTitle>
            <CardDescription>Overall infrastructure status</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Infrastructure health data will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}