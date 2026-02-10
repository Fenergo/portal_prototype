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
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm">Back to Prototypes</span>
                </Button>
                <div className="h-6 w-px bg-slate-300" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Fenergo Cockpit</h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-sm text-slate-600">Executive Dashboard</p>
                    <Badge variant="outline" className="text-xs border-green-200 bg-green-50">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                      Live
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden md:inline text-sm">Refresh</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden md:inline text-sm">Export</span>
                </Button>
                <Button
                  onClick={() => setShowAddWidget(true)}
                  size="sm"
                  className="gap-2 bg-[#21CFB2] hover:bg-[#1AB09A] text-white shadow-sm font-semibold"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add Widget</span>
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0.5 right-0.5 h-2 w-2 bg-red-500 rounded-full" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-slate-700">View:</span>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="h-8 bg-[#21CFB2] hover:bg-[#1AB09A] text-white">
                  Overview
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Compliance
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Risk
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Operations
                </Button>
              </div>
              <div className="h-4 w-px bg-slate-300 hidden md:block" />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#21CFB2]/20 focus:border-[#21CFB2] hidden md:block"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              <select 
                value={region} 
                onChange={(e) => setRegion(e.target.value)}
                className="text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#21CFB2]/20 focus:border-[#21CFB2] hidden md:block"
              >
                <option value="all">All Regions</option>
                <option value="emea">EMEA</option>
                <option value="apac">APAC</option>
                <option value="americas">Americas</option>
              </select>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <ScrollArea className="flex-1 p-6 bg-slate-50">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeWidgets.map(w => w.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr max-w-[1920px] mx-auto">
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
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[#21CFB2] to-[#1AB09A] flex items-center justify-center mb-6 shadow-lg">
                <Activity className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Welcome to Your Dashboard</h3>
              <p className="text-base text-slate-600 mb-6 max-w-md text-center">
                Start building your executive cockpit by adding widgets that matter most to you.
              </p>
              <Button 
                onClick={() => setShowAddWidget(true)} 
                className="bg-[#21CFB2] hover:bg-[#1AB09A] text-white px-6 py-2 text-base font-semibold shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Widget
              </Button>
            </div>
          )}
        </ScrollArea>
      </main>

      {/* Add Widget Dialog */}
      <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add Widget to Dashboard</DialogTitle>
            <DialogDescription className="text-base">
              Choose from available widgets to customize your executive cockpit
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[65vh] pr-4">
            <div className="space-y-8">
              {Object.entries(widgetsByCategory).length > 0 ? (
                Object.entries(widgetsByCategory).map(([category, widgets]) => (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-4">
                      {category === 'Compliance' && (
                        <div className="h-8 w-8 rounded-lg bg-[#21CFB2]/10 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-[#21CFB2]" />
                        </div>
                      )}
                      {category === 'Risk' && (
                        <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        </div>
                      )}
                      {category === 'Operations' && (
                        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-slate-900">{category}</h3>
                      <Badge variant="secondary" className="ml-auto">
                        {widgets.length} available
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {widgets.map((widget) => (
                        <Card
                          key={widget.id}
                          className="p-5 cursor-pointer hover:shadow-xl hover:border-[#21CFB2] hover:scale-105 transition-all duration-200 group bg-white"
                          onClick={() => handleAddWidget(widget)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#21CFB2] transition-colors">
                                {widget.title}
                              </h4>
                              <div className="flex gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  {widget.type}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {widget.size}
                                </Badge>
                              </div>
                            </div>
                            <div className="ml-3 h-10 w-10 rounded-lg bg-[#21CFB2]/10 group-hover:bg-[#21CFB2] flex items-center justify-center transition-colors">
                              <Plus className="h-5 w-5 text-[#21CFB2] group-hover:text-white transition-colors" />
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">
                            Click to add this widget to your dashboard
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="h-20 w-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">All widgets added!</h3>
                  <p className="text-base text-slate-600">
                    All available widgets are already on your dashboard
                  </p>
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
