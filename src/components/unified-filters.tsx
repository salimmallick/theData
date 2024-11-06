import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';

interface UnifiedFiltersProps {
  showAdvanced?: boolean;
  additionalFilters?: React.ReactNode;
}

export function UnifiedFilters({ showAdvanced = false, additionalFilters }: UnifiedFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <Card className="p-6 space-y-6">
      {/* Common Filters */}
      <div className="grid gap-6 md:grid-cols-5">
        <div>
          <Label>Time Range</Label>
          <Select defaultValue="24h">
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Environment</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Environments</SelectItem>
              <SelectItem value="prod">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="dev">Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Region</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="asia">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Application</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select application" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="web">Web App</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="api">API Services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Version</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Versions</SelectItem>
              <SelectItem value="2.0">v2.0</SelectItem>
              <SelectItem value="1.9">v1.9</SelectItem>
              <SelectItem value="1.8">v1.8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      {showAdvanced && (
        <>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="text-muted-foreground"
            >
              {isAdvancedOpen ? (
                <ChevronUp className="h-4 w-4 mr-2" />
              ) : (
                <ChevronDown className="h-4 w-4 mr-2" />
              )}
              Advanced Filters
            </Button>
          </div>

          {/* Advanced Filters Content */}
          {isAdvancedOpen && (
            <div className="pt-6 border-t">
              {additionalFilters}
            </div>
          )}
        </>
      )}

      {/* Apply Filters Button */}
      <div className="flex justify-end pt-2">
        <Button>Apply Filters</Button>
      </div>
    </Card>
  );
}