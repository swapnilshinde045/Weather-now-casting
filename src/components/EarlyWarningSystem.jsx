import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { AlertTriangle, ShieldAlert, MapPin, Clock, Shield } from 'lucide-react';

export const EarlyWarningSystem = () => {
  const { 
    currentWeather, 
    currentLocation, 
    scenario, 
    language 
  } = useSimulation();

  const isSevere = scenario === 'HEAVY_RAIN' || scenario === 'SEVERE_WEATHER';

  return (
    <div className={`rounded-xl p-5 border space-y-4 shadow-xs section-pop-hover ${
      scenario === 'SEVERE_WEATHER' 
        ? 'bg-purple-50 border-purple-300 text-purple-950' 
        : scenario === 'HEAVY_RAIN' 
        ? 'bg-rose-50 border-rose-300 text-rose-950' 
        : 'bg-white border-stone-200 text-stone-900'
    }`}>
      
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className={`w-5 h-5 ${isSevere ? 'text-rose-600 font-bold' : 'text-amber-700'}`} />
          <h2 className="text-base font-extrabold tracking-tight">
            {isSevere ? '🚨 SEVERE WEATHER WARNING' : 'EARLY WARNING STATUS'}
          </h2>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-stone-200">
          Sector: {currentLocation.shortName}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="bg-white/80 border border-stone-200/80 rounded-lg p-3">
          <span className="text-stone-400 text-[10px] block font-bold">SECTOR</span>
          <span className="text-sm font-bold text-stone-900">📍 {currentLocation.shortName}</span>
        </div>

        <div className="bg-white/80 border border-stone-200/80 rounded-lg p-3">
          <span className="text-stone-400 text-[10px] block font-bold">RISK SCORE</span>
          <span className="text-sm font-bold text-stone-900">{currentWeather.riskLevel} ({currentWeather.riskScore}/100)</span>
        </div>

        <div className="bg-white/80 border border-stone-200/80 rounded-lg p-3">
          <span className="text-stone-400 text-[10px] block font-bold">EXPECTED WINDOW</span>
          <span className="text-sm font-bold text-stone-900">{currentWeather.expectedTime}</span>
        </div>
      </div>

      <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
        <span className="text-xs font-bold text-amber-900 block">Recommended Action:</span>
        <p className="text-xs text-stone-800 font-medium italic">
          "{currentWeather.recommendedAction[language] || currentWeather.recommendedAction.en}"
        </p>
      </div>

    </div>
  );
};
