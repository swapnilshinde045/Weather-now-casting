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
import { ShieldAlert } from 'lucide-react';

const DashboardMain = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const { isPresentationMode } = useSimulation();

  if (isPresentationMode) {
    return <PresentationModeView />;
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 flex flex-col font-sans">
      
      {/* Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Warning Toast */}
      <NotificationToast />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
        
        {/* Landing Page */}
        {activeTab === 'hero' && (
          <>
            <HeroLanding 
              onLaunchDemo={() => setActiveTab('dashboard')} 
              onHowItWorks={() => setActiveTab('architecture')} 
            />

            <div className="space-y-6">
              <LiveDashboard />
              <HyperLocalMap />
              <NowcastingTimeline />
              <EarlyWarningSystem />
            </div>
          </>
        )}

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <LiveDashboard />
            <HyperLocalMap />
            <NowcastingTimeline />
            <AnalyticsDemo />
          </div>
        )}

        {/* GIS Map View */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <HyperLocalMap />
            <LiveDashboard />
          </div>
        )}

        {/* AI Nowcasting View */}
        {activeTab === 'nowcasting' && (
          <div className="space-y-6">
            <NowcastingTimeline />
            <AiRiskEngine />
          </div>
        )}

        {/* Early Warning System View */}
        {activeTab === 'warning-system' && (
          <div className="space-y-6">
            <EarlyWarningSystem />
            <AdminControlPanel />
            <UserExperienceCitizen />
          </div>
        )}

        {/* Admin Control Panel View */}
        {activeTab === 'admin-panel' && (
          <div className="space-y-6">
            <AdminControlPanel />
            <ApiDataInfo />
          </div>
        )}

        {/* Comparison View */}
        {activeTab === 'comparison' && <ComparisonSection />}

        {/* System Architecture View */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <SystemArchitecture />
            <ApiDataInfo />
          </div>
        )}

        {/* 7-API Network View */}
        {activeTab === 'api-info' && <ApiDataInfo />}

      </main>

      {/* Operational Telemetry Scenario Stream Controls at Bottom */}
      <DemoSimulationControls />

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500 font-mono">
        <div className="flex items-center justify-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-800" />
          <span className="font-bold text-stone-800">SIH26077 — AI-Driven Hyper-Local Early Warning System</span>
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
