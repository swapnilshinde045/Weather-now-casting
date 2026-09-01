import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/demoWeatherData';
import { HeroLanding } from './HeroLanding';
import { LiveDashboard } from './LiveDashboard';
import { HyperLocalMap } from './HyperLocalMap';
import { NowcastingTimeline } from './NowcastingTimeline';
import { AiRiskEngine } from './AiRiskEngine';
import { EarlyWarningSystem } from './EarlyWarningSystem';
import { UserExperienceCitizen } from './UserExperienceCitizen';
import { ComparisonSection } from './ComparisonSection';
import { SystemArchitecture } from './SystemArchitecture';
import { ChevronLeft, ChevronRight, X, Tv, Keyboard, Sun, CloudRain, CloudLightning, Zap } from 'lucide-react';

export const PresentationModeView = () => {
  const { 
    togglePresentationMode, 
    scenario, 
    setScenario,
    currentScenarioMeta,
    playAlertSound
  } = useSimulation();

  const [currentSlide, setCurrentSlide] = useState(0);

  // 9 Presentation Slides
  const slides = [
    {
      id: 'title',
      title: 'Problem & Project Overview',
      subtitle: 'SIH26077 • AI-Driven Hyper-Local Severe Weather Early Warning',
      component: (
        <div className="py-6">
          <HeroLanding onLaunchDemo={() => setCurrentSlide(1)} onHowItWorks={() => setCurrentSlide(8)} />
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'Live Weather Telemetry Command',
      subtitle: 'Sector Telemetry Feed for Chhatrapati Sambhajinagar Monitored Zone',
      component: <LiveDashboard />
    },
    {
      id: 'map',
      title: 'Hyper-Local Geospatial Risk Map',
      subtitle: 'Interactive Sector Surveillance & Color-Coded Risk Zones',
      component: <HyperLocalMap />
    },
    {
      id: 'nowcasting',
      title: 'AI Nowcasting Simulation (90-Min)',
      subtitle: 'Spatial-Temporal Predictive Rainfall & Wind Vector Trajectory',
      component: <NowcastingTimeline />
    },
    {
      id: 'risk-engine',
      title: 'AI Risk Engine & Feature Weighting',
      subtitle: 'Multi-Factor Neural Pipeline & Calculated Risk Score',
      component: <AiRiskEngine />
    },
    {
      id: 'warning',
      title: 'Early Warning Siren & Advisory',
      subtitle: 'Automated Emergency Siren & Recommended Actionable Instructions',
      component: <EarlyWarningSystem />
    },
    {
      id: 'citizen',
      title: 'Citizen Mobile Alert Experience',
      subtitle: 'Multilingual Cell Broadcast System (English / Marathi / Hindi)',
      component: <UserExperienceCitizen />
    },
    {
      id: 'comparison',
      title: 'Proposed System vs Traditional Bulletins',
      subtitle: 'Targeted Improvement Matrix for Disaster Management',
      component: <ComparisonSection />
    },
    {
      id: 'architecture',
      title: 'System Workflow Architecture',
      subtitle: 'End-to-End Pipeline from Telemetry to Actionable Alerts',
      component: <SystemArchitecture />
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard Navigation: Left Arrow (←) and Right Arrow (→)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        togglePresentationMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, togglePresentationMode]);

  const activeSlideObj = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 flex flex-col justify-between p-4 sm:p-6 font-sans relative selection:bg-amber-200">
      
      {/* Top Header Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs sticky top-4 z-40">
        
        {/* Left Title & Slide Counter */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-stone-900 text-amber-400 font-bold">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-sm sm:text-base text-stone-900">
                SIH26077 JUDGE PRESENTATION DECK
              </span>
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Slide {currentSlide + 1} of {totalSlides}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono">
              Use Left (←) / Right (→) Arrow Keys to Navigate
            </p>
          </div>
        </div>

        {/* Right Controls: Weather Presets & Exit */}
        <div className="flex items-center space-x-2">
          
          {/* Weather Scenario Pills */}
          <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-mono">
            <button
              onClick={() => { setScenario(SCENARIOS.NORMAL); playAlertSound(440, 0.2); }}
              className={`px-2 py-1 rounded font-bold transition ${scenario === SCENARIOS.NORMAL ? 'bg-emerald-700 text-white' : 'text-stone-600 hover:text-stone-900'}`}
            >
              Normal
            </button>
            <button
              onClick={() => { setScenario(SCENARIOS.MODERATE_RAIN); playAlertSound(600, 0.2); }}
              className={`px-2 py-1 rounded font-bold transition ${scenario === SCENARIOS.MODERATE_RAIN ? 'bg-amber-600 text-white' : 'text-stone-600 hover:text-stone-900'}`}
            >
              Rain
            </button>
            <button
              onClick={() => setScenario(SCENARIOS.HEAVY_RAIN)}
              className={`px-2 py-1 rounded font-bold transition ${scenario === SCENARIOS.HEAVY_RAIN ? 'bg-rose-600 text-white' : 'text-stone-600 hover:text-stone-900'}`}
            >
              Heavy
            </button>
            <button
              onClick={() => setScenario(SCENARIOS.SEVERE_WEATHER)}
              className={`px-2 py-1 rounded font-bold transition ${scenario === SCENARIOS.SEVERE_WEATHER ? 'bg-purple-700 text-white' : 'text-stone-600 hover:text-stone-900'}`}
            >
              Severe
            </button>
          </div>

          <button
            onClick={togglePresentationMode}
            className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-mono font-bold text-xs shadow-2xs transition flex items-center space-x-1 cursor-pointer"
          >
            <X className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>

      </div>

      {/* Main Slide Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto my-6 space-y-4">
        
        {/* Active Slide Header Bar */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-800">
              SLIDE 0{currentSlide + 1} • {activeSlideObj.subtitle}
            </span>
            <h2 className="text-xl font-extrabold text-stone-900">
              {activeSlideObj.title}
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-stone-400 hidden sm:inline">Controls:</span>
            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-300 font-bold flex items-center gap-1">
              <Keyboard className="w-3 h-3 text-stone-500" />
              ← Previous
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-300 font-bold flex items-center gap-1">
              Next →
            </span>
          </div>
        </div>

        {/* Slide Component */}
        <div className="transition-all duration-300">
          {activeSlideObj.component}
        </div>

      </main>

      {/* Bottom Sticky Presentation Control Deck */}
      <footer className="sticky bottom-4 z-40 max-w-2xl w-full mx-auto bg-stone-900 text-white rounded-2xl p-3 shadow-2xl border border-stone-800 flex items-center justify-between gap-4 font-mono text-xs">
        
        {/* Left Arrow Button */}
        <button
          disabled={currentSlide === 0}
          onClick={prevSlide}
          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800 text-white font-bold transition flex items-center space-x-2 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-amber-400" />
          <span>← Previous Slide</span>
        </button>

        {/* Slide Dots / Indicator */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                idx === currentSlide ? 'bg-amber-400 ring-2 ring-amber-300 scale-110' : 'bg-stone-700 hover:bg-stone-600'
              }`}
              title={`Jump to ${s.title}`}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          disabled={currentSlide === totalSlides - 1}
          onClick={nextSlide}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:hover:bg-amber-600 text-white font-black transition flex items-center space-x-2 cursor-pointer shadow-md"
        >
          <span>Next Slide →</span>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

      </footer>

    </div>
  );
};
