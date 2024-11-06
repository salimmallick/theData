import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function ExecutiveSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Health Score</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98.2%</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span>+0.5% from last week</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">25.2k</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span>+12% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.2M</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span>+8% from last week</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">92%</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span>+2% from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}