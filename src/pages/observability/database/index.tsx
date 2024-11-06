import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Database() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Database Monitoring</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor database performance, queries, and health metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Query Performance</CardTitle>
            <CardDescription>Database query metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Query performance data will be displayed here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Health</CardTitle>
            <CardDescription>Overall database status</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Database health data will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}