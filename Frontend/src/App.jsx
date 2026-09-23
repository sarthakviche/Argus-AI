import React, { useState } from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  AlertTriangle, 
  Search, 
  FileText, 
  BarChart2, 
  Settings, 
  Zap, 
  Menu, 
  X,
  Layers,
  Activity
} from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import OverviewScreen from './components/screens/OverviewScreen';
import AlertsScreen from './components/screens/AlertsScreen';
import InvestigationWorkspace from './components/screens/InvestigationWorkspace';
import FraudDetectionForm from './components/screens/FraudDetectionForm';
import TransactionsScreen from './components/screens/TransactionsScreen';
import AnalyticsScreen from './components/screens/AnalyticsScreen';
import SettingsScreen from './components/screens/SettingsScreen';

import { INITIAL_INVESTIGATIONS } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [investigations, setInvestigations] = useState(INITIAL_INVESTIGATIONS);
  const [selectedInvestigation, setSelectedInvestigation] = useState(INITIAL_INVESTIGATIONS[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddNewInvestigation = (newInv) => {
    setInvestigations(prev => [newInv, ...prev]);
    setSelectedInvestigation(newInv);
  };

  const handleUpdateStatus = (id, newStatus, newNotes) => {
    setInvestigations(prev => prev.map(inv => {
      if (inv.id === id) {
        return { ...inv, status: newStatus, notes: newNotes };
      }
      return inv;
    }));
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, count: investigations.filter(i => i.riskScore >= 35).length },
    { id: 'investigations', label: 'Investigations', icon: Layers },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'predict', label: 'Fraud Detection (/predict)', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-[#101828] flex flex-col font-sans">
      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Global Brand Header & Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1630] text-white border-b border-[#1E293B] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Identity */}
            <div 
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setActiveTab('overview')}
            >
              <div className="w-9 h-9 rounded-xl bg-[#315BEA] flex items-center justify-center text-white shadow-xs">
                <ShieldAlert size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-wider text-base text-white font-sans">ARGUS AI</span>
                  <span className="px-1.5 py-0.5 bg-[#315BEA]/30 text-[#5B7CFF] border border-[#315BEA]/40 text-[10px] font-mono font-bold rounded">
                    PRO v2.4
                  </span>
                </div>
                <div className="text-[10px] text-[#94A3B8] font-medium tracking-wide">
                  FINANCIAL RISK & FRAUD INTELLIGENCE
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      isActive 
                        ? 'bg-[#315BEA] text-white shadow-xs' 
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-[#315BEA]' : 'bg-[#DC2626] text-white'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Live System Indicator */}
            <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                <span>Sentinel Live</span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#94A3B8] hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B1630] border-t border-white/10 px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    isActive 
                      ? 'bg-[#315BEA] text-white' 
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DC2626] text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'overview' && (
          <OverviewScreen 
            investigations={investigations}
            onSelectInvestigation={setSelectedInvestigation}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsScreen 
            investigations={investigations}
            onSelectInvestigation={setSelectedInvestigation}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'investigations' && (
          <InvestigationWorkspace 
            investigation={selectedInvestigation}
            onUpdateStatus={handleUpdateStatus}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsScreen 
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'predict' && (
          <FraudDetectionForm 
            onAddNewInvestigation={handleAddNewInvestigation}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsScreen />
        )}

        {activeTab === 'settings' && (
          <SettingsScreen />
        )}
      </main>

      {/* Minimal Enterprise Footer */}
      <footer className="bg-white border-t border-[#E5EAF2] py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#0B1630]">Argus AI</span>
            <span>— Institutional Financial Risk Platform</span>
          </div>
          <div>
            Restrained Intelligence Architecture • Confidential Enterprise Build
          </div>
        </div>
      </footer>
    </div>
  );
}
