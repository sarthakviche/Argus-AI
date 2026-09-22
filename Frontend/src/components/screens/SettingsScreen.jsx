import React, { useState } from 'react';
import { Sliders, Server, Save, Check } from 'lucide-react';
import ArgusSlider from '../ArgusSlider';

export default function SettingsScreen() {
  const [highRiskThreshold, setHighRiskThreshold] = useState(75);
  const [reviewThreshold, setReviewThreshold] = useState(35);
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:5000/predict');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
      <div className="border-b border-[#E5EAF2] pb-5">
        <h1 className="text-2xl font-bold text-[#0B1630]">Platform Settings & Sensitivity</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Configure real-time ML risk scoring thresholds, API endpoints, and webhook parameters
        </p>
      </div>

      <div className="space-y-6">
        {/* Threshold Sliders */}
        <div className="panel-elevation p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E5EAF2] pb-4">
            <Sliders size={20} className="text-[#315BEA]" />
            <div>
              <h2 className="text-sm font-bold text-[#0B1630]">Risk Classification Boundaries</h2>
              <p className="text-xs text-[#667085]">Set global cutoffs for automated blocking and analyst triage</p>
            </div>
          </div>

          <div className="space-y-6">
            <ArgusSlider 
              label="High Risk Boundary (Automated Hold / Block)"
              value={highRiskThreshold}
              min={50}
              max={95}
              color="red"
              onChange={setHighRiskThreshold}
            />

            <ArgusSlider 
              label="Needs Review Boundary (Triage Queue)"
              value={reviewThreshold}
              min={15}
              max={50}
              color="amber"
              onChange={setReviewThreshold}
            />
          </div>
        </div>

        {/* API Endpoint Config */}
        <div className="panel-elevation p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E5EAF2] pb-4">
            <Server size={20} className="text-[#315BEA]" />
            <div>
              <h2 className="text-sm font-bold text-[#0B1630]">ML Model Inference Gateway</h2>
              <p className="text-xs text-[#667085]">Production /predict REST HTTP endpoint</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0B1630] mb-1">Target `/predict` URL</label>
              <input 
                type="text" 
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="argus-input w-full p-2.5 font-mono text-xs"
              />
            </div>

            <div className="p-3 bg-[#F5F8FF] rounded-xl border border-[#E5EAF2] text-[11px] text-[#667085]">
              ℹ Current Status: Active with synchronous client-side ML engine backup.
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#315BEA] hover:bg-[#2849C9] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            {saved ? (
              <>
                <Check size={16} />
                Settings Saved!
              </>
            ) : (
              <>
                <Save size={16} />
                Save System Configuration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
