import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import {
  ArrowLeft,
  Plus,
  Maximize2,
  GripVertical,
  X,
  AlertTriangle,
  Users,
  Shield,
  Activity,
  TrendingUp,
  Bell,
  Search,
  LayoutGrid,
  Clock,
  Sparkles,
  Eye,
  Zap,
  Globe
} from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';

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
  subtitle: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  icon: React.ReactNode;
  component: React.ReactNode;
}

function SortableWidget({ widget, onExpand, onRemove }: { widget: Widget; onExpand: (id: string) => void; onRemove: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const sizeClasses: Record<string, string> = {
    small: 'col-span-1',
    medium: 'col-span-1 lg:col-span-2',
    large: 'col-span-1 lg:col-span-3 xl:col-span-4'
  };

  return (
    <div ref={setNodeRef} style={style} className={sizeClasses[widget.size]}>
      <div className="h-full rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group overflow-hidden">
        <div className="p-5 h-full flex flex-col">
          {/* Widget Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-slate-200 hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                aria-label="Drag to reorder"
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-semibold text-slate-800 truncate tracking-tight">{widget.title}</h3>
                <p className="text-[11px] text-slate-400 truncate">{widget.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
              <button
                className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => onExpand(widget.id)}
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
              <button
                className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                onClick={() => onRemove(widget.id)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Widget Content */}
          <div className="flex-1 min-h-0">
            {widget.component}
          </div>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function FenergoCockpit({ onBack }: FenergoCockpitProps) {
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const widgetLibrary: Widget[] = [
    {
      id: 'overdue-kyc',
      type: 'metric',
      title: 'Overdue KYC Reviews',
      subtitle: 'Requires immediate attention',
      category: 'Compliance',
      size: 'small',
      icon: <AlertTriangle className="h-4 w-4" />,
      component: <MetricCardWidget title="Overdue KYC" value="34" change={-12} icon={AlertTriangle} color="#EF4444" />
    },
    {
      id: 'pending-approvals',
      type: 'metric',
      title: 'Pending Approvals',
      subtitle: 'Awaiting review',
      category: 'Operations',
      size: 'small',
      icon: <Users className="h-4 w-4" />,
      component: <MetricCardWidget title="Pending Approvals" value="18" change={-8} icon={Users} color="#21CFB2" />
    },
    {
      id: 'aml-alerts-today',
      type: 'metric',
      title: 'AML Alerts Today',
      subtitle: 'Anti-money laundering',
      category: 'Compliance',
      size: 'small',
      icon: <Shield className="h-4 w-4" />,
      component: <MetricCardWidget title="AML Alerts" value="8" change={15} icon={Shield} color="#F59E0B" />
    },
    {
      id: 'trade-breaks',
      type: 'metric',
      title: 'Trade Breaks',
      subtitle: 'Settlement exceptions',
      category: 'Operations',
      size: 'small',
      icon: <TrendingUp className="h-4 w-4" />,
      component: <MetricCardWidget title="Trade Breaks" value="3" change={-25} icon={TrendingUp} color="#6366F1" />
    },
    {
      id: 'kyc-backlog-chart',
      type: 'chart',
      title: 'KYC Backlog Trend',
      subtitle: 'Weekly compliance backlog',
      category: 'Compliance',
      size: 'medium',
      icon: <Activity className="h-4 w-4" />,
      component: <KYCBacklogWidget />
    },
    {
      id: 'aml-alerts-chart',
      type: 'chart',
      title: 'AML Alert Timeline',
      subtitle: '24-hour alert activity',
      category: 'Compliance',
      size: 'medium',
      icon: <Shield className="h-4 w-4" />,
      component: <AMLAlertsWidget />
    },
    {
      id: 'alerts-severity',
      type: 'chart',
      title: 'Alerts by Severity',
      subtitle: 'Risk categorization breakdown',
      category: 'Risk',
      size: 'medium',
      icon: <AlertTriangle className="h-4 w-4" />,
      component: <AlertsBySeverityWidget />
    },
    {
      id: 'trading-incidents',
      type: 'chart',
      title: 'Trading Incidents',
      subtitle: '6-month incident trend',
      category: 'Operations',
      size: 'medium',
      icon: <Zap className="h-4 w-4" />,
      component: <TradingIncidentsWidget />
    },
    {
      id: 'risk-appetite',
      type: 'chart',
      title: 'Risk Appetite Monitor',
      subtitle: 'Appetite vs actual exposure',
      category: 'Risk',
      size: 'medium',
      icon: <Eye className="h-4 w-4" />,
      component: <RiskAppetiteWidget />
    },
    {
      id: 'exposure-heatmap',
      type: 'heatmap',
      title: 'Exposure Matrix',
      subtitle: 'Regional business exposure',
      category: 'Risk',
      size: 'medium',
      icon: <Globe className="h-4 w-4" />,
      component: <ExposureHeatmapWidget />
    },
    {
      id: 'open-cases',
      type: 'list',
      title: 'Priority Cases',
      subtitle: 'Cases requiring attention',
      category: 'Operations',
      size: 'medium',
      icon: <Clock className="h-4 w-4" />,
      component: <OpenCasesWidget />
    }
  ];

  const [activeWidgets, setActiveWidgets] = useState<Widget[]>([
    widgetLibrary[0],
    widgetLibrary[1],
    widgetLibrary[2],
    widgetLibrary[3],
    widgetLibrary[4],
    widgetLibrary[5],
    widgetLibrary[6],
    widgetLibrary[10],
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setActiveWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success('Layout updated', { description: 'Your dashboard has been rearranged.' });
    }
  };

  const handleAddWidget = (widget: Widget) => {
    if (!activeWidgets.find(w => w.id === widget.id)) {
      setActiveWidgets([...activeWidgets, widget]);
      toast.success('Widget added', { description: `${widget.title} is now on your dashboard.` });
      setShowAddWidget(false);
    }
  };

  const handleRemoveWidget = (id: string) => {
    const widget = activeWidgets.find(w => w.id === id);
    setActiveWidgets(activeWidgets.filter(w => w.id !== id));
    toast('Widget removed', {
      description: `${widget?.title} has been removed.`,
      action: {
        label: 'Undo',
        onClick: () => widget && setActiveWidgets(prev => [...prev, widget])
      }
    });
  };

  const filteredWidgets = activeView === 'all'
    ? activeWidgets
    : activeWidgets.filter(w => w.category.toLowerCase() === activeView);

  const availableWidgetsToAdd = widgetLibrary.filter(w => !activeWidgets.find(aw => aw.id === w.id));
  const widgetsByCategory = availableWidgetsToAdd.reduce((acc, widget) => {
    if (!acc[widget.category]) acc[widget.category] = [];
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<string, Widget[]>);

  const views = [
    { key: 'all', label: 'All', count: activeWidgets.length },
    { key: 'compliance', label: 'Compliance', count: activeWidgets.filter(w => w.category === 'Compliance').length },
    { key: 'risk', label: 'Risk', count: activeWidgets.filter(w => w.category === 'Risk').length },
    { key: 'operations', label: 'Operations', count: activeWidgets.filter(w => w.category === 'Operations').length },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#FAFBFC]">
      {/* Minimal Top Bar */}
      <nav className="h-14 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#21CFB2] to-[#0EA78A] flex items-center justify-center shadow-sm shadow-emerald-200/50">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-[15px] font-bold text-slate-900 tracking-tight">Cockpit</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-emerald-50 text-emerald-700 border-emerald-200/50 font-medium">
              <span className="relative flex h-1.5 w-1.5 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Live
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-slate-50/80 rounded-xl px-3 py-1.5 border border-slate-200/60 w-56 focus-within:border-[#21CFB2] focus-within:ring-2 focus-within:ring-[#21CFB2]/10 focus-within:bg-white transition-all">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-slate-600 placeholder:text-slate-400 w-full"
            />
          </div>

          <button className="relative h-8 w-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1.5 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          <Button
            onClick={() => setShowAddWidget(true)}
            size="sm"
            className="h-8 gap-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium shadow-sm px-3"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Widget
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Welcome + Tabs */}
        <div className="px-8 pt-7 pb-1 flex-shrink-0">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h1 className="text-[26px] font-bold text-slate-900 tracking-tight mb-0.5">{getGreeting()}</h1>
              <p className="text-[13px] text-slate-400 font-medium">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                <span className="mx-2 text-slate-300">·</span>
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="flex items-center p-1 bg-slate-100/80 rounded-xl">
              {views.map(v => (
                <button
                  key={v.key}
                  onClick={() => setActiveView(v.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeView === v.key
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {v.label}
                  {v.count > 0 && (
                    <span className={`ml-1.5 tabular-nums ${activeView === v.key ? 'text-slate-400' : 'text-slate-400'}`}>
                      {v.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <ScrollArea className="flex-1 px-8 pb-8">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredWidgets.map(w => w.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1920px]">
                {filteredWidgets.map((widget) => (
                  <SortableWidget
                    key={widget.id}
                    widget={widget}
                    onExpand={setExpandedWidget}
                    onRemove={handleRemoveWidget}
                  />
                ))}

                {/* Persistent Add Widget Card */}
                <div className="col-span-1">
                  <button
                    onClick={() => setShowAddWidget(true)}
                    className="h-full min-h-[180px] w-full rounded-2xl border-2 border-dashed border-slate-200/80 hover:border-[#21CFB2] hover:bg-[#21CFB2]/[0.03] transition-all duration-300 flex flex-col items-center justify-center gap-3 group cursor-pointer"
                  >
                    <div className="h-11 w-11 rounded-xl bg-slate-100/80 group-hover:bg-[#21CFB2]/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Plus className="h-5 w-5 text-slate-300 group-hover:text-[#21CFB2] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-400 group-hover:text-[#21CFB2] transition-colors">Add widget</p>
                      <p className="text-[11px] text-slate-300 group-hover:text-slate-400 transition-colors mt-0.5">{availableWidgetsToAdd.length} available</p>
                    </div>
                  </button>
                </div>
              </div>
            </SortableContext>
          </DndContext>

          {filteredWidgets.length === 0 && activeView !== 'all' && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <LayoutGrid className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">No {activeView} widgets</h3>
              <p className="text-sm text-slate-400 mb-4">Add some from the widget library</p>
              <Button
                onClick={() => setShowAddWidget(true)}
                variant="outline"
                size="sm"
                className="rounded-xl"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Browse Widgets
              </Button>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Widget Library Dialog */}
      <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl p-0 gap-0 border-slate-200/60 shadow-2xl">
          <div className="p-6 border-b border-slate-100 bg-white">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-lg font-bold tracking-tight">Widget Library</DialogTitle>
              <DialogDescription className="text-[13px] text-slate-500">
                Add widgets to personalize your executive dashboard
              </DialogDescription>
            </DialogHeader>
          </div>

          <ScrollArea className="max-h-[60vh]">
            <div className="p-4 space-y-5">
              {Object.entries(widgetsByCategory).length > 0 ? (
                Object.entries(widgetsByCategory).map(([category, widgets]) => (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-2.5 px-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{category}</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>
                    <div className="space-y-1">
                      {widgets.map((widget) => (
                        <button
                          key={widget.id}
                          className="w-full px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-all duration-150 group text-left flex items-center gap-4"
                          onClick={() => handleAddWidget(widget)}
                        >
                          <div className="h-10 w-10 rounded-xl bg-slate-100/80 group-hover:bg-[#21CFB2]/10 flex items-center justify-center transition-colors flex-shrink-0">
                            <span className="text-slate-400 group-hover:text-[#21CFB2] transition-colors">{widget.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{widget.title}</h4>
                            <p className="text-[11px] text-slate-400 truncate">{widget.subtitle}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="h-7 px-3 rounded-lg bg-[#21CFB2] flex items-center justify-center gap-1">
                              <Plus className="h-3 w-3 text-white" />
                              <span className="text-[11px] font-medium text-white">Add</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-7 w-7 text-emerald-500" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">All widgets added!</h3>
                  <p className="text-sm text-slate-500">You've added every available widget</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Expanded Widget */}
      <Dialog open={!!expandedWidget} onOpenChange={() => setExpandedWidget(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl p-0 gap-0 border-slate-200/60 shadow-2xl">
          <div className="p-6 border-b border-slate-100 bg-white">
            <DialogTitle className="text-lg font-bold tracking-tight">
              {activeWidgets.find(w => w.id === expandedWidget)?.title}
            </DialogTitle>
            <p className="text-[13px] text-slate-500 mt-0.5">
              {activeWidgets.find(w => w.id === expandedWidget)?.subtitle}
            </p>
          </div>
          <ScrollArea className="max-h-[70vh]">
            <div className="p-8">
              {activeWidgets.find(w => w.id === expandedWidget)?.component}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
