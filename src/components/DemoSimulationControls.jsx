import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/demoWeatherData';

export const DemoSimulationControls = () => {
  const { scenario, setScenario, playAlertSound } = useSimulation();

  return (
    <aside aria-label="Operational Telemetry Stream Controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-md text-white rounded-full px-4 py-2 shadow-2xl border border-stone-700/80 flex items-center space-x-2 text-xs font-mono">
      <span className="text-amber-400 font-bold hidden sm:inline flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        ⚡ TELEMETRY STREAM:
      </span>
      
      <button
        onClick={() => {
          setScenario(SCENARIOS.NORMAL);
          playAlertSound(440, 0.2);
        }}
        title="Inject Baseline Clear Telemetry"
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.NORMAL ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Baseline Clear
      </button>

      <button
        onClick={() => {
          setScenario(SCENARIOS.MODERATE_RAIN);
          playAlertSound(600, 0.2);
        }}
        title="Inject Convective Rain Cell Telemetry"
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.MODERATE_RAIN ? 'bg-amber-600 text-white shadow-sm' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Convective Rain
      </button>

      <button
        onClick={() => setScenario(SCENARIOS.HEAVY_RAIN)}
        title="Inject Heavy Monsoon Cell Telemetry"
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.HEAVY_RAIN ? 'bg-rose-600 text-white shadow-sm' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Heavy Monsoon
      </button>

      <button
        onClick={() => setScenario(SCENARIOS.SEVERE_WEATHER)}
        title="Inject Cloudburst & Flash Flood Extreme Telemetry"
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.SEVERE_WEATHER ? 'bg-purple-600 text-white shadow-sm animate-pulse' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Cloudburst Flood
      </button>
    </aside>
  );
};

