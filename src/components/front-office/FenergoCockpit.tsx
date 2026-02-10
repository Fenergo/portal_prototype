import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Menu, 
  X, 
  ArrowLeft, 
  Filter, 
  Plus, 
  Maximize2,
  GripVertical,
  AlertTriangle,
  Users,
  Shield,
  Activity,
  TrendingUp,
  Bell,
  Settings,
  RefreshCw,
  Download
} from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';

// Import widget components
import { MetricCardWidget } from '../widgets/MetricCardWidget';
import { KYCBacklogWidget } from '../widgets/KYCBacklogWidget';
import { AMLAlertsWidget } from '../widgets/AMLAlertsWidget';
import { AlertsBySeverityWidget } from '../widgets/AlertsBySeverityWidget';
import { TradingIncidentsWidget } from '../widgets/TradingIncidentsWidget';
import { RiskAppetiteWidget } from '../widgets/RiskAppetiteWidget';
import { ExposureHeatmapWidget } from '../widgets/ExposureHeatmapWidget';
import { OpenCasesWidget } from '../widgets/OpenCasesWidget';

interface FenergoCockpitProps {
  onBack: () => void;
}

interface Widget {
  id: string;
  type: 'metric' | 'chart' | 'list' | 'heatmap';
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  component: React.ReactNode;
}

