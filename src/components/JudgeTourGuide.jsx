import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/demoWeatherData';
import { Play, ChevronRight, ChevronLeft, Award, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export const JudgeTourGuide = ({ setActiveTab }) => {
  const { setScenario, setIsPresentationMode, setSelectedLocationId } = useSimulation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      step: 1,
      title: 'STEP 1: Baseline Stability',
      desc: 'Show stable dashboard where all 5 sectors are green and monitored.',
      action: () => {
        setScenario(SCENARIOS.NORMAL);
        setSelectedLocationId('waluj');
        setActiveTab('dashboard');
      }
    },
    {
      step: 2,
      title: 'STEP 2: Trigger Heavy Rain',
      desc: 'Click "Heavy Rain Simulation" preset to simulate atmospheric cell buildup.',
      action: () => {
        setScenario(SCENARIOS.HEAVY_RAIN);
        setActiveTab('dashboard');
      }
    },
    {
      step: 3,
      title: 'STEP 3: Map Risk Color Shift',
      desc: 'Inspect Leaflet map as risk circles transition 🟢 → 🟡 → 🟠.',
      action: () => {
        setScenario(SCENARIOS.HEAVY_RAIN);
        setActiveTab('map');
      }
    },
    {
      step: 4,
      title: 'STEP 4: Nowcasting Escalation',
      desc: 'Show 90-minute prediction timeline chart escalating risk trajectory.',
      action: () => {
        setActiveTab('nowcasting');
      }
    },
    {
      step: 5,
      title: 'STEP 5: Severe Cloudburst Simulation',
      desc: 'Click "Severe Weather" preset to trigger critical cloudburst emergency.',
      action: () => {
        setScenario(SCENARIOS.SEVERE_WEATHER);
      }
    },
    {
      step: 6,
      title: 'STEP 6: Extreme Geospatial Risk',
      desc: 'Map updates to 🔴 HIGH RISK / 🟣 EXTREME over Waluj industrial sector.',
      action: () => {
        setActiveTab('map');
      }
    },
    {
      step: 7,
      title: 'STEP 7: AI Risk Engine 86-96/100',
      desc: 'Show AI multi-factor weighting matrix yielding 86-96 score.',
      action: () => {
        setActiveTab('risk-engine');
      }
    },
    {
      step: 8,
      title: 'STEP 8: Early Warning Siren Trigger',
      desc: '🚨 SEVERE WEATHER WARNING alert card appears automatically.',
      action: () => {
        setActiveTab('warning-system');
      }
    },
    {
      step: 9,
      title: 'STEP 9: Actionable Guidance & Citizen App',
      desc: 'Demonstrate recommended action and multilingual citizen mobile alerts.',
      action: () => {
        setActiveTab('citizen-view');
      }
    },
    {
      step: 10,
      title: 'STEP 10: Launch Presentation Mode',
      desc: 'Switch to 1-screen projector view optimized for SIH Judges.',
      action: () => {
        setIsPresentationMode(true);
      }
    }
  ];

  const handleGoStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    const targetStep = steps.find(s => s.step === stepNumber);
    if (targetStep && targetStep.action) {
      targetStep.action();
    }
  };

  const stepObj = steps.find(s => s.step === currentStep) || steps[0];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-3 text-stone-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-700" />
          <h3 className="text-xs font-mono font-bold text-stone-900 uppercase tracking-wider">
            🏆 SIH Judge 10-Step Interactive Presentation Guide (60-90s Flow)
          </h3>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-mono font-bold text-amber-900 hover:text-amber-800 px-2 py-1 bg-amber-50 rounded border border-amber-200"
        >
          {isOpen ? 'Collapse Stepper' : 'Expand Stepper'}
        </button>
      </div>

      <div className="bg-stone-50 p-3 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-extrabold text-amber-900 font-mono">{stepObj.title}:</span>
          <p className="text-stone-700 mt-0.5 font-medium">{stepObj.desc}</p>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-center">
          <button
            disabled={currentStep === 1}
            onClick={() => handleGoStep(currentStep - 1)}
            className="p-1.5 rounded bg-stone-200 hover:bg-stone-300 disabled:opacity-30 text-stone-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-amber-900 font-extrabold px-2">{currentStep} / 10</span>
          <button
            disabled={currentStep === 10}
            onClick={() => handleGoStep(currentStep + 1)}
            className="px-3 py-1.5 rounded bg-amber-800 hover:bg-amber-700 text-white font-bold flex items-center space-x-1 shadow-2xs"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-stone-200">
          {steps.map(s => (
            <button
              key={s.step}
              onClick={() => handleGoStep(s.step)}
              className={`p-2 rounded-lg text-[10px] font-mono text-left transition ${
                s.step === currentStep 
                  ? 'bg-amber-800 text-white font-bold' 
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <div className="font-bold">Step {s.step}</div>
              <div className="truncate text-[9px] opacity-80">{s.title.split(':')[1]}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
