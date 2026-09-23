import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  User, 
  MapPin, 
  Smartphone, 
  Network, 
  FileText, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  History,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Cpu,
  Layers
} from 'lucide-react';

export default function InvestigationWorkspace({ investigation, onUpdateStatus, onNavigate }) {
  const [activeTab, setActiveTab] = useState('EVIDENCE');
  const [analystNote, setAnalystNote] = useState('');
  const [currentInv, setCurrentInv] = useState(investigation);

  if (!currentInv) {
    return (
      <div className="p-12 text-center text-[#667085]">
        No active investigation selected. Please choose an alert from the work queue.
      </div>
    );
  }

  const handleAction = (status, actionLabel) => {
    const updatedInv = {
      ...currentInv,
      status: status,
      notes: [
        ...currentInv.notes,
        {
          id: Date.now(),
          author: 'You (Current Analyst)',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Exec Action: ${actionLabel}${analystNote ? ` — Note: "${analystNote}"` : ''}`
        }
      ]
    };
    setCurrentInv(updatedInv);
    onUpdateStatus(currentInv.id, status, updatedInv.notes);
    setAnalystNote('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header / Back Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-5">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('alerts')}
            className="p-2 bg-white border border-[#E5EAF2] hover:bg-[#F5F8FF] rounded-xl text-[#667085] hover:text-[#101828] transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#315BEA] bg-[#EAF0FF] px-2 py-0.5 rounded-md">
                {currentInv.id}
              </span>
              <span className="text-xs text-[#667085]">•</span>
              <span className="text-xs text-[#667085]">Flagged {currentInv.timestamp}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0B1630] tracking-tight mt-0.5">
              Investigation Workspace: <span className="font-semibold">{currentInv.customer.name}</span>
            </h1>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase ${
            currentInv.status === 'NEEDS_INVESTIGATION' ? 'bg-red-50 text-[#DC2626] border border-red-200' :
            currentInv.status === 'UNDER_REVIEW' ? 'bg-amber-50 text-[#D97706] border border-amber-200' :
            'bg-emerald-50 text-[#16A34A] border border-emerald-200'
          }`}>
            Current Status: {currentInv.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* 3-Column Layout: Left (Subject), Middle (Risk Evidence), Right (Action Console) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (3 cols): Subject & Infrastructure Profile */}
        <div className="lg:col-span-3 space-y-5">
          {/* Customer Profile Card */}
          <div className="panel-elevation p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E5EAF2] pb-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF0FF] text-[#315BEA] flex items-center justify-center font-bold text-sm">
                <User size={20} />
              </div>
              <div>
                <div className="font-bold text-sm text-[#0B1630]">{currentInv.customer.name}</div>
                <div className="text-[11px] text-[#667085]">{currentInv.customer.tier}</div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#667085]">Account ID:</span>
                <span className="font-mono text-[#0B1630] font-semibold">{currentInv.customer.accountId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Email:</span>
                <span className="text-[#0B1630] truncate max-w-[140px]">{currentInv.customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Member Since:</span>
                <span className="text-[#0B1630]">{currentInv.customer.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Infrastructure & Device Details */}
          <div className="panel-elevation p-5 space-y-4">
            <h3 className="text-xs font-semibold text-[#0B1630] uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone size={14} className="text-[#315BEA]" />
              Hardware & Location
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2]">
                <div className="text-[11px] text-[#667085]">Origin Geo-Location</div>
                <div className="font-semibold text-[#0B1630] mt-0.5 flex items-center gap-1">
                  <MapPin size={12} className="text-[#DC2626]" />
                  {currentInv.location.origin}
                </div>
                <div className="text-[10px] text-[#DC2626] mt-1 font-medium">
                  ⚠ {currentInv.location.mismatchDistanceKm} km mismatch from home profile ({currentInv.location.registered})
                </div>
              </div>

              <div className="p-3 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2]">
                <div className="text-[11px] text-[#667085]">Hardware Signature</div>
                <div className="font-semibold text-[#0B1630] mt-0.5">{currentInv.device.deviceType}</div>
                <div className="text-[10px] text-[#667085] font-mono mt-0.5">{currentInv.device.fingerprint}</div>
                {currentInv.device.isNewDevice && (
                  <span className="inline-block mt-1.5 px-2 py-0.5 bg-amber-100 text-[#D97706] rounded text-[10px] font-semibold">
                    New Device Signature
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column (6 cols): Risk Evidence & Reasoning Engine */}
        <div className="lg:col-span-6 space-y-5">
          {/* Main Risk Score Card */}
          <div className="panel-elevation p-6 bg-gradient-to-br from-white via-[#F5F8FF]/50 to-[#EAF0FF]/30 border-l-4 border-l-[#315BEA]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Evaluated Risk Score</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-extrabold text-[#0B1630]">{currentInv.riskScore}</span>
                  <span className="text-sm font-semibold text-[#667085]">/ 100</span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                    currentInv.riskScore >= 75 ? 'bg-red-100 text-[#DC2626]' :
                    currentInv.riskScore >= 35 ? 'bg-amber-100 text-[#D97706]' : 'bg-emerald-100 text-[#16A34A]'
                  }`}>
                    {currentInv.riskLevel}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-[#667085]">Target Amount</div>
                <div className="text-2xl font-extrabold text-[#0B1630] mt-0.5">
                  ${currentInv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs font-medium text-[#315BEA] mt-0.5">{currentInv.merchant}</div>
              </div>
            </div>
          </div>

          {/* Why Was It Flagged? - Risk Factor Breakdown */}
          <div className="panel-elevation p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0B1630] flex items-center gap-2">
              <Layers size={16} className="text-[#315BEA]" />
              Why Was It Flagged? (ML Weighted Factors)
            </h3>

            <div className="space-y-3">
              {currentInv.detectedFactors.map((factor, index) => (
                <div 
                  key={index}
                  className="p-3.5 bg-white border border-[#E5EAF2] rounded-xl flex items-center justify-between hover:border-[#315BEA]/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-xs shrink-0">
                      +{factor.score}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1630]">{factor.rule}</div>
                      <div className="text-xs text-[#667085] mt-0.5">{factor.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Entity Graph Component */}
          <div className="panel-elevation p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0B1630] flex items-center gap-2">
              <Network size={16} className="text-[#315BEA]" />
              Connected Entity Network
            </h3>

            {currentInv.entityConnections.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#667085] bg-[#F5F8FF] rounded-xl border border-[#E5EAF2]">
                No cross-account anomaly overlaps detected.
              </div>
            ) : (
              <div className="space-y-2">
                {currentInv.entityConnections.map((conn, idx) => (
                  <div key={idx} className="p-3 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#315BEA]"></span>
                      <span className="font-semibold text-[#0B1630]">{conn.type}:</span>
                      <span className="text-[#667085] font-mono">{conn.target}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-100 text-[#D97706] rounded text-[10px] font-semibold">
                      {conn.strength} Confidence Link
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (3 cols): Action Console & Audit Trail */}
        <div className="lg:col-span-3 space-y-5">
          {/* Action Console Card */}
          <div className="panel-elevation p-5 space-y-4 border-t-4 border-t-[#315BEA]">
            <h3 className="text-sm font-bold text-[#0B1630]">Decision Console</h3>

            <div className="space-y-2">
              <button 
                onClick={() => handleAction('CLEARED', 'Approve & Clear Transaction')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <ShieldCheck size={16} />
                Approve & Mark Legitimate
              </button>

              <button 
                onClick={() => handleAction('UNDER_REVIEW', 'Request Step-Up 2FA Verification')}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <AlertTriangle size={16} />
                Request 2FA Step-Up
              </button>

              <button 
                onClick={() => handleAction('NEEDS_INVESTIGATION', 'Freeze Account & Block Txn')}
                className="w-full py-2.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <XCircle size={16} />
                Block & Freeze Account
              </button>
            </div>

            <div className="pt-2 border-t border-[#E5EAF2]">
              <label className="block text-[11px] font-semibold text-[#667085] uppercase mb-1">
                Add Analyst Note / Justification
              </label>
              <textarea 
                rows={3}
                placeholder="Log reason for decision..."
                value={analystNote}
                onChange={(e) => setAnalystNote(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-[#E5EAF2] rounded-xl focus:outline-none focus:border-[#315BEA] focus:ring-2 focus:ring-[#315BEA]/10"
              />
            </div>
          </div>

          {/* Case Audit Trail Log */}
          <div className="panel-elevation p-5 space-y-3">
            <h3 className="text-xs font-semibold text-[#0B1630] uppercase tracking-wider flex items-center gap-1.5">
              <History size={14} className="text-[#315BEA]" />
              Audit Log ({currentInv.notes.length})
            </h3>

            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {currentInv.notes.map((n) => (
                <div key={n.id} className="p-2.5 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#667085]">
                    <span className="font-semibold text-[#0B1630]">{n.author}</span>
                    <span>{n.time}</span>
                  </div>
                  <div className="text-[#101828] text-[11px]">{n.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
