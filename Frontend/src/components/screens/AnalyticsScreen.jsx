import React from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { ShieldAlert, TrendingUp, Globe, PieChart as PieIcon } from 'lucide-react';

const RISK_BAND_DATA = [
  { band: '0 - 20 (Clean)', count: 18450, color: '#16A34A' },
  { band: '21 - 40 (Low)', count: 2100, color: '#315BEA' },
  { band: '41 - 60 (Moderate)', count: 720, color: '#5B7CFF' },
  { band: '61 - 80 (Elevated)', count: 340, color: '#D97706' },
  { band: '81 - 100 (Severe)', count: 100, color: '#DC2626' }
];

const ANOMALY_TYPE_DATA = [
  { name: 'Amount Anomaly', value: 42, color: '#315BEA' },
  { name: 'Hardware Signature', value: 26, color: '#5B7CFF' },
  { name: 'Geo Mismatch', value: 18, color: '#D97706' },
  { name: 'Velocity Burst', value: 14, color: '#DC2626' }
];

export default function AnalyticsScreen() {
  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="border-b border-[#E5EAF2] pb-5">
        <h1 className="text-2xl font-bold text-[#0B1630]">Financial Intelligence & Risk Analytics</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Aggregate threat vector statistics, risk distribution histograms, and model precision performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Score Band Distribution */}
        <div className="panel-elevation p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#0B1630]">Risk Index Distribution Histogram</h2>
              <p className="text-xs text-[#667085]">Volume of processed transactions grouped by risk score band</p>
            </div>
            <ShieldAlert size={18} className="text-[#315BEA]" />
          </div>

          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RISK_BAND_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF2" vertical={false} />
                <XAxis dataKey="band" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1630', borderColor: '#315BEA', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {RISK_BAND_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Primary Anomaly Categories */}
        <div className="panel-elevation p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#0B1630]">Anomaly Vector Contribution</h2>
              <p className="text-xs text-[#667085]">Proportion of flagged score weights by trigger category</p>
            </div>
            <PieIcon size={18} className="text-[#315BEA]" />
          </div>

          <div className="h-[240px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ANOMALY_TYPE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ANOMALY_TYPE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1630', borderColor: '#315BEA', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5EAF2]">
            {ANOMALY_TYPE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[#667085]">{item.name}:</span>
                <span className="font-bold text-[#0B1630]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
