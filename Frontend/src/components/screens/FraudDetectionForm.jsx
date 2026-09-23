import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Send, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { predictFraudRisk } from '../../services/api';

export default function FraudDetectionForm({ onAddNewInvestigation, onNavigate }) {
  const [formData, setFormData] = useState({
    customerName: 'Jonathan Hayes',
    amount: '85000',
    currency: 'USD',
    merchantCategory: 'High Risk Crypto / FX',
    isNewDevice: 'true',
    isLocationMismatch: 'true',
    isInternational: 'true',
    velocity24h: '6',
    transactionHour: '3'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Call real /predict API (with automatic embedded ML fallback)
    const inferenceResult = await predictFraudRisk(formData);
    setLoading(false);
    setResult(inferenceResult);
  };

  const handleCreateInvestigation = () => {
    if (!result) return;
    const newInv = {
      id: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      customer: {
        name: formData.customerName,
        email: `${formData.customerName.toLowerCase().replace(' ', '.')}@apexholdings.com`,
        accountId: `ACC-${Math.floor(100000 + Math.random() * 900000)}`,
        tier: 'Corporate Prime',
        memberSince: '2023-05-10',
        riskScoreHistory: [10, 15, result.riskScore]
      },
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      merchant: formData.merchantCategory,
      merchantCategory: formData.merchantCategory,
      location: {
        origin: formData.isLocationMismatch === 'true' ? 'Frankfurt, Germany (IP: 185.120.44.2)' : 'New York, USA',
        registered: 'New York, USA',
        mismatchDistanceKm: formData.isLocationMismatch === 'true' ? 6200 : 0
      },
      device: {
        fingerprint: 'DEV-F99B-88C1',
        deviceType: 'Linux Workstation',
        isNewDevice: formData.isNewDevice === 'true',
        browser: 'Chrome TOR Node'
      },
      riskScore: result.riskScore,
      riskLevel: result.riskLevel,
      detectedFactors: result.factors,
      entityConnections: [
        { type: 'High Velocity Batch', target: `${formData.velocity24h} transfers in 24h`, strength: 'High' }
      ],
      status: 'NEEDS_INVESTIGATION',
      assignedAnalyst: 'Unassigned Analyst Queue',
      notes: [
        { id: 1, author: 'Argus /predict AI', time: 'Just now', text: `Live ML score: ${result.riskScore}/100 (${result.riskLevel})` }
      ]
    };

    onAddNewInvestigation(newInv);
    onNavigate('investigations');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="border-b border-[#E5EAF2] pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#315BEA] uppercase tracking-wider mb-1">
          <Zap size={14} />
          Real-Time ML Scoring Service
        </div>
        <h1 className="text-3xl font-bold text-[#0B1630] tracking-tight">
          Fraud Risk Prediction Endpoint (<span className="font-mono text-[#315BEA]">/predict</span>)
        </h1>
        <p className="text-sm text-[#667085] mt-1">
          Submit transaction telemetry payload to calculate institutional risk index, triggered rules, and actionable recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Panel (7 cols) */}
        <div className="lg:col-span-7 panel-elevation p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1630] mb-1">Customer / Entity Name</label>
                <input 
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="argus-input w-full p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1630] mb-1">Transaction Amount ($ USD)</label>
                <input 
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="argus-input w-full p-2.5 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1630] mb-1">Merchant / Transfer Category</label>
                <select 
                  name="merchantCategory"
                  value={formData.merchantCategory}
                  onChange={handleChange}
                  className="argus-input w-full p-2.5 text-xs"
                >
                  <option value="High Risk Crypto / FX">High Risk Crypto / FX</option>
                  <option value="Cross-Border Offshore Wire">Cross-Border Offshore Wire</option>
                  <option value="SaaS Cloud Infrastructure">SaaS Cloud Infrastructure</option>
                  <option value="B2B Supply Chain Transfer">B2B Supply Chain Transfer</option>
                  <option value="Retail E-Commerce">Retail E-Commerce</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1630] mb-1">Past 24h Velocity Count</label>
                <input 
                  type="number"
                  name="velocity24h"
                  value={formData.velocity24h}
                  onChange={handleChange}
                  className="argus-input w-full p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1630] mb-1">New Device?</label>
                <select 
                  name="isNewDevice"
                  value={formData.isNewDevice}
                  onChange={handleChange}
                  className="argus-input w-full p-2.5 text-xs"
                >
                  <option value="true">Yes (Unrecognized)</option>
                  <option value="false">No (Known Hardware)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1630] mb-1">Location Mismatch?</label>
                <select 
                  name="isLocationMismatch"
                  value={formData.isLocationMismatch}
                  onChange={handleChange}
                  className="argus-input w-full p-2.5 text-xs"
                >
                  <option value="true">Yes (&gt;1,000km)</option>
                  <option value="false">No (Matched IP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1630] mb-1">Execution Hour (0-23)</label>
                <input 
                  type="number"
                  name="transactionHour"
                  min="0"
                  max="23"
                  value={formData.transactionHour}
                  onChange={handleChange}
                  className="argus-input w-full p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5EAF2] flex items-center gap-3">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-[#315BEA] hover:bg-[#2849C9] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Evaluating Neural Model...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Run /predict Inference
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {!result && !loading && (
            <div className="panel-elevation p-8 text-center space-y-3 bg-[#F5F8FF]/50 border-dashed">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF0FF] text-[#315BEA] flex items-center justify-center mx-auto">
                <Sparkles size={24} />
              </div>
              <h3 className="text-sm font-semibold text-[#0B1630]">Awaiting Model Execution</h3>
              <p className="text-xs text-[#667085] max-w-xs mx-auto">
                Submit the form on the left to invoke the Argus ML scoring pipeline.
              </p>
            </div>
          )}

          {loading && (
            <div className="panel-elevation p-8 text-center space-y-4 animate-pulse">
              <div className="w-10 h-10 border-3 border-[#315BEA] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-xs font-semibold text-[#315BEA]">Evaluating Neural Weights & Rule Matrix...</div>
            </div>
          )}

          {result && (
            <div className="panel-elevation p-6 space-y-5 animate-fadeIn border-t-4 border-t-[#315BEA]">
              <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-4">
                <div>
                  <span className="text-xs text-[#667085] uppercase tracking-wider font-semibold">Calculated Risk Index</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-[#0B1630]">{result.riskScore}</span>
                    <span className="text-xs text-[#667085]">/ 100</span>
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  result.riskScore >= 75 ? 'bg-red-100 text-[#DC2626]' :
                  result.riskScore >= 35 ? 'bg-amber-100 text-[#D97706]' : 'bg-emerald-100 text-[#16A34A]'
                }`}>
                  {result.riskLevel}
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-3.5 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2] space-y-1">
                <div className="text-[11px] text-[#667085] font-semibold uppercase">Recommended Action</div>
                <div className="text-xs font-bold text-[#0B1630]">{result.recommendedAction}</div>
              </div>

              {/* Factors */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#0B1630]">Triggered Rules & Factors</div>
                <div className="space-y-2">
                  {result.factors.map((f, i) => (
                    <div key={i} className="p-2.5 bg-white border border-[#E5EAF2] rounded-lg text-xs flex items-center justify-between">
                      <span className="font-semibold text-[#0B1630]">{f.rule}</span>
                      <span className="font-bold text-[#DC2626]">+{f.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <button 
                onClick={handleCreateInvestigation}
                className="w-full py-3 bg-[#315BEA] hover:bg-[#2849C9] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                Send to Investigation Workspace
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
