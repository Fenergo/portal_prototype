import { Filter, X, Calendar, Building2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

interface FiltersPanelProps {
  visible: boolean;
  onToggle: () => void;
}

export function FiltersPanel({ visible, onToggle }: FiltersPanelProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [region, setRegion] = useState('all');
  const [riskLevel, setRiskLevel] = useState('all');

  const activeFiltersCount = [
    timeRange !== '7d',
    region !== 'all',
    riskLevel !== 'all',
  ].filter(Boolean).length;

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-card border-l border-border shadow-lg transition-transform duration-300 z-20 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      } w-80 overflow-y-auto`}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" style={{ color: 'var(--fenergo-primary)' }} />
            <h2 className="font-semibold">Filters</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Time Range
            </label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Region
            </label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="emea">EMEA</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk Level
            </label>
            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-secondary/50">
              <span className="text-sm">KYC Backlog</span>
              <Badge>282</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-secondary/50">
              <span className="text-sm">AML Alerts</span>
              <Badge>137</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-secondary/50">
              <span className="text-sm">Trading Exceptions</span>
              <Badge>23</Badge>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setTimeRange('7d');
              setRegion('all');
              setRiskLevel('all');
            }}
          >
            Reset All Filters
          </Button>
        </div>
      </div>
    </div>
  );
}