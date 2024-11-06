import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNetworkStore } from '@/store/network';

export function NetworkFilters() {
  const { filters, updateFilters } = useNetworkStore();

  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div>
        <Label>Time Range</Label>
        <Select
          value={filters.timeRange}
          onValueChange={(value) => updateFilters({ timeRange: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last24h">Last 24 Hours</SelectItem>
            <SelectItem value="last7d">Last 7 Days</SelectItem>
            <SelectItem value="last30d">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Region</Label>
        <Select
          value={filters.region}
          onValueChange={(value) => updateFilters({ region: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="na">North America</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="asia">Asia Pacific</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Device Type</Label>
        <Select
          value={filters.deviceType}
          onValueChange={(value) => updateFilters({ deviceType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select device type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Devices</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Protocol</Label>
        <Select
          value={filters.protocol}
          onValueChange={(value) => updateFilters({ protocol: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Protocols</SelectItem>
            <SelectItem value="http">HTTP/HTTPS</SelectItem>
            <SelectItem value="tcp">TCP</SelectItem>
            <SelectItem value="udp">UDP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Traffic Type</Label>
        <Select
          value={filters.trafficType}
          onValueChange={(value) => updateFilters({ trafficType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select traffic type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Traffic</SelectItem>
            <SelectItem value="ingress">Ingress</SelectItem>
            <SelectItem value="egress">Egress</SelectItem>
            <SelectItem value="internal">Internal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}