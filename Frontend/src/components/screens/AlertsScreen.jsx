import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Filter, 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Shield, 
  SlidersHorizontal,
  CheckSquare,
  Square
} from 'lucide-react';

export default function AlertsScreen({ investigations, onSelectInvestigation, onNavigate }) {
  const [filterTab, setFilterTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredInvestigations = investigations.filter(inv => {
    const matchesFilter = 
      filterTab === 'ALL' ? true :
      filterTab === 'HIGH' ? inv.riskScore >= 75 :
      filterTab === 'REVIEW' ? inv.riskScore >= 35 && inv.riskScore < 75 :
      filterTab === 'CLEARED' ? inv.riskScore < 35 : true;

    const matchesSearch = 
      inv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.merchant.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInvestigations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInvestigations.map(i => i.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1630]">Alert Work Queue</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Analyst triage system for suspicious transaction events and compliance holds
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input 
            type="text"
            placeholder="Search by customer, TXN ID, merchant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5EAF2] rounded-xl text-xs text-[#101828] placeholder-[#667085] focus:outline-none focus:border-[#315BEA] focus:ring-2 focus:ring-[#315BEA]/10 shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-[#F5F8FF] p-1 rounded-xl border border-[#E5EAF2]">
          <button 
            onClick={() => setFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterTab === 'ALL' ? 'bg-white text-[#315BEA] shadow-xs font-semibold' : 'text-[#667085] hover:text-[#101828]'
            }`}
          >
            All Alerts ({investigations.length})
          </button>
          <button 
            onClick={() => setFilterTab('HIGH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterTab === 'HIGH' ? 'bg-white text-[#DC2626] shadow-xs font-semibold' : 'text-[#667085] hover:text-[#DC2626]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
            High Risk ({investigations.filter(i => i.riskScore >= 75).length})
          </button>
          <button 
            onClick={() => setFilterTab('REVIEW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterTab === 'REVIEW' ? 'bg-white text-[#D97706] shadow-xs font-semibold' : 'text-[#667085] hover:text-[#D97706]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
            Needs Review ({investigations.filter(i => i.riskScore >= 35 && i.riskScore < 75).length})
          </button>
          <button 
            onClick={() => setFilterTab('CLEARED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterTab === 'CLEARED' ? 'bg-white text-[#16A34A] shadow-xs font-semibold' : 'text-[#667085] hover:text-[#16A34A]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            Cleared ({investigations.filter(i => i.riskScore < 35).length})
          </button>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-[#EAF0FF] px-3 py-1.5 rounded-xl border border-[#315BEA]/20">
            <span className="text-xs font-semibold text-[#315BEA]">{selectedIds.length} Selected</span>
            <button 
              onClick={() => alert(`Approved ${selectedIds.length} transaction(s)`)}
              className="px-2.5 py-1 bg-white text-[#16A34A] border border-[#E5EAF2] hover:bg-emerald-50 rounded-lg text-xs font-medium transition-colors"
            >
              Bulk Approve
            </button>
            <button 
              onClick={() => alert(`Escalated ${selectedIds.length} transaction(s)`)}
              className="px-2.5 py-1 bg-[#315BEA] text-white hover:bg-[#2849C9] rounded-lg text-xs font-medium transition-colors"
            >
              Bulk Escalate
            </button>
          </div>
        )}
      </div>

      {/* Main Alert Queue Table */}
      <div className="panel-elevation overflow-hidden border border-[#E5EAF2]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F8FF] border-b border-[#E5EAF2] text-[#667085] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 w-10">
                  <button onClick={toggleSelectAll} className="text-[#667085] hover:text-[#101828]">
                    {selectedIds.length === filteredInvestigations.length && filteredInvestigations.length > 0 ? (
                      <CheckSquare size={16} className="text-[#315BEA]" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">Risk Index</th>
                <th className="py-3 px-4">Transaction / Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Origin / Device</th>
                <th className="py-3 px-4">Detected Anomalies</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2]">
              {filteredInvestigations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#667085]">
                    No alerts match your selected filters.
                  </td>
                </tr>
              ) : (
                filteredInvestigations.map((inv) => (
                  <tr 
                    key={inv.id}
                    data-interactive="true"
                    className={`hover:bg-[#F5F8FF]/60 transition-colors cursor-pointer ${
                      selectedIds.includes(inv.id) ? 'bg-[#EAF0FF]/30' : ''
                    }`}
                    onClick={() => {
                      onSelectInvestigation(inv);
                      onNavigate('investigations');
                    }}
                  >
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleSelect(inv.id)} className="text-[#667085] hover:text-[#101828]">
                        {selectedIds.includes(inv.id) ? (
                          <CheckSquare size={16} className="text-[#315BEA]" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          inv.riskScore >= 75 
                            ? 'bg-red-100 text-[#DC2626] border border-red-200' 
                            : inv.riskScore >= 35 
                            ? 'bg-amber-100 text-[#D97706] border border-amber-200' 
                            : 'bg-emerald-100 text-[#16A34A] border border-emerald-200'
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
                      <div className="text-xs text-[#101828] font-medium truncate max-w-[150px]">
                        {inv.location.origin}
                      </div>
                      <div className="text-[10px] text-[#667085]">
                        {inv.device.deviceType}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {inv.detectedFactors.slice(0, 2).map((factor, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 rounded-md bg-[#F5F8FF] text-[#315BEA] border border-[#E5EAF2] text-[10px] font-medium"
                          >
                            +{factor.score} {factor.rule}
                          </span>
                        ))}
                        {inv.detectedFactors.length > 2 && (
                          <span className="text-[10px] text-[#667085] self-center">
                            +{inv.detectedFactors.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                        inv.status === 'NEEDS_INVESTIGATION' ? 'bg-red-50 text-[#DC2626] border border-red-200' :
                        inv.status === 'UNDER_REVIEW' ? 'bg-amber-50 text-[#D97706] border border-amber-200' :
                        'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                      }`}>
                        {inv.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectInvestigation(inv);
                          onNavigate('investigations');
                        }}
                        className="px-3 py-1.5 bg-[#315BEA] hover:bg-[#2849C9] text-white font-medium rounded-lg text-xs shadow-xs transition-colors inline-flex items-center gap-1.5"
                      >
                        Investigate
                        <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
