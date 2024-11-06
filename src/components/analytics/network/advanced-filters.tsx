import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNetworkStore } from '@/store/network';

export function NetworkAdvancedFilters() {
  const { filters, updateFilters } = useNetworkStore();

  return (
    <div className="grid gap-4 md:grid-cols-3">
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