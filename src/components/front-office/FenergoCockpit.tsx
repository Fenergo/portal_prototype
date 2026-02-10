import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { 
  Menu, 
  X, 
  ArrowLeft, 
  Filter, 
  Plus, 
  Maximize2,
  GripVertical,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Shield,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';

interface FenergoCockpitProps {
  onBack: () => void;
}

// Mock data
const kycBacklogData = [
  { name: 'High Risk', value: 34, color: '#E30613' },
  { name: 'Medium', value: 56, color: '#F59E0B' },
  { name: 'Low', value: 23, color: '#21CFB2' }
];

const amlAlertsData = [
  { month: 'Jan', alerts: 45 },
  { month: 'Feb', alerts: 52 },
  { month: 'Mar', alerts: 38 },
  { month: 'Apr', alerts: 61 },
  { month: 'May', alerts: 55 },
  { month: 'Jun', alerts: 49 }
];

const alertsBySeverityData = [
  { name: 'Critical', value: 12, color: '#E30613' },
  { name: 'High', value: 28, color: '#F59E0B' },
  { name: 'Medium', value: 45, color: '#3B82F6' },
  { name: 'Low', value: 67, color: '#21CFB2' }
];

const tradingIncidentsData = [
  { date: 'Mon', incidents: 3 },
  { date: 'Tue', incidents: 5 },
  { date: 'Wed', incidents: 2 },
  { date: 'Thu', incidents: 7 },
  { date: 'Fri', incidents: 4 }
];

const riskAppetiteData = [
  { category: 'Credit', current: 75, threshold: 85 },
  { category: 'Market', current: 68, threshold: 80 },
  { category: 'Operational', current: 82, threshold: 90 },
  { category: 'Liquidity', current: 45, threshold: 70 }
];

interface Widget {
  id: string;
  type: 'metric' | 'chart';
  title: string;
  category: string;
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={widget.type === 'metric' ? 'col-span-1' : 'col-span-1 lg:col-span-2'}>
      <Card className="p-3 hover:shadow-lg transition-shadow bg-white relative group">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-1">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <GripVertical className="size-4" />
            </button>
            <h4 className="text-xs font-semibold text-slate-900">{widget.title}</h4>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onExpand(widget.id)}
            >
              <Maximize2 className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
              onClick={() => onRemove(widget.id)}
            >
              <X className="size-3" />
            </Button>
          </div>
        </div>
        <div>{widget.component}</div>
      </Card>
    </div>
  );
}

