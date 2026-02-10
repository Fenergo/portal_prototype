import { Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

const cases = [
  { id: 'KYC-2401', type: 'Approval', client: 'Acme Corp', status: 'pending', time: '2h ago', priority: 'high', color: '#F59E0B' },
  { id: 'AML-2402', type: 'Escalation', client: 'TechStart Ltd', status: 'review', time: '4h ago', priority: 'critical', color: '#EF4444' },
  { id: 'KYC-2403', type: 'Approval', client: 'Global Industries', status: 'pending', time: '6h ago', priority: 'medium', color: '#6366F1' },
  { id: 'TRD-2404', type: 'Escalation', client: 'Finance Co', status: 'review', time: '8h ago', priority: 'high', color: '#F59E0B' },
];

export function OpenCasesWidget() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{cases.length}</span>
        <span className="text-[11px] text-slate-400 font-medium">open cases</span>
      </div>
      <div className="space-y-1.5 flex-1">
        {cases.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            {/* Priority indicator */}
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${item.color}12` }}
            >
              {item.type === 'Escalation' ? (
                <AlertTriangle className="h-3.5 w-3.5" style={{ color: item.color }} />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" style={{ color: item.color }} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-slate-800">{item.client}</span>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{item.id}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-slate-400">{item.type}</span>
                <span className="text-slate-300">·</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {item.time}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