function SortableWidget({ widget, onExpand, onRemove }: { widget: Widget; onExpand: (id: string) => void; onRemove: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 lg:col-span-2',
    large: 'col-span-1 lg:col-span-3 xl:col-span-4'
  };

  return (
    <div ref={setNodeRef} style={style} className={sizeClasses[widget.size]}>
      <Card className="h-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div className="p-4 space-y-3">
          {/* Widget Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                aria-label="Drag to reorder"
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <h3 className="text-sm font-semibold text-slate-900 truncate">{widget.title}</h3>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => onExpand(widget.id)}
                aria-label="Expand widget"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-slate-400 hover:text-red-600"
                onClick={() => onRemove(widget.id)}
                aria-label="Remove widget"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Widget Content */}
          <div className="widget-content">
            {widget.component}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function FenergoCockpit({ onBack }: FenergoCockpitProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('today');
  const [region, setRegion] = useState('all');
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Widget library with new components
  const widgetLibrary: Widget[] = [
    {
      id: 'overdue-kyc',
      type: 'metric',
      title: 'Overdue KYC Reviews',
      category: 'Compliance',
      size: 'small',
      component: <MetricCardWidget title="Overdue KYC" value="34" change={-12} icon={AlertTriangle} color="#E30613" />
    },
    {
      id: 'pending-approvals',
      type: 'metric',
      title: 'Pending Approvals',
      category: 'Operations',
      size: 'small',
      component: <MetricCardWidget title="Pending Approvals" value="18" change={-8} icon={Users} color="#21CFB2" />
    },
    {
      id: 'aml-alerts-today',
      type: 'metric',
      title: 'AML Alerts (Today)',
      category: 'Compliance',
      size: 'small',
      component: <MetricCardWidget title="AML Alerts" value="8" change={15} icon={Shield} color="#F59E0B" />
    },
    {
      id: 'trade-breaks',
      type: 'metric',
      title: 'Trade Breaks',
      category: 'Operations',
      size: 'small',
      component: <MetricCardWidget title="Trade Breaks" value="3" change={-25} icon={TrendingUp} color="#3B82F6" />
    },
    {
      id: 'kyc-backlog-chart',
      type: 'chart',
      title: 'KYC Backlog Trend',
      category: 'Compliance',
      size: 'medium',
      component: <KYCBacklogWidget />
    },
    {
      id: 'aml-alerts-chart',
      type: 'chart',
      title: 'AML Alert Timeline',
      category: 'Compliance',
      size: 'medium',
      component: <AMLAlertsWidget />
    },
    {
      id: 'alerts-severity',
      type: 'chart',
      title: 'Alerts by Severity',
      category: 'Risk',
      size: 'medium',
      component: <AlertsBySeverityWidget />
    },
    {
      id: 'trading-incidents',
      type: 'chart',
      title: 'Trading Incidents',
      category: 'Operations',
      size: 'medium',
      component: <TradingIncidentsWidget />
    },
    {
      id: 'risk-appetite',
      type: 'chart',
      title: 'Risk Appetite Monitor',
      category: 'Risk',
      size: 'medium',
      component: <RiskAppetiteWidget />
    },
    {
      id: 'exposure-heatmap',
      type: 'heatmap',
      title: 'Exposure Matrix',
      category: 'Risk',
      size: 'medium',
      component: <ExposureHeatmapWidget />
    },
    {
      id: 'open-cases',
      type: 'list',
      title: 'Priority Cases',
      category: 'Operations',
      size: 'medium',
      component: <OpenCasesWidget />
    }
  ];

  const [activeWidgets, setActiveWidgets] = useState<Widget[]>([
    widgetLibrary[0], // Overdue KYC
    widgetLibrary[1], // Pending Approvals  
    widgetLibrary[2], // AML Alerts
    widgetLibrary[3], // Trade Breaks
    widgetLibrary[4], // KYC Backlog Chart
    widgetLibrary[5], // AML Alerts Chart
    widgetLibrary[6], // Alerts Severity
    widgetLibrary[10], // Open Cases
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActiveWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success('Dashboard layout updated');
    }
  };

  const handleAddWidget = (widget: Widget) => {
    if (!activeWidgets.find(w => w.id === widget.id)) {
      setActiveWidgets([...activeWidgets, widget]);
      toast.success(`${widget.title} added to dashboard`);
      setShowAddWidget(false);
    } else {
      toast.error('Widget already on dashboard');
    }
  };

  const handleRemoveWidget = (id: string) => {
    setActiveWidgets(activeWidgets.filter(w => w.id !== id));
    toast.success('Widget removed from dashboard');
  };

  const availableWidgetsToAdd = widgetLibrary.filter(w => !activeWidgets.find(aw => aw.id === w.id));
  const widgetsByCategory = availableWidgetsToAdd.reduce((acc, widget) => {
    if (!acc[widget.category]) acc[widget.category] = [];
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<string, Widget[]>);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-[#21CFB2] to-[#1AB09A] text-white shadow-xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-lg">Fenergo Cockpit</div>
              <div className="text-xs text-white/80">Executive Dashboard</div>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            <button className="w-full text-left px-3 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm flex items-center gap-3 text-sm font-medium shadow-sm">
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4" />
              <span>Compliance</span>
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk</span>
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>Operations</span>
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
              <Users className="h-4 w-4" />
              <span>Analytics</span>
            </button>
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-white hover:bg-white/10 text-sm"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Prototypes</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-gradient-to-b from-[#21CFB2] to-[#1AB09A] text-white border-r-0">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-lg">Fenergo Cockpit</div>
                <div className="text-xs text-white/80">Executive Dashboard</div>
              </div>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-180px)] px-3 py-4">
            <nav className="space-y-1">
              <button className="w-full text-left px-3 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm flex items-center gap-3 text-sm font-medium">
                <Activity className="h-4 w-4" />
                <span>Overview</span>
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4" />
                <span>Compliance</span>
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Risk</span>
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>Operations</span>
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm">
                <Users className="h-4 w-4" />
                <span>Analytics</span>
              </button>
            </nav>
          </ScrollArea>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#1AB09A]">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-white hover:bg-white/10 text-sm"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Prototypes</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="gap-2 hidden lg:flex"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Prototypes</span>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Executive Cockpit</h1>
                <div className="flex items-center gap-3 mt-0.5">
                  <p className="text-xs text-slate-600">Real-time operational intelligence</p>
                  <Badge variant="outline" className="text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                    Live
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">Refresh</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
                <Download className="h-4 w-4" />
                <span className="text-sm">Export</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Filters</span>
              </Button>
              <Button
                size="sm"
                onClick={() => setShowAddWidget(true)}
                className="gap-2 bg-[#21CFB2] hover:bg-[#1AB09A] text-white shadow-sm"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Add Widget</span>
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-b bg-slate-50/80 backdrop-blur-sm px-6 py-3 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-700">Time Range:</label>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-xs border border-slate-200 rounded-md px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#21CFB2]/20 focus:border-[#21CFB2]"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-700">Region:</label>
                <select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="text-xs border border-slate-200 rounded-md px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#21CFB2]/20 focus:border-[#21CFB2]"
                >
                  <option value="all">All Regions</option>
                  <option value="emea">EMEA</option>
                  <option value="apac">APAC</option>
                  <option value="americas">Americas</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-700">Risk Level:</label>
                <select className="text-xs border border-slate-200 rounded-md px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#21CFB2]/20 focus:border-[#21CFB2]">
                  <option>All Levels</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto text-xs"
                onClick={() => {
                  setTimeRange('today');
                  setRegion('all');
                  toast.success('Filters reset');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <ScrollArea className="flex-1 p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeWidgets.map(w => w.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
                {activeWidgets.map((widget) => (
                  <SortableWidget
                    key={widget.id}
                    widget={widget}
                    onExpand={setExpandedWidget}
                    onRemove={handleRemoveWidget}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {activeWidgets.length === 0 && (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Activity className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No widgets on dashboard</h3>
              <p className="text-sm text-slate-600 mb-4 max-w-sm">
                Get started by adding widgets to customize your executive dashboard.
              </p>
              <Button onClick={() => setShowAddWidget(true)} className="bg-[#21CFB2] hover:bg-[#1AB09A]">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Widget
              </Button>
            </div>
          )}
        </ScrollArea>
      </main>

      {/* Add Widget Dialog */}
      <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Widget to Dashboard</DialogTitle>
            <DialogDescription>Choose from available widgets to customize your executive cockpit</DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {Object.entries(widgetsByCategory).length > 0 ? (
                Object.entries(widgetsByCategory).map(([category, widgets]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      {category === 'Compliance' && <Shield className="h-4 w-4 text-[#21CFB2]" />}
                      {category === 'Risk' && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                      {category === 'Operations' && <TrendingUp className="h-4 w-4 text-blue-500" />}
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {widgets.map((widget) => (
                        <Card
                          key={widget.id}
                          className="p-4 cursor-pointer hover:shadow-lg hover:border-[#21CFB2] transition-all duration-200 group"
                          onClick={() => handleAddWidget(widget)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-[#21CFB2] transition-colors">{widget.title}</h4>
                              <Badge variant="secondary" className="text-xs">{widget.type}</Badge>
                            </div>
                            <Plus className="h-4 w-4 text-slate-400 group-hover:text-[#21CFB2] transition-colors" />
                          </div>
                          <p className="text-xs text-slate-600">Click to add to dashboard</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">All available widgets are already on your dashboard</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Widget Expansion Dialog */}
      <Dialog open={!!expandedWidget} onOpenChange={() => setExpandedWidget(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {activeWidgets.find(w => w.id === expandedWidget)?.title}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="p-6">
              {activeWidgets.find(w => w.id === expandedWidget)?.component}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
