import React, { useState } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  SlidersHorizontal, 
  FileText, 
  X,
  CreditCard,
  Building,
  Clock
} from 'lucide-react';
import { INITIAL_TRANSACTIONS } from '../../services/api';

export default function TransactionsScreen({ onNavigate }) {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [selectedTxn, setSelectedTxn] = useState(null);

  const filtered = transactions.filter(t => 
    t.customer.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.merchant.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1630]">Transaction Ledger</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Immutable settlement stream log and financial payload inspection
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
          <input 
            type="text"
            placeholder="Search transaction ID, customer, merchant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5EAF2] rounded-xl text-xs text-[#101828] focus:outline-none focus:border-[#315BEA]"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="panel-elevation overflow-hidden border border-[#E5EAF2]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5F8FF] border-b border-[#E5EAF2] text-[#667085] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Merchant / Category</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF2]">
              {filtered.map((t) => (
                <tr 
                  key={t.id}
                  data-interactive="true"
                  className="hover:bg-[#F5F8FF]/60 transition-colors cursor-pointer"
                  onClick={() => setSelectedTxn(t)}
                >
                  <td className="py-4 px-4 font-mono font-bold text-[#315BEA]">{t.id}</td>
                  <td className="py-4 px-4 font-semibold text-[#0B1630]">{t.customer}</td>
                  <td className="py-4 px-4 font-bold text-[#0B1630]">
                    ${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-[#101828]">{t.merchant}</div>
                    <div className="text-[10px] text-[#667085]">{t.category}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      t.riskScore >= 75 ? 'bg-red-100 text-[#DC2626]' :
                      t.riskScore >= 35 ? 'bg-amber-100 text-[#D97706]' : 'bg-emerald-100 text-[#16A34A]'
                    }`}>
                      {t.riskScore} / 100
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#667085]">{t.time}</td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTxn(t);
                      }}
                      className="px-2.5 py-1.5 bg-[#EAF0FF] hover:bg-[#315BEA] text-[#315BEA] hover:text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Inspect Payload
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Drawer Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 animate-slideLeft">
            <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-4">
              <div>
                <span className="text-xs text-[#315BEA] font-mono font-bold">{selectedTxn.id}</span>
                <h2 className="text-lg font-bold text-[#0B1630]">Transaction Payload Details</h2>
              </div>
              <button 
                onClick={() => setSelectedTxn(null)}
                className="p-2 hover:bg-[#F5F8FF] rounded-xl text-[#667085]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#667085]">Customer:</span>
                  <span className="font-semibold text-[#0B1630]">{selectedTxn.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Amount:</span>
                  <span className="font-extrabold text-[#0B1630]">${selectedTxn.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Merchant:</span>
                  <span className="text-[#0B1630]">{selectedTxn.merchant}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-[#0B1630]">Raw JSON Payload</div>
                <pre className="p-4 bg-[#0B1630] text-[#EAF0FF] font-mono text-[11px] rounded-xl overflow-x-auto">
{JSON.stringify(selectedTxn, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
