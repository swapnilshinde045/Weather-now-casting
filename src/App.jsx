import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { LiveDashboard } from './components/LiveDashboard';
import { HyperLocalMap } from './components/HyperLocalMap';
import { NowcastingTimeline } from './components/NowcastingTimeline';
import { AiRiskEngine } from './components/AiRiskEngine';
import { EarlyWarningSystem } from './components/EarlyWarningSystem';
import { DemoSimulationControls } from './components/DemoSimulationControls';
import { NotificationToast } from './components/NotificationToast';
import { ComparisonSection } from './components/ComparisonSection';
import { SystemArchitecture } from './components/SystemArchitecture';
import { UserExperienceCitizen } from './components/UserExperienceCitizen';
import { AnalyticsDemo } from './components/AnalyticsDemo';
import { PresentationModeView } from './components/PresentationModeView';
import { AdminControlPanel } from './components/AdminControlPanel';
import { ApiDataInfo } from './components/ApiDataInfo';
import { ShieldAlert, Sparkles, Terminal } from 'lucide-react';

const DashboardMain = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const { isPresentationMode } = useSimulation();

  if (isPresentationMode) {
    return <PresentationModeView />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Warning Toast */}
      <NotificationToast />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 space-y-8">
        
        {/* Hero Landing View */}
        {activeTab === 'hero' && (
          <>
            <HeroLanding 
              onLaunchDemo={() => setActiveTab('dashboard')} 
              onHowItWorks={() => setActiveTab('architecture')} 
            />

            <div className="space-y-8 pt-4">
              <LiveDashboard />
              <HyperLocalMap />
              <NowcastingTimeline />
              <EarlyWarningSystem />
              <ApiDataInfo />
            </div>
          </>
        )}

        {/* Live Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 pt-4">
            <LiveDashboard />
            <HyperLocalMap />
            <NowcastingTimeline />
            <AnalyticsDemo />
          </div>
        )}

        {/* GIS Map View */}
        {activeTab === 'map' && (
          <div className="space-y-8 pt-4">
            <HyperLocalMap />
            <LiveDashboard />
          </div>
        )}

        {/* AI Nowcasting View */}
        {activeTab === 'nowcasting' && (
          <div className="space-y-8 pt-4">
            <NowcastingTimeline />
            <AiRiskEngine />
          </div>
        )}

        {/* Early Warning System View */}
        {activeTab === 'warning-system' && (
          <div className="space-y-8 pt-4">
            <EarlyWarningSystem />
            <AdminControlPanel />
            <UserExperienceCitizen />
          </div>
        )}

        {/* Admin Control Panel View */}
        {activeTab === 'admin-panel' && (
          <div className="space-y-8 pt-4">
            <AdminControlPanel />
            <ApiDataInfo />
          </div>
        )}

        {/* Comparison Section View */}
        {activeTab === 'comparison' && (
          <div className="pt-4">
            <ComparisonSection />
          </div>
        )}

        {/* Architecture & Flowchart View */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 pt-4">
            <SystemArchitecture />
            <ApiDataInfo />
          </div>
        )}

        {/* 7-API Network View */}
        {activeTab === 'api-info' && (
          <div className="pt-4">
            <ApiDataInfo />
          </div>
        )}

      </main>

      {/* Floating Telemetry Scenario Stream Controls at Bottom */}
      <DemoSimulationControls />

      {/* Modern Dark SaaS Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-center text-xs text-zinc-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white">AGNI-CAST • SIH26077 Operational Weather Engine</span>
          </div>

          <div className="flex items-center space-x-4 text-zinc-500 text-[11px]">
            <span>INSAT-3DR Satellite Stream</span>
            <span>•</span>
            <span>Google Gemini 2.0 AI</span>
            <span>•</span>
            <span>CAP v1.2 Protocol</span>
          </div>

          <div className="text-zinc-500 text-[11px]">
            Team DEBUGGERS • Chhatrapati Sambhajinagar District
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <DashboardMain />
    </SimulationProvider>
  );
}
