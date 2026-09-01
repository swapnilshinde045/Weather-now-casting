import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/demoWeatherData';

export const DemoSimulationControls = () => {
  const { scenario, setScenario, playAlertSound } = useSimulation();

  return (
    <aside aria-label="Simulation Controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white rounded-full px-4 py-2 shadow-lg border border-stone-800 flex items-center space-x-2 text-xs font-mono">
      <span className="text-amber-400 font-bold hidden sm:inline">🎮 DEMO:</span>
      
      <button
        onClick={() => {
          setScenario(SCENARIOS.NORMAL);
          playAlertSound(440, 0.2);
        }}
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.NORMAL ? 'bg-emerald-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Normal
      </button>

      <button
        onClick={() => {
          setScenario(SCENARIOS.MODERATE_RAIN);
          playAlertSound(600, 0.2);
        }}
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.MODERATE_RAIN ? 'bg-amber-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Rain
      </button>

      <button
        onClick={() => setScenario(SCENARIOS.HEAVY_RAIN)}
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.HEAVY_RAIN ? 'bg-rose-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Heavy
      </button>

      <button
        onClick={() => setScenario(SCENARIOS.SEVERE_WEATHER)}
        className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${scenario === SCENARIOS.SEVERE_WEATHER ? 'bg-purple-600 text-white' : 'hover:bg-stone-800 text-stone-300'}`}
      >
        Severe
      </button>
    </aside>
  );
};