export function FenergoCockpit({ onBack }: FenergoCockpitProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Available widgets library
  const widgetLibrary: Widget[] = [
    {
      id: 'overdue-kyc',
      type: 'metric',
      title: 'Overdue KYC Reviews',
      category: 'Compliance',
      component: (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-red-600">34</div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <AlertTriangle className="size-3" />
            <span>12 High Risk</span>
          </div>
        </div>
      )
    },
    {
      id: 'pending-approvals',
      type: 'metric',
      title: 'Pending Approvals',
      category: 'Operations',
      component: (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-slate-900">18</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="size-3" />
            <span>-12% vs last week</span>
          </div>
        </div>
      )
    },
    {
      id: 'aml-alerts',
      type: 'metric',
      title: 'AML Alerts (Today)',
      category: 'Compliance',
      component: (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-orange-600">8</div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Clock className="size-3" />
            <span>2 escalated</span>
          </div>
        </div>
      )
    },
    {
      id: 'trade-breaks',
      type: 'metric',
      title: 'Trade Breaks',
      category: 'Operations',
      component: (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-slate-900">3</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <CheckCircle2 className="size-3" />
            <span>All resolved</span>
          </div>
        </div>
      )
    },
    {
      id: 'kyc-backlog-chart',
      type: 'chart',
      title: 'KYC Backlog by Risk',
      category: 'Compliance',
      component: (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={kycBacklogData} onClick={(data) => setSelectedDataPoint(data)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {kycBacklogData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} className="cursor-pointer hover:opacity-80" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'aml-trend-chart',
      type: 'chart',
      title: 'AML Alert Trend',
      category: 'Compliance',
      component: (
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={amlAlertsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="alerts" stroke="#21CFB2" strokeWidth={2} dot={{ fill: '#21CFB2', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'alerts-severity-chart',
      type: 'chart',
      title: 'Alerts by Severity',
      category: 'Risk',
      component: (
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={alertsBySeverityData}
              cx="50%"
              cy="50%"
              outerRadius={50}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
            >
              {alertsBySeverityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'trading-incidents-chart',
      type: 'chart',
      title: 'Trading Incidents (Week)',
      category: 'Operations',
      component: (
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={tradingIncidentsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Area type="monotone" dataKey="incidents" stroke="#F59E0B" fill="#FEF3C7" />
          </AreaChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'risk-appetite-chart',
      type: 'chart',
      title: 'Risk Appetite vs Current',
      category: 'Risk',
      component: (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={riskAppetiteData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Bar dataKey="current" fill="#21CFB2" name="Current" radius={[4, 4, 0, 0]} />
            <Bar dataKey="threshold" fill="#94A3B8" name="Threshold" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'active-users',
      type: 'metric',
      title: 'Active Users',
      category: 'Analytics',
      component: (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-slate-900">247</div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Users className="size-3" />
            <span>Logged in today</span>
          </div>
        </div>
      )
    },
    {
      id: 'documents-pending',
      type: 'metric',
      title: 'Documents Pending',
      category: 'Operations',
      component: (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-slate-900">56</div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <FileText className="size-3" />
            <span>Awaiting review</span>
          </div>
        </div>
      )
    }
  ];

  const [activeWidgets, setActiveWidgets] = useState<Widget[]>(widgetLibrary.slice(0, 8));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActiveWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success('Widget reordered');
    }
  };

  const handleAddWidget = (widget: Widget) => {
    if (!activeWidgets.find(w => w.id === widget.id)) {
      setActiveWidgets([...activeWidgets, widget]);
      toast.success(`${widget.title} added`);
    }
  };

  const handleRemoveWidget = (id: string) => {
    setActiveWidgets(activeWidgets.filter(w => w.id !== id));
    toast.success('Widget removed');
  };

  const availableWidgetsToAdd = widgetLibrary.filter(w => !activeWidgets.find(aw => aw.id === w.id));
  const widgetsByCategory = availableWidgetsToAdd.reduce((acc, widget) => {
    if (!acc[widget.category]) acc[widget.category] = [];
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<string, Widget[]>);

  return (
    <div className="h-screen flex bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-gradient-to-b from-teal-600 to-teal-700 text-white">
        <div className="p-4 border-b border-teal-500">
          <div className="font-bold text-xl mb-1">Fenergo Cockpit</div>
          <div className="text-xs text-teal-100">Executive Dashboard</div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-white/20 flex items-center gap-2">
            <Activity className="size-4" />
            <span className="text-sm">Overview</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2">
            <Shield className="size-4" />
            <span className="text-sm">Compliance</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2">
            <AlertTriangle className="size-4" />
            <span className="text-sm">Risk</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2">
            <TrendingUp className="size-4" />
            <span className="text-sm">Operations</span>
          </button>
        </nav>

        <div className="p-4 border-t border-teal-500">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-white hover:bg-white/10"
            onClick={onBack}
          >
            <ArrowLeft className="size-4" />
            <span>Back to Prototypes</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-gradient-to-b from-teal-600 to-teal-700 text-white border-r-0">
          <div className="p-4 border-b border-teal-500">
            <div className="font-bold text-xl mb-1">Fenergo Cockpit</div>
            <div className="text-xs text-teal-100">Executive Dashboard</div>
          </div>
          
          <nav className="p-4 space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg bg-white/20 flex items-center gap-2">
              <Activity className="size-4" />
              <span className="text-sm">Overview</span>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2">
              <Shield className="size-4" />
              <span className="text-sm">Compliance</span>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2">
              <AlertTriangle className="size-4" />
              <span className="text-sm">Risk</span>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2">
              <TrendingUp className="size-4" />
              <span className="text-sm">Operations</span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-teal-500">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-white hover:bg-white/10"
              onClick={onBack}
            >
              <ArrowLeft className="size-4" />
              <span>Back to Prototypes</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Executive Cockpit</h1>
              <p className="text-xs text-slate-600">Real-time operational intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="size-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setShowAddWidget(true)}
              className="gap-2 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">Add Widget</span>
            </Button>
          </div>
        </header>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-b bg-slate-50 px-4 py-3">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">Time Range:</span>
                <select className="text-xs border rounded px-2 py-1">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">Region:</span>
                <select className="text-xs border rounded px-2 py-1">
                  <option>All Regions</option>
                  <option>EMEA</option>
                  <option>APAC</option>
                  <option>Americas</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">Risk Level:</span>
                <select className="text-xs border rounded px-2 py-1">
                  <option>All Levels</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-auto p-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeWidgets.map(w => w.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
        </div>
      </main>

      {/* Add Widget Dialog */}
      <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add Widget</DialogTitle>
            <DialogDescription>Choose from available widgets to add to your dashboard</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {Object.entries(widgetsByCategory).map(([category, widgets]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">{category}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {widgets.map((widget) => (
                    <Card
                      key={widget.id}
                      className="p-4 cursor-pointer hover:shadow-lg transition-shadow hover:border-teal-500"
                      onClick={() => {
                        handleAddWidget(widget);
                        setShowAddWidget(false);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-slate-900">{widget.title}</h4>
                        <Badge variant="outline" className="text-xs">{widget.type}</Badge>
                      </div>
                      <div className="text-xs text-slate-600">Click to add</div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Data Detail Dialog */}
      <Dialog open={!!selectedDataPoint} onOpenChange={() => setSelectedDataPoint(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Data Details</DialogTitle>
          </DialogHeader>
          {selectedDataPoint && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg">
                <pre className="text-xs">{JSON.stringify(selectedDataPoint, null, 2)}</pre>
              </div>
              <p className="text-sm text-slate-600">
                Click on chart elements to view detailed breakdowns and drill into the data.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Widget Expansion Dialog */}
      <Dialog open={!!expandedWidget} onOpenChange={() => setExpandedWidget(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {activeWidgets.find(w => w.id === expandedWidget)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="h-96">
            {activeWidgets.find(w => w.id === expandedWidget)?.component}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
