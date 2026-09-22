import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const VELOCITY_DATA = [
  { time: '00:00', totalScanned: 1420, flagged: 12 },
  { time: '04:00', totalScanned: 890, flagged: 4 },
  { time: '08:00', totalScanned: 3200, flagged: 38 },
  { time: '12:00', totalScanned: 5400, flagged: 62 },
  { time: '16:00', totalScanned: 4800, flagged: 45 },
  { time: '20:00', totalScanned: 3900, flagged: 29 },
  { time: '24:00', totalScanned: 2100, flagged: 18 },
];

export default function OverviewScreen({ investigations, onSelectInvestigation, onNavigate }) {
  const highRiskCount = investigations.filter(i => i.riskScore >= 75).length;
  const reviewCount = investigations.filter(i => i.riskScore >= 35 && i.riskScore < 75).length;
  const clearedCount = investigations.filter(i => i.riskScore < 35).length;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Banner / Editorial Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5EAF2] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#315BEA] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#315BEA] animate-pulse-subtle"></span>
            Live Intelligence Stream
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#0B1630] tracking-tight">
            Fraud intelligence, <span className="font-editorial text-[#315BEA]">made actionable.</span>
          </h1>
          <p className="text-sm text-[#667085] mt-1 max-w-2xl">
            Real-time ML anomaly detection across global settlement gateways. High-precision risk scoring without operational friction.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('predict')}
            className="px-4 py-2.5 bg-[#315BEA] hover:bg-[#2849C9] text-white text-sm font-medium rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <ShieldAlert size={16} />
            Run Fraud Prediction
          </button>
          <button 
            onClick={() => onNavigate('alerts')}
            className="px-4 py-2.5 bg-white border border-[#E5EAF2] hover:bg-[#F5F8FF] text-[#101828] text-sm font-medium rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            Analyst Queue ({highRiskCount + reviewCount})
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Restrained & Purposeful */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card-elevation p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085] uppercase tracking-wider">Total Scanned Today</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF0FF] text-[#315BEA] flex items-center justify-center">
              <Activity size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#0B1630]">21,710</div>
            <div className="flex items-center gap-1.5 text-xs text-[#16A34A] mt-1 font-medium">
              <TrendingUp size={14} />
              +14.2% vs previous 24h
            </div>
          </div>
        </div>

        <div className="card-elevation p-5 flex flex-col justify-between border-l-4 border-l-[#DC2626]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085] uppercase tracking-wider">Active High Risk Alerts</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#DC2626]">{highRiskCount}</div>
            <div className="text-xs text-[#667085] mt-1">Requires immediate investigation</div>
          </div>
        </div>

        <div className="card-elevation p-5 flex flex-col justify-between border-l-4 border-l-[#D97706]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085] uppercase tracking-wider">Needs Analyst Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#D97706] flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#D97706]">{reviewCount}</div>
            <div className="text-xs text-[#667085] mt-1">Score between 35 – 74</div>
          </div>
        </div>

        <div className="card-elevation p-5 flex flex-col justify-between border-l-4 border-l-[#16A34A]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#667085] uppercase tracking-wider">Auto-Cleared Pass Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#0B1630]">99.4%</div>
            <div className="text-xs text-[#16A34A] mt-1">0.02% false positive rate</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Priority Risk Queue + Live Risk Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Priority Risk Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#0B1630]">Priority Risk Queue</h2>
              <p className="text-xs text-[#667085]">Flagged transactions demanding decision action</p>
            </div>
            <button 
              onClick={() => onNavigate('alerts')}
              className="text-xs font-semibold text-[#315BEA] hover:underline flex items-center gap-1"
            >
              View All Alerts
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="panel-elevation overflow-hidden border border-[#E5EAF2]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F5F8FF] border-b border-[#E5EAF2] text-[#667085] font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Risk Index</th>
                    <th className="py-3 px-4">Transaction / Customer</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Primary Anomaly</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2]">
                  {investigations.map((inv) => (
                    <tr 
                      key={inv.id}
                      data-interactive="true"
                      className="hover:bg-[#F5F8FF]/60 transition-colors cursor-pointer"
                      onClick={() => {
                        onSelectInvestigation(inv);
                        onNavigate('investigations');
                      }}
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            inv.riskScore >= 75 
                              ? 'bg-red-100 text-[#DC2626]' 
                              : inv.riskScore >= 35 
                              ? 'bg-amber-100 text-[#D97706]' 
                              : 'bg-emerald-100 text-[#16A34A]'
                          }`}>
                            {inv.riskScore}
                          </div>
                          <div>
                            <div className={`font-semibold ${
                              inv.riskScore >= 75 ? 'text-[#DC2626]' : inv.riskScore >= 35 ? 'text-[#D97706]' : 'text-[#16A34A]'
                            }`}>
                              {inv.riskLevel}
                            </div>
                            <div className="text-[10px] text-[#667085]">{inv.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#0B1630]">{inv.customer.name}</div>
                        <div className="text-[11px] text-[#667085] font-mono">{inv.transactionId}</div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-semibold text-[#0B1630]">
                          ${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-[#667085]">{inv.currency}</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="text-xs font-medium text-[#101828]">
                          {inv.detectedFactors[0]?.rule || 'Standard Evaluation'}
                        </div>
                        <div className="text-[11px] text-[#667085] truncate max-w-[200px]">
                          {inv.detectedFactors[0]?.description || 'No anomaly flagged'}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectInvestigation(inv);
                            onNavigate('investigations');
                          }}
                          className="px-3 py-1.5 bg-[#EAF0FF] hover:bg-[#315BEA] text-[#315BEA] hover:text-white font-medium rounded-lg text-xs transition-colors inline-flex items-center gap-1"
                        >
                          Investigate
                          <ArrowUpRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Risk Velocity Chart */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[#0B1630]">Risk Velocity Trend</h2>
            <p className="text-xs text-[#667085]">24-hour transaction volume vs flagged risk</p>
          </div>

          <div className="panel-elevation p-5 space-y-4">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VELOCITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#315BEA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#315BEA" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF2" vertical={false} />
                  <XAxis dataKey="time" stroke="#667085" fontSize={11} tickLine={false} />
                  <YAxis stroke="#667085" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1630', borderColor: '#315BEA', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                    itemStyle={{ color: '#EAF0FF' }}
                  />
                  <Area type="monotone" dataKey="totalScanned" stroke="#315BEA" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" name="Scanned Txns" />
                  <Area type="monotone" dataKey="flagged" stroke="#DC2626" strokeWidth={2} fillOpacity={1} fill="url(#colorFlagged)" name="Flagged Risk" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#315BEA]"></span>
                <span className="text-[#667085]">Avg Settlement Time:</span>
              </div>
              <span className="font-semibold text-[#0B1630]">1.4 seconds</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
