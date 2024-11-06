import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart, Card as TremorCard, Title } from '@tremor/react';

export default function Performance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance & Availability</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor and analyze system performance metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125ms</div>
            <p className="text-xs text-muted-foreground">-12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5%</div>
            <p className="text-xs text-muted-foreground">-0.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">+0.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5k/s</div>
            <p className="text-xs text-muted-foreground">+300/s from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TremorCard>
          <Title>Performance Trends</Title>
          <AreaChart
            className="mt-4 h-72"
            data={[
              {
                date: "Jan 23",
                "Response Time": 145,
                "Error Rate": 2.3,
              },
              {
                date: "Feb 23",
                "Response Time": 139,
                "Error Rate": 2.1,
              },
              {
                date: "Mar 23",
                "Response Time": 134,
                "Error Rate": 2.0,
              },
            ]}
            index="date"
            categories={["Response Time", "Error Rate"]}
            colors={["blue", "red"]}
            valueFormatter={(number) => `${number} ms`}
          />
        </TremorCard>

        <TremorCard>
          <Title>Request Distribution</Title>
          <BarChart
            className="mt-4 h-72"
            data={[
              {
                endpoint: "/api/users",
                requests: 450,
              },
              {
                endpoint: "/api/products",
                requests: 670,
              },
              {
                endpoint: "/api/orders",
                requests: 234,
              },
            ]}
            index="endpoint"
            categories={["requests"]}
            colors={["blue"]}
            valueFormatter={(number) => `${number} req/s`}
          />
        </TremorCard>
      </div>
    </div>
  );
}